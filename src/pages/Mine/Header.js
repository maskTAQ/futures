import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { mine as mineStyles } from "../styles";
import { Icon, Text, Visible } from "components";
import { iconSource, scale } from "commons";
import { host } from "apis";

const styles = mineStyles.header;
const UserHeader = ({
    level = 0,
    total_money = 2333.4,
    account,
    bankstate,
    logo
}) => {
    return (
        <View style={styles.container}>
            <Icon
                source={
                    logo ? { uri: host + logo } : iconSource.defaultPortrait
                }
                size={scale(44)}
            />
            <View style={styles.headerContent}>
                <View
                    style={[styles.headerContentTop, styles.headerContentItem]}
                >
                    <View style={styles.username}>
                        <Text style={styles.usernameText}>{account}</Text>
                        <View style={styles.lv}>
                            <Text style={styles.lvText}>v{level}</Text>
                        </View>
                        <Visible show={bankstate === "1"}>
                            <Icon source={iconSource.vipIcon} size={14} />
                        </Visible>
                    </View>
                </View>
                <View
                    style={[
                        styles.headerContentItem,
                        styles.headerContentBottom
                    ]}
                >
                    <Text style={styles.repositoryNumText}>
                        仓库总数:
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
    requireClose: PropTypes.func,
    bankstate: PropTypes.string,
    logo: PropTypes.string
};

export default UserHeader;
