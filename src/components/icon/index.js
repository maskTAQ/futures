import React, { Component } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

import theme from "../theme";
import styles from "./style/index";

export default class Icon extends Component {
    static defaultProps = {
        size: 48,
        color: theme.icon.tintColor
    };
    static contextTypes = {
        theme: PropTypes.object
    };
    static propTypes = {
        size: PropTypes.number,
        color: PropTypes.string,
        style: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
        source: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
    };
    state = {
        //当图片资源为网络资源时的state
        pending: false,
        status: "" //emua {'success','error'}
    };
    render() {
        const { size, source, style } = this.props;
        const { pending, status } = this.state;
        return (
            <View style={styles.iconWrapper}>
                <View
                    style={[
                        styles.imageIconBox,
                        style || { width: size, height: size }
                    ]}
                >
                    {pending && (
                        <ActivityIndicator
                            style={styles.imgPeningIndicator}
                            color="#ccc"
                            size="small"
                        />
                    )}
                    <Image
                        source={
                            status === "error"
                                ? require("./img/error.png")
                                : source
                        }
                        style={[
                            styles.imageIcon,
                            style || { width: size, height: size }
                        ]}
                        resizeMode="contain"
                        //tintColor={color}
                        // onError={() => {
                        //     this.setState({
                        //         pending: false,
                        //         status: "error"
                        //     });
                        // }}
                        // onLoad={() => {
                        //     this.setState({
                        //         pending: false,
                        //         status: "success"
                        //     });
                        // }}
                    />
                </View>
            </View>
        );
    }
}
