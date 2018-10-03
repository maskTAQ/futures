import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { home as homeStyles } from "../styles";
import { Icon, Button, Text } from "components";
import { iconSource } from "commons";

const styles = homeStyles.user;
const emailIcon = require("./img/email.png");
const orderIcon = require("./img/order.png");
const transferIcon = require("./img/transfer.png");
const User = ({
    username = "张某某",
    lv = 2,
    repositoryNum = 2333.4,
    requestShowNotif
}) => {
    const detailList = [
        [
            {
                label: "花园仓库",
                value: "3183.2"
            },
            { type: "border", label: "1", style: { alignSelf: "flex-end" } },
            {
                label: "奖励仓库",
                value: "3183.2"
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
                    <Icon source={iconSource.defaultPortrait} size={44} />
                    <View style={styles.headerContent}>
                        <View
                            style={[
                                styles.headerContentTop,
                                styles.headerContentItem
                            ]}
                        >
                            <View style={styles.username}>
                                <Text style={styles.usernameText}>
                                    {username}
                                </Text>
                                <View style={styles.lv}>
                                    <Text style={styles.lvText}>v{lv}</Text>
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
                                {repositoryNum}
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
                                                    {value ? (
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
    username: PropTypes.string,
    lv: PropTypes.number,
    repositoryNum: PropTypes.number,
    requestShowNotif: PropTypes.func
};

export default User;
