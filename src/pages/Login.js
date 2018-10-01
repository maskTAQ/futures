import React, { PureComponent } from "react";
import { View, Text } from "react-native";

import { login as styles } from "./styles";
export default class Login extends PureComponent {
    state = {};
    render() {
        return (
            <View style={styles.container}>
                <Text>登录页</Text>
            </View>
        );
    }
}
