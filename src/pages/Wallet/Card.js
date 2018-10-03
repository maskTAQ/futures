import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { wallet as walletStyles } from "../styles";
import { Icon, Text } from "components";

const styles = walletStyles.card;

const list = [
    {
        label: "花园仓库",
        value: "3183.2"
    },
    {
        label: "奖励仓库",
        value: "3183.2"
    }
];
const Card = ({ repositoryNum = 2333.4 }) => {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.repoText}>
                    仓库总数：
                    {repositoryNum}
                </Text>
                <View style={styles.list}>
                    {list.map(({ label, icon, value }, i) => {
                        return (
                            <View
                                style={[
                                    styles.item,
                                    i === 0 && styles.itemBorderRight
                                ]}
                                key={label}
                            >
                                {value ? (
                                    <Text style={styles.itemValueText}>
                                        {value}
                                    </Text>
                                ) : (
                                    <Icon
                                        source={icon}
                                        style={styles.itemIcon}
                                    />
                                )}
                                <Text style={styles.itemText}>{label}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        </View>
    );
};
Card.propTypes = {
    repositoryNum: PropTypes.number
};

export default Card;
