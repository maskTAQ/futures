import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

import { Button } from "../index";
import createStyle from "./style";
let styles = null;
export default class CodeButton extends Component {
    static propTypes = {
        mobile: PropTypes.string,
        onValidateError: PropTypes.func,
        requestGetCode: PropTypes.func,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    };
    static contextTypes = {
        theme: PropTypes.object
    };
    static defaultProps = {
        onValidateError(error) {},
        requestGetCode(mobile) {
            return Promise.reject("请传入props:requestGetCode");
        } //return promise
    };
    state = {
        isRequestSmscode: false,
        isCan: true,
        prevTimetInterval: 61
    };
    UNSAFE_componentWillMount() {
        this.verificationMobile();
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.verificationMobile(nextProps);
    }
    componentWillUnmount() {
        //清除定时器
        clearInterval(this.intervalId);
    }
    isThroughTheVerification = false;

    timer = () => {
        let count = 60;
        this.intervalId = null;
        return () => {
            return new Promise((resolve, reject) => {
                this.setState({
                    isCan: false,
                    prevTimetInterval: count
                });
                this.intervalId = setInterval(() => {
                    if (count === 0) {
                        clearInterval(this.intervalId);
                        resolve("can get");
                    }
                    this.setState({
                        isCan: false,
                        prevTimetInterval: --count
                    });
                }, 1000);
            });
        };
    };
    /**
     *通过组件 ref来 重置验证码或者限制时间
     **/
    reset = () => {
        clearInterval(this.intervalId);
        this.isGetCode = false;
        this.setState({
            isCan: true,
            prevTimetInterval: 61
        });
    };
    verificationMobile(props) {
        const { mobile, onValidateError } = props || this.props;
        //在手机号不等于上次的手机号 或者 组件挂载时
        if (mobile !== this.props.mobile || !props) {
            switch (true) {
                case /^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(mobile):
                    this.isThroughTheVerification = true;
                    return onValidateError("");
                case !/^1[3|4|5|8][0-9]\d{4,8}$/.test(mobile):
                    this.isThroughTheVerification = false;
                    return onValidateError("请输入正确的手机号");
                case !mobile:
                default:
                    this.isThroughTheVerification = false;
                    return onValidateError("请输入手机号");
            }
        }
        return "";
    }
    getCode = () => {
        const { isCan } = this.state;
        const { mobile, requestGetCode } = this.props;
        console.log(isCan, this.isThroughTheVerification, "isCan");
        if (isCan && this.isThroughTheVerification) {
            this.setState({ isRequestSmscode: true });
            requestGetCode(mobile)
                .then(response => {
                    this.setState({ isRequestSmscode: false });
                    const timer = this.timer();
                    timer().then(() => {
                        this.setState({
                            isCan: true,
                            prevTimetInterval: 61
                        });
                    });
                    console.log("来自code-button:验证码发送成功，请注意查收");
                    this.isGetCode = true;
                })
                .catch(e => {
                    this.setState({ isRequestSmscode: false });
                    console.log(`来自code-button:验证码发送失败:${e}`);
                });
        }
    };
    render() {
        const { isCan, prevTimetInterval, isRequestSmscode } = this.state;
        const { style, textStyle } = this.props;
        styles = createStyle(this.context.theme);
        if (isRequestSmscode) {
            return (
                <View style={[styles.pending, style]}>
                    <ActivityIndicator
                        size="small"
                        color={styles.pendingColor}
                    />
                </View>
            );
        }

        return (
            <Button
                style={[styles.codeButton, style]}
                textStyle={[styles.codeButtonText, textStyle]}
                onPress={this.getCode}
            >
                {isCan ? "获取验证码" : prevTimetInterval + "s"}
            </Button>
        );
    }
}
