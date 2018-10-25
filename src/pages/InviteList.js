import React, { PureComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { inviteList as styles } from "./styles";
import { Page, DataView, Text, Icon, Button } from "components";
import { iconSource } from "commons";
import { getInviteList, getMyWallet, getTeam } from "actions";
import { inviteSure, host } from "apis";

const Item = ({ item }) => {
    const { user_id, level, state, date, icon } = item;
    return (
        <View style={styles.item}>
            <Icon
                source={
                    icon ? { uri: host + icon } : iconSource.defaultPortrait
                }
                size={44}
            />
            <View style={styles.itemContent}>
                <View style={[styles.itemContentTop, styles.itemContentItem]}>
                    <View style={styles.username}>
                        <Text style={styles.usernameText}>{user_id}</Text>
                        <View style={styles.lv}>
                            <Text style={styles.lvText}>v{level}</Text>
                        </View>
                    </View>
                </View>
                <View
                    style={[styles.itemContentItem, styles.itemContentBottom]}
                >
                    <Text style={styles.timeText}>{date}</Text>
                </View>
            </View>
            {!Number(state) ? (
                <Button
                    onPress={() => {
                        inviteSure({ invite_id: item.id }).then(() => {
                            //获取列表数据
                            getInviteList();
                            //获取邀请码数据
                            getMyWallet();
                            //更新团队
                            getTeam();
                        });
                    }}
                    style={styles.agree}
                    textStyle={styles.agreeText}
                >
                    激活
                </Button>
            ) : (
                <Text style={styles.hasArgee}>已经激活</Text>
            )}
        </View>
    );
};
Item.propTypes = {
    item: PropTypes.object
};

@connect(({ data, loading }) => {
    return { inviteList: data.inviteList, loading, wallet: data.wallet };
})
export default class InviteList extends PureComponent {
    static propTypes = {
        inviteList: PropTypes.object,
        wallet: PropTypes.object,
        loading: PropTypes.object
    };
    state = {
        isModalVisible: false
    };
    UNSAFE_componentWillMount() {
        //f (!this.props.inviteList) {
        getInviteList();
        //}
        //if (!this.props.wallet) {
        getMyWallet();
        //}
    }
    render() {
        const { list } = this.props.inviteList || { list: [] };
        const { invite_money: all_invite_money = 0 } = this.props.wallet || {};

        return (
            <Page title="邀请列表">
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
                    <View style={styles.list}>
                        <DataView
                            injectData={true}
                            dataSource={list}
                            getData={getInviteList}
                            refreshing={
                                this.props.loading.data.inviteList.loading
                            }
                            isPulldownLoadMore={false}
                            renderItem={Item}
                        />
                    </View>
                </View>
            </Page>
        );
    }
}
