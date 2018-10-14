import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { team as teamStyles } from "../styles";
import { Icon, Button, Text, Visible } from "components";
import { iconSource, scale } from "commons";

const styles = teamStyles.tree;

const TreeNode = ({ item, depth, requestTreeNodeVisibleChange }) => {
    const { showChildren = true, team = [], user_id, level, freeze } = item;
    return (
        <View style={styles.treeNode} key={user_id + level}>
            <View style={styles.treeNodeContent}>
                <View style={styles.treeNodeLeft}>
                    {team && team.length ? (
                        <Button
                            onPress={() => {
                                requestTreeNodeVisibleChange({
                                    user_id,
                                    showChildren: !showChildren
                                });
                            }}
                        >
                            <Icon
                                size={scale(15)}
                                source={
                                    showChildren
                                        ? iconSource.hide
                                        : iconSource.show
                                }
                            />
                        </Button>
                    ) : (
                        <View type="placeholder" style={{ width: scale(15) }} />
                    )}

                    <Text style={styles.treeChildNumText}>
                        ({team.length + 1}){" "}
                    </Text>
                </View>
                <View
                    style={[styles.treeNodeCenter, { paddingLeft: 15 * depth }]}
                >
                    <Visible show={depth}>
                        <Icon
                            style={styles.treeLine}
                            source={iconSource.line}
                        />
                    </Visible>

                    <Text style={styles.usernameText}>{user_id}</Text>
                    <View style={styles.lv}>
                        <Text style={styles.lvText}>v{level}</Text>
                    </View>
                    <Icon source={iconSource.vipIcon} style={styles.vipIcon} />
                </View>
                <Visible show={freeze}>
                    <View style={styles.treeNodeRight}>
                        <Text style={styles.freezeText}>冻结</Text>
                    </View>
                </Visible>
            </View>
            <View style={styles.treeNodeChildren}>
                {showChildren && team.length
                    ? team.map(item =>
                          TreeNode({
                              item,
                              depth: depth + 1,
                              requestTreeNodeVisibleChange
                          })
                      )
                    : null}
            </View>
        </View>
    );
};
TreeNode.propTypes = {
    item: PropTypes.object,
    depth: PropTypes.number,
    requestTreeNodeVisibleChange: PropTypes.func,
    freeze: PropTypes.bool
};
const Tree = ({ data, requestTreeNodeVisibleChange }) => {
    return (
        <View style={styles.container}>
            {data.map(item => {
                return TreeNode({
                    item,
                    depth: 0,
                    requestTreeNodeVisibleChange
                });
            })}
        </View>
    );
};
Tree.propTypes = {
    data: PropTypes.array,
    requestTreeNodeVisibleChange: PropTypes.func
};

export default Tree;
