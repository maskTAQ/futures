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
import moment from "moment";

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
        // console.log(moment(),moment(moment('2018-10-26 22:17')-moment('2018-10-27 22:15')).format(
        //     "HH时mm分ss秒"
        // ),'12')
    }
    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     if (nextProps.home && nextProps.home.date_end) {
    //         this.TimeDown(nextProps.home.date_end);
    //     }
    // }
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
    // TimeDown = endDateStr => {
    //     const end = moment(endDateStr);

    //     //当前时间
    //     const start = moment();
    //     if (this.hasDate) {
    //         this.setState({
    //             timeDown: moment(end - start).format("HH时mm分ss秒"),
    //             hasDate: moment(moment(this.hasDate) - start).format(
    //                 "HH时mm分ss秒"
    //             )
    //         });
    //     } else {
    //         this.setState({
    //             timeDown: moment(end - start).format("HH时mm分ss秒")
    //         });
    //     }

    //     clearTimeout(this.timeout);
    //     this.timeout = setTimeout(() => {
    //         this.TimeDown(endDateStr);
    //     }, 1000);
    // };
    TimeDown = endDateStr => {
        const end = moment(endDateStr);

        //当前时间
        const start = moment();
        if (this.hasDate) {
            const end = moment(this.hasDate);
            if (end.unix() - start.unix() <= 0) {
                this.setState({
                    hasDate: "00时:00分:00秒"
                });
                //   return;
            } else {
                this.setState({
                    hasDate: moment
                        .duration(end - start, "ms")
                        .format("HH时mm分ss秒")
                });
            }
        }

        if (end.unix() - start.unix() <= 0) {
            this.startTimedown = false;

            this.setState({
                timeDown:
                    end.unix() - start.unix() < 60
                        ? "00时:00分:00秒"
                        : "正在进入下一周期"
            });
            return;
        }
        this.setState({
            timeDown: moment.duration(end - start, "ms").format("HH时mm分ss秒")
        });

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.TimeDown(endDateStr);
        }, 1000);
    };
    has = item => {
        if (!item) {
            return null;
        }
        const { percent, name, type, date } = item;
        const { hasDate } = this.state;
        this.hasDate = date;

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
                            {hasDate}
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
                <View style={styles.itemBox}>
                    <Text style={styles.itemTitleText}>{name}</Text>
                    <Text style={styles.itemTitleText}>{money}</Text>
                    <Button
                        style={styles.buyButton}
                        disabled={state === "0"}
                        disabledButtonStyle={{ backgroundColor: "#e3e3e3" }}
                        disabledTextStyle={{ color: "#999" }}
                        textStyle={styles.buyButtonText}
                        onPress={() => {
                            if (this.props.home.bankstate !== "1") {
                                Tip.fail("收款信息未认证,请先认证收款信息");
                                setTimeout(() => {
                                    navigate({
                                        routeName: "AccountInfo"
                                    });
                                }, 1000);
                            } else {
                                navigate({
                                    routeName: "Buy",
                                    params: item
                                });
                            }
                        }}
                    >
                        {state === "0" ? "不可采收" : "申请种植"}
                    </Button>
                </View>
            </View>
        );
    };
    render() {
        const { isModalVisible, notif, timeDown } = this.state;
        const { home = {} } = this.props;
        const { growuplist = [], buylist = [] } = home;
        if (
            this.props.home &&
            this.props.home.date_end &&
            !this.startTimedown
        ) {
            this.startTimedown = true;
            this.TimeDown(this.props.home.date_end);
        }

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
                    bankstate={
                        this.props.home ? this.props.home.bankstate : "0"
                    }
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
