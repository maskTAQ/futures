import React, { PureComponent } from "react";
import { View } from "react-native";

import { changeDealPassword as styles } from "./styles";
import { Page, Text, Input, Icon, Button } from "components";

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
    }
];
export default class ChangeDealPassword extends PureComponent {
    state = {};
    render() {
        return (
            <Page title="修改交易密码">
                <View style={styles.container}>
                    {inputList.map(({ placeholder, key }) => {
                        return (
                            <View style={styles.item} key={key}>
                                <Text style={styles.itemLabelText}>
                                    {placeholder}
                                </Text>
                                <Input style={styles.itemInput} />
                            </View>
                        );
                    })}
                    <View style={styles.verifyBox}>
                        <Text style={styles.itemLabelText}>验证码</Text>
                        <Input style={styles.itemInput} />
                        <Button>
                            <Icon style={styles.verifyIcon} />
                        </Button>
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
