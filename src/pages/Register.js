import React, { PureComponent } from "react";
import { View } from "react-native";

import { Input, Button, Page, CodeButton } from "components";
import { forgetPassword as styles } from "./styles";
import { navigate } from "actions";
import { register, getCode } from "apis";
import { Tip } from "commons";

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
        const { mobile } = this.state;
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
                                            requestGetCode={getCode}
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
                                const { password, passwordT } = this.state;
                                if (password !== passwordT) {
                                    Tip.fail("俩次密码不一致");
                                } else {
                                    register(this.state)
                                        .then(res => {
                                            console.log(res, "res");
                                            navigate({
                                                routeName: "Login"
                                            });
                                        })
                                        .catch(e => {
                                            console.log(e);
                                        });
                                }
                            }}
                        >
                            完成注册
                        </Button>
                    </View>
                </View>
            </Page>
        );
    }
}
