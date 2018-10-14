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
        data: {}
    };
    UNSAFE_componentWillMount() {
        getNotice()
            .then(notif => {
                this.setState({ notif });
            })
            .catch(e => {
                console.log(e);
            });

        const t = new Date();
        t.setTime(t.getTime() + 24 * 60 * 60 * 1000);
        this.TimeDown(t);
    }
    getData = () => {
        return getHome().then(data => {
            this.setState({ data });
            return data.buylist;
        });
    };
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
    has = item => {
        if (!item) {
            return null;
        }
        const { percent, name, type, date } = item;

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    navigate({
                        routeName: "OrderDetail"
                    });
                }}
            >
                <View style={styles.item}>
                    <Icon source={iconSource[type]} size={68} />
                    <View style={styles.itemContent}>
                        <View style={styles.itemTop}>
                            <Text style={styles.itemTitleText}>{name}</Text>
                            <Text style={styles.statusText}>{percent}%</Text>
                        </View>
                        <View style={styles.itemCenter}>
                            <Text style={styles.itemTitleText}>成长中</Text>
                            <Text style={styles.itemPercentageText}>
                                {percent}
                                成长值
                            </Text>
                        </View>
                        <Text style={styles.itemDetail}>
                            成长时间：
                            {date}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };
    renderItemT = ({ item }) => {
        const { percent, money, state, name, type } = item;
        return (
            <View style={styles.item}>
                <Icon source={iconSource[type]} size={68} />
                <View style={styles.itemContent}>
                    <View style={styles.itemTop}>
                        <Text style={styles.itemTitleText}>{name}</Text>
                        <Button
                            style={styles.buyButton}
                            disabled={!state}
                            disabledButtonStyle={{ backgroundColor: "#e3e3e3" }}
                            disabledTextStyle={{ color: "#999" }}
                            textStyle={styles.buyButtonText}
                            onPress={() => {
                                navigate({
                                    routeName: "Buy",
                                    params: item
                                });
                            }}
                        >
                            {state ? "申请种植" : "不可采收"}
                        </Button>
                    </View>
                    <View style={styles.itemCenter}>
                        <Text style={styles.itemTitleText}>{money}</Text>
                    </View>
                    <Text style={styles.itemDetail}>
                        预计每个生长周期收入
                        {percent}
                    </Text>
                </View>
            </View>
        );
    };
    render() {
        const { isModalVisible, notif, timeDown, data } = this.state;
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
                    data={data}
                    username={"张某某"}
                    lv={2}
                    repositoryNum={2333.4}
                />
                <View style={styles.list}>
                    {this.has((data.growuplist || [])[0])}
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
                            周期剩余时间:
                            <Text style={{ color: "#fa4f75" }}>{timeDown}</Text>
                        </Text>
                    </View>
                    <DataView
                        // injectData={true}
                        // dataSource={data.list}
                        // refreshing={false}
                        // isLoadingMore={false}
                        getData={this.getData}
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
