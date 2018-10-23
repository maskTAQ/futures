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
import PropTypes from "prop-types";

import { home as styles } from "../styles";
import { DataView, Icon, Text, Button, Visible } from "components";
import User from "./User";
import { iconSource, Tip } from "commons";
import { navigate, getHome } from "actions";
import { getNotice } from "apis";

const shapeIcon = require("./img/shape.png");

@connect(({ data, loading }) => {
    return { wallet: data.wallet, home: data.home, loading };
})
export default class Home extends PureComponent {
    static propTypes = {
        wallet: PropTypes.object,
        home: PropTypes.object,
        loading: PropTypes.object
    };
    state = {
        isModalVisible: false,
        notif: "",
        timeDown: "",
        data: {}
    };
    UNSAFE_componentWillMount() {
        getNotice()
            .then(res => {
                this.setState({ notif: res.notice });
            })
            .catch(e => {
                console.log(e);
            });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.home && nextProps.home.date_end) {
            this.TimeDown(nextProps.home.date_end);
        }
    }
    TimeDown = endDateStr => {
        const endDate = new Date(endDateStr);
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
        this.timeout = setTimeout(() => {
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
                            <Text style={styles.statusText}>{percent}</Text>
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
        const { money, state, name, type } = item;
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
                                if (this.props.home.bankstate !== "1") {
                                    Tip.fail("收款信息未认证,请先认证收款信息");
                                    navigate({
                                        routeName: "AccountInfo"
                                    });
                                } else {
                                    navigate({
                                        routeName: "Buy",
                                        params: item
                                    });
                                }
                            }}
                        >
                            {state ? "申请种植" : "不可采收"}
                        </Button>
                    </View>
                    <View style={styles.itemCenter}>
                        <Text style={styles.itemTitleText}>{money}</Text>
                    </View>
                    {/*
                         <Text style={styles.itemDetail}>
                         预计每个生长周期收入
                         {percent}
                     </Text>
                        */}
                </View>
            </View>
        );
    };
    render() {
        const { isModalVisible, notif, timeDown } = this.state;
        const { home = {} } = this.props;
        const { growuplist = [], buylist = [] } = home;
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
                        StatusBar.setBackgroundColor("rgba(0,0,0,0.3)");
                    }}
                    data={home}
                />
                <Visible show={growuplist.length}>
                    <View style={styles.hasList}>
                        {this.has(growuplist[0])}
                    </View>
                </Visible>

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
                    <View style={styles.list}>
                        <DataView
                            injectData={true}
                            dataSource={buylist}
                            refreshing={false}
                            isLoadingMore={false}
                            getData={getHome}
                            isPulldownLoadMore={false}
                            ItemSeparatorComponent={() => (
                                <View style={styles.itemBorder} />
                            )}
                            renderItem={this.renderItemT}
                        />
                    </View>
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
                            StatusBar.setBackgroundColor("transparent");
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
                                            {notif || "暂无公告"}
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
