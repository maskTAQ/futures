import React, { PureComponent } from "react";
import { View } from "react-native";

import { gardenWarehouse as styles } from "./styles";
import { Page, Text, DataView, Icon } from "components";
import { iconSource } from "commons";

const list = ["推荐奖", "推荐奖"];
export default class AwardWarehouse extends PureComponent {
    state = {
        a: "",
        b: ""
    };
    renderItem({ item }) {
        return (
            <View style={styles.item}>
                <View style={styles.itemTop}>
                    <Text style={styles.itemTimeText}>2018/09/22 22:12</Text>
                </View>
                <View style={styles.itemCenter}>
                    <Text style={styles.itemTypeText}>{item}</Text>
                    <Text style={styles.itemValueText}>+4000.00</Text>
                </View>
                <Text style={styles.userIdText}>用户ID：dsa782676</Text>
                <View style={styles.itemBottom}>
                    <Text style={styles.balanceText}>原余额：4000.00</Text>
                    <Text style={styles.balanceText}>新余额：1000.00</Text>
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
                        <Text style={styles.residueText}>1232.00</Text>
                    </View>
                    <View style={styles.list}>
                        <DataView
                            injectData={true}
                            dataSource={list}
                            refreshing={false}
                            isLoadingMore={false}
                            renderItem={this.renderItem}
                        />
                    </View>
                </View>
            </Page>
        );
    }
}
