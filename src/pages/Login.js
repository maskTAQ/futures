import React, { PureComponent } from "react";
import { View } from "react-native";

import { Icon, Input, Button } from "components";
import { login as styles } from "./styles";
import { iconSource } from "commons";
import { navigate } from "actions";

export default class Login extends PureComponent {
    state = {};
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoBox}>
                    <Icon source={iconSource.l} style={styles.logoIcon} />
                </View>
                <View style={styles.content}>
                    <View style={styles.inputItem}>
                        <Icon
                            source={iconSource.username}
                            style={styles.usernameIcon}
                        />
                        <Input style={styles.input} />
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
                        <Input style={styles.input} />
                    </View>
                    <Button
                        style={styles.submit}
                        textStyle={styles.submitText}
                        onPress={() => {
                            navigate({ routeName: "TabNavigator" });
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
