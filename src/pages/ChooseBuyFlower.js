import React, { PureComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { home as styles } from "./styles";
import { DataView, Icon, Text, Button, Page } from "components";
import { iconSource } from "commons";
import { navigate } from "actions";

@connect()
export default class ChooseBuyFlower extends PureComponent {
    state = {
        isModalVisible: false
    };

    renderItem = ({
        item: { content = "预计每个生长周期收入20%", canBuy, type, name }
    }) => {
        return (
            <View style={styles.item}>
                <Icon source={iconSource[type]} size={80} />
                <View style={styles.itemContent}>
                    <View style={styles.itemTop}>
                        <Text style={styles.itemTitleText}>
                            {name}
                            {canBuy}
                        </Text>
                        <Button
                            style={styles.buyButton}
                            disabled={canBuy}
                            disabledButtonStyle={{ backgroundColor: "#e3e3e3" }}
                            disabledTextStyle={{ color: "#999" }}
                            textStyle={styles.buyButtonText}
                            onPress={() => {
                                navigate({
                                    routeName: "Buy"
                                });
                            }}
                        >
                            {canBuy ? "不可采收" : "采收"}
                        </Button>
                    </View>
                    <View style={styles.itemCenter}>
                        <Text style={styles.itemTitleText}>2000</Text>
                    </View>
                    <Text style={styles.itemDetail}>{content}</Text>
                </View>
            </View>
        );
    };
    render() {
        return (
            <Page title="选择购买的花卉">
                <View style={styles.store}>
                    <View style={styles.storeHeader}>
                        <View style={styles.storeTitle}>
                            <Text style={styles.storeTitleText}>购买花卉</Text>
                        </View>
                        <Text style={styles.countDownText}>
                            终止倒计时：
                            <Text style={{ color: "#fa4f75" }}>
                                23:11:00
                            </Text>{" "}
                        </Text>
                    </View>
                    <DataView
                        injectData={true}
                        dataSource={[
                            { canBuy: true, type: "1", name: "桔柑花" },
                            {
                                label: "测试数据",
                                type: "2",
                                name: "牡丹花"
                            },
                            {
                                label: "测试数据",
                                type: "3",
                                name: "木兰花"
                            },
                            {
                                label: "测试数据",
                                type: "4",
                                name: "天堂鸟"
                            }
                        ]}
                        refreshing={false}
                        isLoadingMore={false}
                        renderItem={this.renderItem}
                    />
                </View>
            </Page>
        );
    }
}
