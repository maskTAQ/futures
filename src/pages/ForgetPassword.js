import React, { PureComponent } from "react";
import { View } from "react-native";

import { Input, Button, Page, CodeButton } from "components";
import { forgetPassword as styles } from "./styles";
import { findPassword, getCode } from "apis";
import { Tip } from "commons";

const list = [
    {
        placeholder: "请输入账号",
        key: "account"
    },
    {
        placeholder: "请输入手机号",
        key: "mobile"
    },
    {
        placeholder: "",
        key: "code"
    },
    {
        placeholder: "填写新密码",
        key: "password"
    },
    {
        placeholder: "请再次输入新密码",
        key: "passwordT"
    }
];
export default class ForgetPassword extends PureComponent {
    state = {
        mobile: "13500000000",
        account: "H66455429"
    };
    render() {
        const { mobile, account } = this.state;
        return (
            <Page title="找回密码">
                <View style={styles.container}>
                    {list.map(({ placeholder, key }) => {
                        return (
                            <View style={styles.item} key={key}>
                                <Input
                                    placeholder={placeholder}
                                    style={styles.input}
                                    value={this.state[key]}
                                    onChangeText={v => {
                                        this.setState({
                                            [key]: v
                                        });
                                    }}
                                />
                                {key === "code" && (
                                    <CodeButton
                                        mobile={mobile}
                                        style={styles.code}
                                        textStyle={styles.codeText}
                                        requestGetCode={() => {
                                            return getCode({
                                                phone: mobile,
                                                account
                                            });
                                        }}
                                    />
                                )}
                            </View>
                        );
                    })}
                    <View style={styles.buttonBox}>
                        <Button
                            style={styles.submit}
                            textStyle={styles.submitText}
                            onPress={() => {
                                const { password, passwordT } = this.state;
                                if (!password) {
                                    return Tip.fail("请输入密码");
                                }
                                if (password !== passwordT) {
                                    return Tip.fail("俩次输入的密码一致");
                                }
                                return findPassword(this.state)
                                    .then(res => {
                                        console.log(res);
                                    })
                                    .catch(e => {
                                        console.log(e);
                                    });
                            }}
                        >
                            确认
                        </Button>
                    </View>
                </View>
            </Page>
        );
    }
}
