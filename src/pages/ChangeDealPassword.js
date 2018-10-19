import React, { PureComponent } from "react";
import { View } from "react-native";

import { changeDealPassword as styles } from "./styles";
import { Page, Text, Input, Button } from "components";
import { updatePassword } from "apis";
import { Tip } from "commons";

const inputList = [
    {
        placeholder: "旧密码",
        key: "old_password"
    },
    {
        placeholder: "新密码",
        props: {
            keyboardType: "numeric"
        },
        key: "new_password"
    },
    {
        placeholder: "确认新密码",
        props: {
            keyboardType: "numeric"
        },
        key: "new_passwordT"
    }
    // {
    //     placeholder: "验证码",
    //     key: "code"
    // }
];
export default class ChangeDealPassword extends PureComponent {
    state = {};
    render() {
        return (
            <Page title="交易密码">
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
                                        onChangeText={v => {
                                            this.setState({
                                                [key]: v
                                            });
                                        }}
                                        {...props}
                                    />
                                </View>
                            );
                        })}
                    </View>
                    <Button
                        style={styles.submit}
                        textStyle={styles.submitStyle}
                        onPress={() => {
                            const { old_password, new_password } = this.state;
                            console.log(this.state);
                            updatePassword({
                                old_password,
                                new_password,
                                type: "1"
                            }).then(() => {
                                Tip.success("交易密码修改成功");
                            });
                        }}
                    >
                        完成
                    </Button>
                </View>
            </Page>
        );
    }
}
