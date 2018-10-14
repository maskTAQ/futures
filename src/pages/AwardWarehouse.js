import React, { PureComponent } from "react";
import { View } from "react-native";

import { gardenWarehouse as styles } from "./styles";
import { Page, Text, DataView, Icon } from "components";
import { iconSource } from "commons";
import { getDongtaiMoney } from "apis";

export default class AwardWarehouse extends PureComponent {
    state = {
        dongtai_money: 0
    };
    getData = () => {
        return getDongtaiMoney().then(res => {
            this.setState({
                dongtai_money: res.dongtai_money
            });
            return res.list;
        });
    };
    renderItem({
        item: { item, date, money, account, last_balance, balance }
    }) {
        return (
            <View style={styles.item}>
                <View style={styles.itemTop}>
                    <Text style={styles.itemTimeText}>{date}</Text>
                </View>
                <View style={styles.itemCenter}>
                    <Text style={styles.itemTypeText}>{item}</Text>
                    <Text style={styles.itemValueText}>{money}</Text>
                </View>
                <Text style={styles.userIdText}>
                    用户ID：
                    {account}
                </Text>
                <View style={styles.itemBottom}>
                    <Text style={styles.balanceText}>
                        原余额：
                        {last_balance}
                    </Text>
                    <Text style={styles.balanceText}>
                        新余额：
                        {balance}
                    </Text>
                </View>
            </View>
        );
    }
    render() {
        return (
            <Page title="奖励仓库">
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <Icon
                                source={iconSource.award}
                                style={{ width: 17, height: 23 }}
                            />
                            <Text style={styles.headerLabelText}>奖励仓库</Text>
                        </View>
                        <Text style={styles.residueText}>
                            {this.state.dongtai_money}
                        </Text>
                    </View>
                    <View style={styles.list}>
                        <DataView
                            getData={this.getData}
                            isPulldownLoadMore={false}
                            renderItem={this.renderItem}
                        />
                    </View>
                </View>
            </Page>
        );
    }
}
