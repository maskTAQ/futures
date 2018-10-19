import React, { PureComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { transferInvitationCode as styles } from "./styles";
import { Page, Text, Input, Button, Icon } from "components";
import { iconSource, Tip } from "commons";
import { inviteMoney } from "apis";

const list = [
    {
        placeholder: "转发ID（仅支持团队内成员):",
        key: "account"
    },
    {
        placeholder: "转账邀请名额数:",
        key: "invite_money"
    }
];

@connect(({ data }) => {
    return { wallet: data.wallet };
})
export default class TransferInvitationCode extends PureComponent {
    static propTypes = {
        wallet: PropTypes.object
    };
    state = {
        a: "",
        b: ""
    };
    render() {
        const { account, invite_money } = this.state;
        const { invite_money: all_invite_money = 0 } = this.props.wallet || {};
        return (
            <Page title="邀请名额">
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
                        <Text style={styles.residueText}>
                            {all_invite_money}
                        </Text>
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
                                inviteMoney({ account, invite_money }).then(
                                    res => {
                                        Tip.success("邀请名额转发成功！");
                                    }
                                );
                            }}
                        >
                            转发
                        </Button>
                    </View>
                </View>
            </Page>
        );
    }
}
