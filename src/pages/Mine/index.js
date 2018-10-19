import React, { PureComponent } from "react";
import { View, Switch, StatusBar, ScrollView } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Header, Text, Button } from "components";
import { mine as styles } from "../styles";
import { navigate, getMyWallet } from "actions";
import { logout } from "apis";
import UserHeader from "./Header";

const list = [
    [
        { label: "收款信息", routeName: "AccountInfo" },
        { label: "登录密码", routeName: "LoginPassword" },
        { label: "交易密码", routeName: "ChangeDealPassword" }
    ],
    [{ label: "消息推送", Component: Switch }],
    [
        { label: "求助反馈", routeName: "Feedback" },
        { label: "关于", routeName: "About" },
        { label: "应用分享", routeName: "Share" }
    ]
];

@connect(({ data, user }) => {
    return { wallet: data.wallet, user: user.main };
})
export default class Mine extends PureComponent {
    static propTypes = {
        wallet: PropTypes.object,
        user: PropTypes.object,
        dispatch: PropTypes.func
    };
    UNSAFE_componentWillMount() {
        if (!this.props.wallet) {
            getMyWallet();
        }
    }
    render() {
        const {
            wallet: { total_money = 0 } = {},
            user: { account, level } = {}
        } = this.props;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <StatusBar
                        hide={true}
                        backgroundColor={"transparent"}
                        barStyle="light-content"
                    />
                    <Header title="个人中心" LeftComponent={null} />
                    <UserHeader
                        account={account}
                        total_money={total_money}
                        level={level}
                    />
                    <View style={styles.list}>
                        {list.map((group, i) => {
                            return (
                                <View style={styles.group} key={i}>
                                    {group.map(
                                        ({ label, Component, routeName }) => {
                                            return (
                                                <Button
                                                    style={styles.item}
                                                    key={label}
                                                    disabled={!!Component}
                                                    disabledButtonStyle={{
                                                        backgroundColor: "#fff"
                                                    }}
                                                    onPress={() => {
                                                        console.log(12121);
                                                        navigate({
                                                            routeName
                                                        });
                                                    }}
                                                >
                                                    <Text
                                                        style={styles.itemText}
                                                    >
                                                        {label}
                                                    </Text>
                                                    {Component && (
                                                        <Component
                                                            value={true}
                                                            //_thumbColor="red"
                                                            thumbTintColor="#fff"
                                                            trackColor={{
                                                                false:
                                                                    "#e3e3e3",
                                                                true: "#fa4f75"
                                                            }}
                                                        />
                                                    )}
                                                </Button>
                                            );
                                        }
                                    )}
                                </View>
                            );
                        })}
                        <Button
                            style={styles.submit}
                            textStyle={styles.submitText}
                            onPress={() => {
                                logout().then(res => {
                                    this.props.dispatch({
                                        type: "logout"
                                    });
                                    navigate({ routeName: "Login" });
                                });
                            }}
                        >
                            退出
                        </Button>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
