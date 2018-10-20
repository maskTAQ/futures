import React, { PureComponent } from "react";
import { View, Image, StatusBar, Platform, BackHandler } from "react-native";

import { welcome as styles } from "./styles";
import { Button, Visible, Text } from "components";
import { iconSource } from "commons";

export default class Exit extends PureComponent {
    state = {
        timeout: 5
    };
    UNSAFE_componentWillMount() {
        Platform.OS === "android" && this.keepTime();
    }
    keepTime = () => {
        const { timeout } = this.state;
        if (timeout === 1) {
            BackHandler.exitApp();
        } else {
            this.setState(
                {
                    timeout: timeout - 1
                },
                () => {
                    setTimeout(this.keepTime, 1000);
                }
            );
        }
    };
    render() {
        const { timeout } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={"transparent"}
                    translucent={true}
                    barStyle="light-content"
                />
                <Visible show={Platform.OS === "android"}>
                    <Button style={styles.exit}>
                        <Text style={styles.exitText}>
                            0{timeout}
                            退出
                        </Text>
                    </Button>
                </Visible>
                <Image source={iconSource.exit} style={styles.exitBg} />
            </View>
        );
    }
}
