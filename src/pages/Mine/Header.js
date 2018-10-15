import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { mine as mineStyles } from "../styles";
import { Icon, Text } from "components";
import { iconSource, scale } from "commons";

const styles = mineStyles.header;
const UserHeader = ({
    username = "张某某",
    lv = 2,
    repositoryNum = 2333.4,
    requireClose
}) => {
    return (
        <View style={styles.container}>
            <Icon source={iconSource.defaultPortrait} size={scale(44)} />
            <View style={styles.headerContent}>
                <View
                    style={[styles.headerContentTop, styles.headerContentItem]}
                >
                    <View style={styles.username}>
                        <Text style={styles.usernameText}>{username}</Text>
                        <View style={styles.lv}>
                            <Text style={styles.lvText}>v{lv}</Text>
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
                        {repositoryNum}
                    </Text>
                </View>
            </View>
        </View>
    );
};
UserHeader.propTypes = {
    username: PropTypes.string,
    lv: PropTypes.number,
    repositoryNum: PropTypes.number,
    requireClose: PropTypes.func
};

export default UserHeader;
