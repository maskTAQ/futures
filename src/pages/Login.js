import React, { PureComponent } from "react";
import { View, StatusBar } from "react-native";

import { Icon, Input, Button } from "components";
import { login as styles } from "./styles";
import { iconSource, Storage } from "commons";
import { navigate } from "actions";
import { login } from "apis";

export default class Login extends PureComponent {
    state = {
        account: "H66455429",
        password: "123456"
    };
    render() {
        const { account, password } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={"transparent"}
                    translucent={true}
                    barStyle="light-content"
                />
                <View style={styles.logoBox}>
                    <Icon source={iconSource.l} style={styles.logoIcon} />
                </View>
                <View style={styles.content}>
                    <View style={styles.inputItem}>
                        <Icon
                            source={iconSource.username}
                            style={styles.usernameIcon}
                        />
                        <Input
                            style={styles.input}
                            value={account}
                            onChangeText={account => {
                                this.setState({ account });
                            }}
                        />
                        <Icon
                            source={iconSource.bottom}
                            style={styles.bottomIcon}
                        />
                    </View>
                    <View style={styles.inputItem}>
                        <Icon
                            source={iconSource.password}
                            style={styles.passwordIcon}
                        />
                        <Input
                            style={styles.input}
                            value={password}
                            onChangeText={password => {
                                this.setState({ password });
                            }}
                            secureTextEntry={true}
                        />
                    </View>
                    <Button
                        style={styles.submit}
                        textStyle={styles.submitText}
                        onPress={() => {
                            login({ account, password })
                                .then(res => {
                                    Storage.set("Token", res.access_token);
                                    navigate({ routeName: "TabNavigator" });
                                })
                                .catch(e => {
                                    console.log(e);
                                });
                        }}
                    >
                        登录
                    </Button>
                    <View style={styles.nav}>
                        <Button
                            textStyle={styles.navText}
                            onPress={() => {
                                navigate({ routeName: "ForgetPassword" });
                            }}
                        >
                            忘记密码
                        </Button>
                        <Button
                            textStyle={styles.navText}
                            onPress={() => {
                                navigate({ routeName: "Register" });
                            }}
                        >
                            注册
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}
