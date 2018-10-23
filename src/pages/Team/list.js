import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { team as teamStyles } from "../styles";
import { Icon, Text, Visible } from "components";
import { iconSource } from "commons";

const styles = teamStyles.tree;

const List = ({ data }) => {
    return data.map(item => {
        const { user_id, level, state, verify } = item;
        return (
            <View style={styles.treeNode} key={user_id + level}>
                <View style={styles.treeNodeContent}>
                    <View style={[styles.treeNodeCenter]}>
                        <Text style={styles.usernameText}>{user_id}</Text>
                        <View style={styles.lv}>
                            <Text style={styles.lvText}>v{level}</Text>
                        </View>
                        <Visible show={Number(verify) === 1}>
                            <Icon
                                source={iconSource.vipIcon}
                                style={styles.vipIcon}
                            />
                        </Visible>
                    </View>
                    <Visible show={Number(state) === 1}>
                        <View style={styles.treeNodeRight}>
                            <Text style={styles.freezeText}>冻结</Text>
                        </View>
                    </Visible>
                </View>
            </View>
        );
    });
};
List.propTypes = {
    data: PropTypes.array
};

export default List;
