import React, { PureComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { inviteList as styles } from "./styles";
import { Page, DataView, Text, Icon, Button } from "components";
import { iconSource } from "commons";
import { getInviteList } from "actions";
import { inviteSure } from "apis";

const Item = ({ item }) => {
    const { account, level, state, date } = item;
    return (
        <View style={styles.item}>
            <Icon source={iconSource.defaultPortrait} size={44} />
            <View style={styles.itemContent}>
                <View style={[styles.itemContentTop, styles.itemContentItem]}>
                    <View style={styles.username}>
                        <Text style={styles.usernameText}>{account}</Text>
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
                        inviteSure(item).then(getInviteList);
                    }}
                    style={styles.agree}
                    textStyle={styles.agreeText}
                >
                    同意
                </Button>
            ) : (
                <Text style={styles.hasArgee}>已经同意</Text>
            )}
        </View>
    );
};
Item.propTypes = {
    item: PropTypes.object
};

@connect(({ data, loading }) => {
    return { inviteList: data.inviteList, loading };
})
export default class InviteList extends PureComponent {
    static propTypes = {
        inviteList: PropTypes.object,
        loading: PropTypes.object
    };
    state = {
        isModalVisible: false
    };
    UNSAFE_componentWillMount() {
        if (!this.props.inviteList) {
            getInviteList();
        }
    }
    render() {
        const { list } = this.props.inviteList || { list: [] };
        return (
            <Page title="邀请列表">
                <View style={styles.container}>
                    <DataView
                        injectData={true}
                        dataSource={list}
                        getData={getInviteList}
                        refreshing={this.props.loading.data.inviteList.loading}
                        isPulldownLoadMore={false}
                        renderItem={Item}
                    />
                </View>
            </Page>
        );
    }
}
