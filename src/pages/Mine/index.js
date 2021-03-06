import React, { PureComponent } from "react";
import { View, Switch, StatusBar, ScrollView } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Header, Text, Button } from "components";
import { mine as styles } from "../styles";
import { navigate, getMyWallet, getNoticeState } from "actions";
import { logout, setNoticeState } from "apis";
import UserHeader from "./Header";
import { Tip } from "commons";

const list = [
    [
        { label: "收款信息", routeName: "AccountInfo" },
        { label: "登录密码", routeName: "LoginPassword" },
        { label: "交易密码", routeName: "ChangeDealPassword" }
    ],
    [{ label: "消息推送", Component: Switch }],
    [
        { label: "求助反馈", routeName: "Feedback" },
        { label: "检测升级", routeName: "About" },
        { label: "应用分享", routeName: "Share" }
    ]
];

@connect(({ data, user }) => {
    return {
        wallet: data.wallet,
        user: user.main,
        noticeState: data.noticeState,
        home: data.home
    };
})
export default class Mine extends PureComponent {
    static propTypes = {
        wallet: PropTypes.object,
        user: PropTypes.object,
        dispatch: PropTypes.func,
        noticeState: PropTypes.object,
        home: PropTypes.object
    };
    UNSAFE_componentWillMount() {
        // if (!this.props.wallet) {
        getMyWallet();
        // }
        // if (!this.props.noticeState) {
        getNoticeState();
        //å }
    }
    render() {
        const {
            wallet: { total_money = 0 } = {},
            user: { account, level } = {},
            noticeState: { sms_notice } = {},
            home = {}
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
                        logo={home.logo}
                        bankstate={
                            this.props.home ? this.props.home.bankstate : "0"
                        }
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
                                                        if (
                                                            routeName ===
                                                            "ChangeDealPassword"
                                                        ) {
                                                            if (
                                                                this.props.home
                                                                    .bankstate !==
                                                                "1"
                                                            ) {
                                                                Tip.fail(
                                                                    "收款信息未认证,请先认证收款信息"
                                                                );
                                                                setTimeout(
                                                                    () => {
                                                                        navigate(
                                                                            {
                                                                                routeName:
                                                                                    "AccountInfo"
                                                                            }
                                                                        );
                                                                    },
                                                                    1000
                                                                );
                                                            } else {
                                                                navigate({
                                                                    routeName
                                                                });
                                                            }
                                                        } else {
                                                            navigate({
                                                                routeName
                                                            });
                                                        }
                                                    }}
                                                >
                                                    <Text
                                                        style={styles.itemText}
                                                    >
                                                        {label}
                                                    </Text>
                                                    {Component && (
                                                        <Component
                                                            value={
                                                                !!Number(
                                                                    sms_notice
                                                                )
                                                            }
                                                            //_thumbColor="red"
                                                            thumbTintColor="#fff"
                                                            trackColor={{
                                                                false:
                                                                    "#e3e3e3",
                                                                true: "#fa4f75"
                                                            }}
                                                            onValueChange={v => {
                                                                console.log(
                                                                    sms_notice,
                                                                    v,
                                                                    "=="
                                                                );
                                                                setNoticeState({
                                                                    sms_notice: String(
                                                                        Number(
                                                                            v
                                                                        )
                                                                    )
                                                                }).then(
                                                                    getNoticeState
                                                                );
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
