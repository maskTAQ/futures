import React, { PureComponent } from "react";
import {
    View,
    Image,
    Modal,
    TouchableWithoutFeedback,
    StatusBar,
    ScrollView
} from "react-native";
import { connect } from "react-redux";

import { home as styles } from "../styles";
import { DataView, Icon, Text, Button } from "components";
import User from "./User";
import { iconSource } from "commons";
import { navigate } from "actions";
import { getNotice, getHome } from "apis";

const shapeIcon = require("./img/shape.png");

@connect()
export default class Home extends PureComponent {
    state = {
        isModalVisible: false,
        notif: "",
        timeDown: "",
        userInfo: {}
    };
    UNSAFE_componentWillMount() {
        getNotice()
            .then(notif => {
                console.log(notif, "notif");
                this.setState({ notif });
            })
            .catch(e => {
                console.log(e);
            });
        getHome()
            .then(userInfo => {
                this.setState({ userInfo });
            })
            .catch(e => {
                console.log(e);
            });
        const t = new Date();
        t.setTime(t.getTime() + 24 * 60 * 60 * 1000);
        this.TimeDown(t);
    }
    TimeDown = endDate => {
        //当前时间
        const nowDate = new Date();
        //相差的总秒数
        const totalSeconds = parseInt((endDate - nowDate) / 1000);
        //天数
        //const days = Math.floor(totalSeconds / (60 * 60 * 24));
        //取模（余数）
        let modulo = totalSeconds % (60 * 60 * 24);
        //小时数
        const hours = Math.floor(modulo / (60 * 60));
        modulo = modulo % (60 * 60);
        //分钟
        const minutes = Math.floor(modulo / 60);
        //秒
        const seconds = modulo % 60;
        //延迟一秒执行自己
        this.setState({
            timeDown: `${hours}:${minutes}:${seconds}`
        });
        setTimeout(() => {
            this.TimeDown(endDate);
        }, 1000);
    };
    renderItem = ({ content = "成长时间：2018/09/02   23:12:00" }) => {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    navigate({
                        routeName: "OrderDetail"
                    });
                }}
            >
                <View style={styles.item}>
                    <Icon source={iconSource.mudan} size={68} />
                    <View style={styles.itemContent}>
                        <View style={styles.itemTop}>
                            <Text style={styles.itemTitleText}>牡丹花</Text>
                            <Text style={styles.statusText}>成长中</Text>
                        </View>
                        <View style={styles.itemCenter}>
                            <Text style={styles.itemTitleText}>2000</Text>
                            <Text style={styles.itemPercentageText}>
                                20%成长值
                            </Text>
                        </View>
                        <Text style={styles.itemDetail}>{content}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };
    renderItemT = ({
        item: { content = "预计每个生长周期收入20%", canBuy, type, name }
    }) => {
        return (
            <View style={styles.item}>
                <Icon source={iconSource[type]} size={68} />
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
        const { isModalVisible, notif, timeDown, userInfo } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar
                    hide={true}
                    backgroundColor={"transparent"}
                    barStyle="light-content"
                />
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
                <User
                    requestShowNotif={() => {
                        this.setState({
                            isModalVisible: true
                        });
                    }}
                    data={userInfo}
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
                        isPulldownLoadMore={false}
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
                            <Text style={{ color: "#fa4f75" }}>{timeDown}</Text>
                        </Text>
                    </View>
                    <DataView
                        injectData={true}
                        dataSource={[
                            { canBuy: true, type: "jugan", name: "桔柑花" },
                            {
                                label: "测试数据",
                                type: "mudan",
                                name: "牡丹花"
                            },
                            {
                                label: "测试数据",
                                type: "mulan",
                                name: "木兰花"
                            },
                            {
                                label: "测试数据",
                                type: "tiantangniao",
                                name: "天堂鸟"
                            }
                        ]}
                        refreshing={false}
                        isLoadingMore={false}
                        isPulldownLoadMore={false}
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
                                    source={iconSource.message}
                                    style={styles.notifBg}
                                    resizeMode="stretch"
                                />
                                <View style={styles.notifBox}>
                                    <Text style={styles.notifTitleText}>
                                        公告:
                                    </Text>
                                    <ScrollView>
                                        <Text style={styles.notifContentText}>
                                            {notif}
                                        </Text>
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        );
    }
}
