import React, { PureComponent } from "react";
import { View } from "react-native";

import { changeDealPassword as styles } from "./styles";
import { Page, Text, Input, Button, Icon, Visible } from "components";

const inputList = [
    {
        placeholder: "旧密码",
        key: "old"
    },
    {
        placeholder: "新密码",
        key: "new"
    },
    {
        placeholder: "确认新密码",
        key: "newT"
    },
    {
        placeholder: "验证码",
        key: "code"
    }
];
const codeUri =
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539539164062&di=ce6a6277035c2ed7c109047860bcef60&imgtype=0&src=http%3A%2F%2Fs4.sinaimg.cn%2Fmw690%2F003bsgbmgy6R6efoOr1c3";
export default class LoginPassword extends PureComponent {
    state = {};
    render() {
        return (
            <Page title="登录密码">
                <View style={styles.container}>
                    <View style={styles.group}>
                        {inputList.map(({ placeholder, key }) => {
                            return (
                                <View style={styles.item} key={key}>
                                    <Text style={styles.itemLabelText}>
                                        {placeholder}
                                    </Text>
                                    <Input style={styles.itemInput} />
                                    <Visible show={key === "code"}>
                                        <Icon
                                            source={{ uri: codeUri }}
                                            style={styles.codeIcon}
                                        />
                                    </Visible>
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
