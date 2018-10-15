import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { wallet as walletStyles } from "../styles";
import { Icon, Text } from "components";

const styles = walletStyles.card;

const Card = ({ data = {} }) => {
    const { total_money = 0, dongtai_money = 0, jingtai_money = 0 } = data;
    const list = [
        {
            label: "花园仓库",
            value: jingtai_money,
            routeName: "GardenWarehouse"
        },
        {
            label: "奖励仓库",
            value: dongtai_money,
            routeName: "AwardWarehouse"
        }
    ];
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.repoText}>
                    仓库总数：
                    {total_money}
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
                                {value !== undefined ? (
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
    data: PropTypes.object
};

export default Card;
