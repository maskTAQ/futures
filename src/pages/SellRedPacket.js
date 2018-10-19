import React, { PureComponent } from "react";
import { View, Alert as A } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { sellRedPacket as styles, alert as alertStyle } from "./styles";
import { Page, Text, Input, Button, Alert } from "components";
import { Tip } from "commons";
import { sellFlower, tradePassword } from "apis";

@connect(({ data, user }) => {
    return { user: user.main };
})
export default class SellRedPacket extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object,
        user: PropTypes.object
    };
    state = {
        password: "",
        number: "",
        isVerifyVisible: false
    };
    render() {
        const { number, isVerifyVisible, password } = this.state;
        const {
            title,
            hint,
            //type,
            typeValue
        } = this.props.navigation.state.params;
        return (
            <Page title={title}>
                <View style={styles.container}>
                    <Text style={styles.labelText}>转让数量：</Text>
                    <Input
                        style={styles.input}
                        value={number}
                        onChangeText={number => {
                            this.setState({
                                number
                            });
                        }}
                    />
                    <Text style={styles.balanceText}>当前余额:0</Text>
                    {hint.map(item => (
                        <Text style={styles.hintText} key={item}>
                            {item}
                        </Text>
                    ))}
                    <Button
                        style={styles.submit}
                        textStyle={styles.submitStyle}
                        onPress={() => {
                            console.log(isNaN(number), number > 0);
                            if (!isNaN(number) && number > 0) {
                                this.setState({
                                    isVerifyVisible: true
                                });
                            } else {
                                Tip.fail("请输入正确的数量");
                            }
                        }}
                    >
                        确定发布
                    </Button>
                </View>
                <Alert
                    visible={isVerifyVisible}
                    requestClose={() => {
                        this.setState({
                            isVerifyVisible: false
                        });
                    }}
                >
                    <View style={alertStyle.container}>
                        <View style={alertStyle.top}>
                            <Text style={alertStyle.titleText}>
                                请输入交易密码
                            </Text>
                            <Input
                                style={alertStyle.input}
                                value={password}
                                onChangeText={password => {
                                    this.setState({
                                        password
                                    });
                                }}
                            />
                        </View>
                        <View style={alertStyle.btnGroup}>
                            <Button
                                style={alertStyle.submit}
                                textStyle={alertStyle.submitText}
                                onPress={() => {
                                    tradePassword({
                                        account: this.props.user.account,
                                        password
                                    })
                                        .then(res => {
                                            this.setState(
                                                {
                                                    isVerifyVisible: false
                                                },
                                                () => {
                                                    sellFlower({
                                                        type: typeValue,
                                                        number
                                                    }).then(res => {
                                                        Tip.success("出售成功");
                                                    });
                                                }
                                            );
                                        })
                                        .catch(e => {
                                            A.alert(e);
                                        });
                                }}
                            >
                                确定发布
                            </Button>
                            <Button
                                style={alertStyle.cancel}
                                textStyle={alertStyle.cancelText}
                                onPress={() => {
                                    this.setState({
                                        isVerifyVisible: false
                                    });
                                }}
                            >
                                取消
                            </Button>
                        </View>
                    </View>
                </Alert>
            </Page>
        );
    }
}
