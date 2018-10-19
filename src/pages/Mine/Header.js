import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { mine as mineStyles } from "../styles";
import { Icon, Text } from "components";
import { iconSource, scale } from "commons";

const styles = mineStyles.header;
const UserHeader = ({ level = 0, total_money = 2333.4, account }) => {
    return (
        <View style={styles.container}>
            <Icon source={iconSource.defaultPortrait} size={scale(44)} />
            <View style={styles.headerContent}>
                <View
                    style={[styles.headerContentTop, styles.headerContentItem]}
                >
                    <View style={styles.username}>
                        <Text style={styles.usernameText}>{account}</Text>
                        <View style={styles.lv}>
                            <Text style={styles.lvText}>v{level}</Text>
                        </View>
                        <Icon source={iconSource.vipIcon} size={scale(14)} />
                    </View>
                </View>
                <View
                    style={[
                        styles.headerContentItem,
                        styles.headerContentBottom
                    ]}
                >
                    <Text style={styles.repositoryNumText}>
                        仓库数量:
                        {total_money}
                    </Text>
                </View>
            </View>
        </View>
    );
};
UserHeader.propTypes = {
    account: PropTypes.string,
    level: PropTypes.string,
    total_money: PropTypes.any,
    requireClose: PropTypes.func
};

export default UserHeader;
