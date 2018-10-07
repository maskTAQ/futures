import React, { PureComponent } from "react";
import { View, Image } from "react-native";
import { connect } from "react-redux";

import { wallet as styles } from "../styles";
import { Text, Button } from "components";
import { navigate } from "actions";
import Card from "./Card";
import { iconSource } from "commons";

const list = [
    [
        { label: "静态收益（花园仓库）", routeName: "GardenWarehouse" },
        { label: "动态收益（奖励仓库）", routeName: "AwardWarehouse" }
    ],
    [
        { label: "排单币（肥料）", value: 15, routeName: "TransferManure" },
        { label: "邀请名额", value: 1, routeName: "TransferInvitationCode" }
    ]
];

@connect()
export default class Wallet extends PureComponent {
    state = {
        isModalVisible: false
    };
    renderItem = ({ content }) => {
        return <View style={styles.item} />;
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.bgContainer}>
                    <Image
                        source={iconSource.bg}
                        style={styles.bg}
                        resizeMode="stretch"
                    />
                    <Image
                        source={iconSource.radius}
                        style={styles.radius}
                        resizeMode="stretch"
                    />
                </View>
                <Card repositoryNum={2333.4} />
                {list.map((group, groupI) => {
                    return (
                        <View
                            style={[
                                styles.group,
                                groupI === 0
                                    ? { marginBottom: 10 }
                                    : { flex: 1 }
                            ]}
                            key={groupI}
                        >
                            {group.map(({ label, routeName, value }) => {
                                return (
                                    <Button
                                        onPress={() => {
                                            navigate({ routeName });
                                        }}
                                        style={styles.item}
                                        key={label}
                                    >
                                        <Text style={styles.itemText}>
                                            {label}
                                        </Text>
                                        <Text style={styles.itemText}>
                                            {value}
                                        </Text>
                                    </Button>
                                );
                            })}
                        </View>
                    );
                })}
            </View>
        );
    }
}
