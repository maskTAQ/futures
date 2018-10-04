import React, { PureComponent } from "react";
import { View } from "react-native";

import {
    transferInvitationCode as styles,
    alert as alertStyle
} from "./styles";
import { Page, Text, Input, Button, Icon, Alert } from "components";
import { iconSource } from "commons";

const list = [
    {
        placeholder: "转发ID（仅支持团队内成员):",
        key: "a"
    },
    {
        placeholder: "转账诚信币数:",
        key: "b"
    }
];
export default class TransferManure extends PureComponent {
    state = {
        a: "",
        b: "",
        isEnough: true
    };
    render() {
        const { isEnough } = this.state;
        return (
            <Page title="排单币(肥料)">
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <Icon source={iconSource.bi} size={20} />
                            <Text style={styles.headerLabelText}>
                                剩余排单币
                            </Text>
                        </View>
                        <Text style={styles.residueText}>15</Text>
                    </View>
                    <View style={styles.content}>
                        {list.map(({ placeholder, key }) => {
                            return (
                                <View style={styles.item} key={key}>
                                    <View style={styles.itemLabel}>
                                        <Text style={styles.itemLabelText}>
                                            {placeholder}
                                        </Text>
                                    </View>
                                    <Input
                                        style={styles.itemInput}
                                        value={this.state[key]}
                                        onChangeText={v => {
                                            this.setState({
                                                [key]: v
                                            });
                                        }}
                                    />
                                </View>
                            );
                        })}
                        <Button
                            style={styles.submit}
                            textStyle={styles.submitStyle}
                            onPress={() => {
                                this.setState({
                                    isEnough: false
                                });
                            }}
                        >
                            转发
                        </Button>
                    </View>
                </View>
                <Alert
                    visible={!isEnough}
                    requestClose={() => {
                        this.setState({
                            isEnough: true
                        });
                    }}
                >
                    <View style={alertStyle.container}>
                        <View>
                            <Text style={alertStyle.errorTitleText}>
                                Sorry...
                            </Text>
                            <Text style={alertStyle.errorContentText}>
                                您的排单币数量不足{" "}
                            </Text>
                            <Text style={alertStyle.errorContentText}>
                                请联系推荐人获取{" "}
                            </Text>
                        </View>
                        <Button
                            style={alertStyle.submit}
                            textStyle={alertStyle.submitText}
                        >
                            OK
                        </Button>
                    </View>
                </Alert>
            </Page>
        );
    }
}
