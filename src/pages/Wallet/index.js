import React, { PureComponent } from "react";
import { View, Image } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { wallet as styles } from "../styles";
import { Text, Button } from "components";
import { navigate, getMyWallet } from "actions";
import Card from "./Card";
import { iconSource } from "commons";

@connect(({ data, nav }) => {
    return { wallet: data.wallet, nav };
})
export default class Wallet extends PureComponent {
    static propTypes = {
        wallet: PropTypes.object,
        nav: PropTypes.object
    };
    state = {
        isModalVisible: false
    };

    UNSAFE_componentWillMount() {
        //if (!this.props.wallet) {
        getMyWallet();
        // }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { index, routes } = nextProps.nav;
        const { index: prevIndex, routes: prevRutes } = this.props.nav;
        if (routes[index].routeName === "TabNavigator") {
            // const { index, routes } = nextProps.nav;
            if (
                routes[index].index === 1 &&
                (prevRutes[prevIndex].routeName !== "TabNavigator" ||
                    prevRutes[prevIndex].index !== 1)
            ) {
                getMyWallet();
            }
        }
    }
    renderItem = ({ content }) => {
        return <View style={styles.item} />;
    };
    render() {
        const { queuing_money = 0, invite_money = 0 } = this.props.wallet || {};
        const list = [
            [
                { label: "静态收益", routeName: "GardenWarehouse" },
                { label: "动态收益", routeName: "AwardWarehouse" }
            ],
            [
                {
                    label: "种植记录",
                    routeName: "OrderBuyFlowerList"
                },
                {
                    label: "出售记录",
                    routeName: "OrderSellFlowerList"
                },
                {
                    label: "有机肥数量",
                    value: queuing_money,
                    routeName: "TransferManure"
                },
                {
                    label: "邀请码数量",
                    value: invite_money,
                    routeName: "TransferInvitationCode"
                }
            ]
        ];
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
                <Card data={this.props.wallet} />
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
                                            navigate({
                                                routeName,
                                                params: {
                                                    invite_money,
                                                    queuing_money
                                                }
                                            });
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
