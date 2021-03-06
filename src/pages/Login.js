import React, { PureComponent } from "react";
import { View, StatusBar } from "react-native";

import { Icon, Input, Button } from "components";
import { login as styles } from "./styles";
import { iconSource, Tip, Storage, rules } from "commons";
import { navigate } from "actions";
import { login } from "actions";

export default class Login extends PureComponent {
    state = {
        account: "",
        password: ""
    };
    UNSAFE_componentWillMount() {
        Storage.getJson("userInfo").then(res => {
            if (res) {
                this.setState({
                    ...res
                });
            }
        });
    }
    componentDidMount() {
        console.log("登录页 卸载");
    }
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
                                this.setState({
                                    account: rules.removeChinese(account)
                                });
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
                            if (!rules.isPassword(password)) {
                                Tip.fail("密码只能是数字与字母组合!");
                            } else if (!rules.isPassword(account)) {
                                Tip.fail("账号只能是数字与字母组合!");
                            } else {
                                login({ account, password });
                            }
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
                            注册账号
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}
