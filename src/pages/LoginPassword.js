import React, { PureComponent } from "react";
import { View } from "react-native";

import { changeDealPassword as styles } from "./styles";
import { Page, Text, Input, Button } from "components";

const inputList = [
    {
        placeholder: "旧密码",
        key: "old"
    },
    {
        placeholder: "新密码",
        props: {
            keyboardType: "numeric"
        },
        key: "new"
    },
    {
        placeholder: "确认新密码",
        props: {
            keyboardType: "numeric"
        },
        key: "newT"
    },
    {
        placeholder: "验证码",
        key: "code"
    }
];
export default class LoginPassword extends PureComponent {
    state = {};
    render() {
        return (
            <Page title="登录密码">
                <View style={styles.container}>
                    <View style={styles.group}>
                        {inputList.map(({ placeholder, key, props }) => {
                            return (
                                <View style={styles.item} key={key}>
                                    <Text style={styles.itemLabelText}>
                                        {placeholder}
                                    </Text>
                                    <Input
                                        style={styles.itemInput}
                                        {...props}
                                    />
                                </View>
                            );
                        })}
                    </View>
                    <Button
                        style={styles.submit}
                        textStyle={styles.submitStyle}
                    >
                        完成
                    </Button>
                </View>
            </Page>
        );
    }
}
