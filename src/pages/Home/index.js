import React, { PureComponent } from "react";
import {
    View,
    Image,
    Text,
    Modal,
    TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";

import { home as styles } from "../styles";
import { DataView, Icon, Button } from "components";
import User from "./User";

//背景图片
const bg = require("./img/bg.png");
const radius = require("./img/radius.png");
const rect = require("./img/rect.png");
//花
const flowerIcon = require("./img/flower.png");
const shapeIcon = require("./img/shape.png");

@connect(({ stock, loading, quotation }) => ({
    choiceAll: stock.choice || [],
    choiceAllLoading: loading.stock.choice.loading,
    quotation: quotation.all || {}
}))
export default class Home extends PureComponent {
    state = {
        isModalVisible: false
    };
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
        const { isModalVisible } = this.state;
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
                <User
                    requestShowNotif={() => {
                        console.log("111");
                        this.setState({
                            isModalVisible: true
                        });
                    }}
                    username={"张某某"}
                    lv={2}
                    repositoryNum={2333.4}
                />
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
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {
                        //alert("Modal has been closed.");
                    }}
                >
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({
                                isModalVisible: false
                            });
                        }}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.notif}>
                                <Image
                                    source={rect}
                                    style={styles.notifBg}
                                    resizeMode="stretch"
                                />
                                <View style={styles.notifBox}>
                                    <Text style={styles.notifTitleText}>
                                        公告:
                                    </Text>
                                    <Text style={styles.notifContentText}>
                                        使用搜狗输入法,输入“版权”二字进行选择;
                                        使用搜狗输入
                                        法,输入“f”,选择“6.更多特殊字符”进入字符大全进行选择
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        );
    }
}
