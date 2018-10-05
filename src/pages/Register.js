import React, { PureComponent } from "react";
import { View } from "react-native";

import { Input, Button, Page, CodeButton } from "components";
import { forgetPassword as styles } from "./styles";
import { navigate } from "actions";

const list = [
    {
        placeholder: "请输入6-20位字母和账号",
        key: "account"
    },

    {
        placeholder: "填写密码",
        key: "n"
    },
    {
        placeholder: "请再次输入密码",
        key: "newt"
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
        key: "id"
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
                    {list.map(({ placeholder, key }) => {
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
                                />
                                {key === "code" && (
                                    <CodeButton
                                        mobile={mobile}
                                        style={styles.code}
                                        textStyle={styles.codeText}
                                        requestGetCode={() => Promise.resolve()}
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
                                navigate({
                                    routeName: "Login"
                                });
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
