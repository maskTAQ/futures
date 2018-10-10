import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { home as homeStyles } from "../styles";
import { Icon, Button, Text } from "components";
import { iconSource } from "commons";
import { host } from "apis";

const styles = homeStyles.user;
const emailIcon = require("./img/email.png");
const orderIcon = require("./img/order.png");
const transferIcon = require("./img/transfer.png");
const User = ({ requestShowNotif, data }) => {
    const { jingtaiMoney = 0, dongtaiMoney = 0, user_id, level, logo } = data;
    const detailList = [
        [
            {
                label: "花园仓库",
                value: jingtaiMoney
            },
            { type: "border", label: "1", style: { alignSelf: "flex-end" } },
            {
                label: "奖励仓库",
                value: dongtaiMoney
            }
        ],
        [
            {
                label: "采收订单",
                icon: orderIcon
            },
            { type: "border", label: "2" },
            {
                label: "转让订单",
                icon: transferIcon
            }
        ]
    ];
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.header}>
                    <Icon source={{ uri: host + logo }} size={44} />
                    <View style={styles.headerContent}>
                        <View
                            style={[
                                styles.headerContentTop,
                                styles.headerContentItem
                            ]}
                        >
                            <View style={styles.username}>
                                <Text style={styles.usernameText}>
                                    {user_id}
                                </Text>
                                <View style={styles.lv}>
                                    <Text style={styles.lvText}>v{level}</Text>
                                </View>
                                <Icon source={iconSource.vipIcon} size={14} />
                            </View>
                            <Button onPress={requestShowNotif}>
                                <Icon
                                    source={emailIcon}
                                    style={{ width: 20, height: 17 }}
                                />
                            </Button>
                        </View>
                        <View
                            style={[
                                styles.headerContentItem,
                                styles.headerContentBottom
                            ]}
                        >
                            <Text style={styles.repositoryNumText}>
                                仓库数量:
                                {jingtaiMoney + dongtaiMoney}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.detail}>
                    {detailList.map((group, groupI) => {
                        return (
                            <View style={styles.detailGroup} key={groupI}>
                                {group.map(
                                    (
                                        { type, label, icon, value, style },
                                        i
                                    ) => {
                                        if (type === "border") {
                                            return (
                                                <View
                                                    style={[
                                                        styles.itemBorder,
                                                        style
                                                    ]}
                                                    key={label}
                                                />
                                            );
                                        } else {
                                            return (
                                                <View
                                                    style={[
                                                        styles.item,
                                                        groupI === 0 &&
                                                            styles.itemBorderBottom
                                                    ]}
                                                    key={label}
                                                >
                                                    {value !== undefined ? (
                                                        <Text
                                                            style={
                                                                styles.itemValueText
                                                            }
                                                        >
                                                            {value}
                                                        </Text>
                                                    ) : (
                                                        <Icon
                                                            source={icon}
                                                            style={
                                                                styles.itemIcon
                                                            }
                                                        />
                                                    )}
                                                    <Text
                                                        style={styles.itemText}
                                                    >
                                                        {label}
                                                    </Text>
                                                </View>
                                            );
                                        }
                                    }
                                )}
                            </View>
                        );
                    })}
                </View>
            </View>
        </View>
    );
};
User.propTypes = {
    data: PropTypes.object,
    requestShowNotif: PropTypes.func
};

export default User;
