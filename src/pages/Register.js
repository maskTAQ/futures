import React, { PureComponent } from "react";
import { View } from "react-native";

import { Input, Button, Page, CodeButton } from "components";
import { forgetPassword as styles } from "./styles";
import { navigate } from "actions";
import { getCode, userReg } from "apis";
import { Tip, isPassword, isMobile } from "commons";

const list = [
    {
        placeholder: "请输入6-20位字母和账号",
        key: "account"
    },

    {
        placeholder: "填写密码",
        key: "password",
        secureTextEntry: true
    },
    {
        placeholder: "请再次输入密码",
        key: "passwordT",
        secureTextEntry: true
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
        placeholder: "填写推荐人ID",
        key: "tjaccount"
    }
];
export default class ForgetPassword extends PureComponent {
    state = {
        mobile: "13888888888"
    };
    render() {
        const { mobile, account } = this.state;
        return (
            <Page title="注册账号">
                <View style={styles.container}>
                    {list.map(
                        ({ placeholder, key, secureTextEntry = false }) => {
                            return (
                                <View style={styles.item} key={key}>
                                    <Input
                                        placeholder={placeholder}
                                        style={styles.input}
                                        onChangeText={v => {
                                            this.setState({
                                                [key]: v
                                            });
                                        }}
                                        secureTextEntry={secureTextEntry}
                                    />
                                    {key === "code" && (
                                        <CodeButton
                                            mobile={mobile}
                                            style={styles.code}
                                            textStyle={styles.codeText}
                                            requestGetCode={() => {
                                                return getCode({
                                                    phone: mobile,
                                                    account,
                                                    type: "0"
                                                });
                                            }}
                                        />
                                    )}
                                </View>
                            );
                        }
                    )}
                    <View style={styles.buttonBox}>
                        <Button
                            style={styles.submit}
                            textStyle={styles.submitText}
                            onPress={() => {
                                const {
                                    account,
                                    password,
                                    passwordT,
                                    tjaccount
                                } = this.state;

                                if (!isPassword(account)) {
                                    return Tip.fail(
                                        "账号只能是数字与字母组合!"
                                    );
                                }
                                if (!isPassword(tjaccount)) {
                                    return Tip.fail(
                                        "推荐人id只能是数字与字母组合!"
                                    );
                                }
                                if (!isPassword(password)) {
                                    return Tip.fail(
                                        "密码只能是数字与字母组合!"
                                    );
                                }
                                if (!isPassword(account)) {
                                    return Tip.fail(
                                        "账号只能是数字与字母组合!"
                                    );
                                }

                                if (!isMobile(mobile)) {
                                    return Tip.fail("请输入正确的手机号");
                                }

                                if (!password) {
                                    return Tip.fail("请输入密码");
                                }
                                if (password !== passwordT) {
                                    return Tip.fail("俩次输入的密码不一致");
                                }

                                return userReg(this.state)
                                    .then(res => {
                                        Tip.success("注册成功!");
                                        setTimeout(() => {
                                            navigate({
                                                routeName: "Login"
                                            });
                                        }, 1000);
                                    })
                                    .catch(e => {
                                        console.log(e);
                                    });
                            }}
                        >
                            申请注册
                        </Button>
                    </View>
                </View>
            </Page>
        );
    }
}
