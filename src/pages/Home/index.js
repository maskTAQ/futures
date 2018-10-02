import React, { PureComponent } from "react";
import { View, Image, Text } from "react-native";
import { connect } from "react-redux";

import { login as styles } from "../styles";
import { DataView, Icon, Button } from "components";
import User from "./User";

//背景图片
const bg = require("./img/bg.png");
const radius = require("./img/radius.png");
//花
const flowerIcon = require("./img/flower.png");
const shapeIcon = require("./img/shape.png");

@connect(({ stock, loading, quotation }) => ({
    choiceAll: stock.choice || [],
    choiceAllLoading: loading.stock.choice.loading,
    quotation: quotation.all || {}
}))
export default class Home extends PureComponent {
    state = {};
    renderItem = ({ content }) => {
        return (
            <View style={styles.item}>
                <Icon source={flowerIcon} size={80} />
                <View style={styles.itemContent}>
                    <View style={styles.itemTop}>
                        <Text style={styles.itemTitleText}>牡丹花</Text>
                        <Text style={styles.statusText}>成长中</Text>
                    </View>
                    <View style={styles.itemCenter}>
                        <Text style={styles.itemTitleText}>2000</Text>
                        <Text style={styles.itemPercentageText}>20%成长值</Text>
                    </View>
                    <Text style={styles.itemDetail}>{content}</Text>
                </View>
            </View>
        );
    };
    renderItemT = ({
        item: { content = "预计每个生长周期收入20%", canBuy }
    }) => {
        return (
            <View style={styles.item}>
                <Icon source={flowerIcon} size={80} />
                <View style={styles.itemContent}>
                    <View style={styles.itemTop}>
                        <Text style={styles.itemTitleText}>
                            牡丹花
                            {canBuy}
                        </Text>
                        <Button
                            style={styles.buyButton}
                            disabled={canBuy}
                            disabledButtonStyle={{ backgroundColor: "#e3e3e3" }}
                            disabledTextStyle={{ color: "#999" }}
                            textStyle={styles.buyButtonText}
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
            <View style={styles.container}>
                <View style={styles.bgContainer}>
                    <Image source={bg} style={styles.bg} resizeMode="stretch" />
                    <Image
                        source={radius}
                        style={styles.radius}
                        resizeMode="stretch"
                    />
                </View>
                <User username={"张某某"} lv={2} repositoryNum={2333.4} />
                <View style={styles.list}>
                    <DataView
                        injectData={true}
                        dataSource={[
                            { content: "成长时间：2018/09/02   23:12:00" }
                        ]}
                        refreshing={false}
                        isLoadingMore={false}
                        renderItem={this.renderItem}
                    />
                </View>
                <View style={styles.store}>
                    <View style={styles.storeHeader}>
                        <View style={styles.storeTitle}>
                            <Icon
                                source={shapeIcon}
                                style={styles.storeTitleIcon}
                            />
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
                            { canBuy: true },
                            { label: "测试数据" },
                            { label: "测试数据" },
                            { label: "测试数据" }
                        ]}
                        refreshing={false}
                        isLoadingMore={false}
                        renderItem={this.renderItemT}
                    />
                </View>
            </View>
        );
    }
}
