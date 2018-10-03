import React, { PureComponent } from "react";
import { View, Switch } from "react-native";
import { connect } from "react-redux";

import { Header, Text, Button } from "components";
import { mine as styles } from "../styles";
import UserHeader from "./Header";

const list = [
    [
        { label: "收款信息", routeName: "" },
        { label: "登录密码", routeName: "" },
        { label: "交易密码", routeName: "" }
    ],
    [{ label: "消息推送", Component: Switch }],
    [
        { label: "求助反馈", routeName: "" },
        { label: "关于", routeName: "" },
        { label: "应用分享", routeName: "" }
    ]
];

@connect()
export default class Mine extends PureComponent {
    state = {};
    render() {
        return (
            <View style={styles.container}>
                <Header title="个人中心" LeftComponent={null} />
                <UserHeader />
                <View style={styles.list}>
                    {list.map((group, i) => {
                        return (
                            <View style={styles.group} key={i}>
                                {group.map(({ label, Component }) => {
                                    return (
                                        <Button
                                            style={styles.item}
                                            key={label}
                                            disabled={!!Component}
                                            disabledButtonStyle={{
                                                backgroundColor: "#fff"
                                            }}
                                        >
                                            <Text style={styles.itemText}>
                                                {label}
                                            </Text>
                                            {Component && (
                                                <Component
                                                    value={true}
                                                    //_thumbColor="red"
                                                    thumbTintColor="#fff"
                                                    trackColor={{
                                                        false: "#e3e3e3",
                                                        true: "#fa4f75"
                                                    }}
                                                />
                                            )}
                                        </Button>
                                    );
                                })}
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    }
}
