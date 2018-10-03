import React, { PureComponent } from "react";
import { View, Text } from "react-native";

import { Page } from "components";
import { login as styles } from "./styles";
export default class Login extends PureComponent {
    state = {};
    render() {
        return (
            <Page title="登录密码">
                <View style={styles.container}>
                    <Text>登录页1212</Text>
                </View>
            </Page>
        );
    }
}
