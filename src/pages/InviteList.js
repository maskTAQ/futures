import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { inviteList as styles } from "./styles";
import { Page, DataView, Text, Icon, Button } from "components";
import { iconSource } from "commons";

const data = [
    {
        username: "张x1",
        lv: 1,
        isAgree: true
    },
    {
        username: "张x2",
        lv: 0,
        isAgree: false
    },
    {
        username: "张x3",
        lv: 4,
        isAgree: true
    },
    {
        username: "张x4",
        lv: 2,
        isAgree: true
    },
    {
        username: "张x4",
        lv: 1,
        isAgree: true
    }
];

const Item = ({ item: { username, lv, isAgree } }) => {
    return (
        <View style={styles.item}>
            <Icon source={iconSource.defaultPortrait} size={44} />
            <View style={styles.itemContent}>
                <View style={[styles.itemContentTop, styles.itemContentItem]}>
                    <View style={styles.username}>
                        <Text style={styles.usernameText}>{username}</Text>
                        <View style={styles.lv}>
                            <Text style={styles.lvText}>v{lv}</Text>
                        </View>
                    </View>
                </View>
                <View
                    style={[styles.itemContentItem, styles.itemContentBottom]}
                >
                    <Text style={styles.timeText}>2018/09/22 22:12</Text>
                </View>
            </View>
            {isAgree ? (
                <Button style={styles.agree} textStyle={styles.agreeText}>
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
const InviteList = () => {
    return (
        <Page title="邀请列表">
            <View style={styles.container}>
                <DataView
                    injectData={true}
                    dataSource={data}
                    refreshing={false}
                    isLoadingMore={false}
                    renderItem={Item}
                />
            </View>
        </Page>
    );
};

export default InviteList;
