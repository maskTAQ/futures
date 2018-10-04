import React, { PureComponent } from "react";
import { View } from "react-native";

import { transferInvitationCode as styles } from "./styles";
import { Page, Text, Input, Button, Icon } from "components";
import { iconSource } from "commons";

const list = [
    {
        placeholder: "转发ID（仅支持团队内成员):",
        key: "a"
    },
    {
        placeholder: "转账邀请名额数:",
        key: "b"
    }
];
export default class TransferInvitationCode extends PureComponent {
    state = {
        a: "",
        b: ""
    };
    render() {
        return (
            <Page title="邀请名额" RightComponent={<Button>记录</Button>}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <Icon
                                source={iconSource.invitationcode}
                                size={20}
                            />
                            <Text style={styles.headerLabelText}>
                                剩余邀请码
                            </Text>
                        </View>
                        <Text style={styles.residueText}>888</Text>
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
                        >
                            转发
                        </Button>
                    </View>
                </View>
            </Page>
        );
    }
}
