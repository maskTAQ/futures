import React, { PureComponent } from "react";
import {
    View,
    ScrollView,
    Image,
    Modal,
    Dimensions,
    Linking
} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import Swiper from "react-native-swiper";
import update from "immutability-helper";
import moment from "moment";
import { connect } from "react-redux";

import { orderDetail as styles, alert as alertStyle } from "./styles";
import { Page, Text, Button, Icon, Comfirm, Alert, Visible } from "components";
import {
    orderSellSureCollection,
    host,
    orderSellRepetition,
    orderComplaint
} from "apis";
import { iconSource, Tip } from "commons";
import { back, getOrderSellFlowerList } from "actions";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const tabs = [
    { label: "匹配中", value: "0" },
    { label: "待收款", value: "1" },
    { label: "待确认", value: "2" },
    { label: "成长中", value: "3" },
    { label: "已完成", value: "4" }
];
const getLabelByValue = value => {
    const label = "";
    for (let i = 0; i < tabs.length; i++) {
        if (String(tabs[i].value) === value) {
            return tabs[i].label;
        }
    }
    return label;
};
const getListByState = (state, data, timeDown) => {
    const {
        or_number,
        assign_money,
        date,
        statenoice,
        finishdate,
        //predictmatchdate,
        growup_endtime
    } = data;
    switch (state) {
        case "0":
            return [
                {
                    label: "订单编号：",
                    value: or_number
                },
                {
                    label: "订单金额：",
                    value: assign_money
                },
                // {
                //     label: "匹配时间：",
                //     value: date
                // },
                {
                    label: "匹配状态： ",
                    value: getLabelByValue(state)
                }
                // {
                //     label: "预计匹配时间：",
                //     value: predictmatchdate
                // },
                // "如系统未能在上述时间范围内为您自动匹配，请您耐心等待，系统将尽快优先为您匹配，或者您也可以取消帮助。"
            ];
        case "1":
        case "2":
            return [
                {
                    label: "订单编号：",
                    value: or_number
                },
                {
                    label: "订单金额：",
                    value: assign_money
                },
                {
                    label: "当前状态： ",
                    value: statenoice
                },
                {
                    label: "匹配时间：",
                    value: date
                }
            ];
        case "3":
            return [
                {
                    label: "订单编号：",
                    value: or_number
                },
                {
                    label: "订单金额：",
                    value: assign_money
                },
                {
                    label: "匹配时间：",
                    value: date
                },
                {
                    label: "当前状态： ",
                    value: statenoice
                },
                {
                    label: "成长中倒计时：",
                    value: growup_endtime,
                    valueStyle: {
                        color: "#FF0000"
                    }
                }
            ];
        case "4":
        default:
            return [
                {
                    label: "订单编号：",
                    value: or_number
                },
                {
                    label: "订单金额：",
                    value: assign_money
                },
                {
                    label: "完成时间：",
                    value: finishdate
                },
                {
                    label: "当前状态： ",
                    value: statenoice
                },
                {
                    label: "订单状态：",
                    value: "订单已完成,请注意查收",
                    valueStyle: {
                        color: "#FF0000"
                    }
                }
            ];
    }
};
@connect(({ data }) => ({
    home: data.home
}))
export default class SellOrderDetail extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object,
        home: PropTypes.object
    };
    state = {
        comfirm: {
            visible: false,
            content: ""
        },
        alert: {
            visible: false,
            content: ""
        },
        swiper: {
            visible: false,
            data: [],
            size: []
        },
        isComplaint: false
    };
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
    TimeDown = endDateStr => {
        const end = moment(endDateStr);

        //当前时间
        const start = moment();

        if (end.unix() - start.unix() <= 0) {
            this.setState({
                timeDown: "订单超时请联系客服并投诉!"
            });
            return;
        }
        this.setState({
            timeDown: moment.duration(end - start, "ms").format("HH时-mm分ss秒")
        });

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.TimeDown(endDateStr);
        }, 1000);
    };
    getLabelByValue(value) {
        const label = "";
        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].value === value) {
                return tabs[i].label;
            }
        }
        return label;
    }
    renderUser() {
        const { timeDown } = this.state;
        const { bankstate } = this.props.home;
        const {
            state,
            assign_account,
            assign_money,
            matchdate,
            assign_endtime,
            // assign_bank_name,
            // assign_bank_card,
            assign_phone,
            assign_logo,
            //alipay_account,
            assign_name
        } = this.props.navigation.state.params;
        if (state === "0" || state === "3" || state === "4") {
            return null;
        }
        if (
            (state === "1" || state === "2") &&
            assign_endtime &&
            !this.startTimedown
        ) {
            this.startTimedown = true;
            this.TimeDown(assign_endtime);
        }
        return (
            <View style={{ marginTop: 30 }}>
                <Text style={styles.itemLabelText}>转让用户：</Text>
                <View style={styles.header}>
                    <Icon source={{ uri: host + assign_logo }} size={60} />
                    <View style={styles.headerContent}>
                        <View style={styles.headerTop}>
                            <Text style={styles.productNameText}>
                                ID:
                                {assign_account}
                            </Text>
                        </View>
                        <View style={styles.headerBottom}>
                            <Text style={styles.productTimeText}>
                                数额：
                                {assign_money}
                            </Text>
                            <Text style={styles.productScheduleText}>
                                匹配时间：
                                {matchdate}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.bottom]}>
                    {this.renderList([
                        state === "1"
                            ? {
                                  label: "收款倒计时：",
                                  value: timeDown,
                                  valueStyle: {
                                      color: "#FD4C73"
                                  }
                              }
                            : {
                                  label: "确认倒计时：",
                                  value: timeDown,
                                  valueStyle: {
                                      color: "#FD4C73"
                                  }
                              },

                        ...(bankstate === "1"
                            ? [
                                  {
                                      label: "用户姓名：",
                                      value: assign_name
                                  },
                                  {
                                      label: "会员电话：",
                                      value: assign_phone
                                  }
                                  // state === "1"
                                  //     ? {
                                  //         label: "收款确认：",
                                  //         value: "待付款",
                                  //         valueStyle: {
                                  //             color: "#00B415"
                                  //         },
                                  //         labelStyle: {
                                  //             color: "#00B415"
                                  //         }
                                  //     }
                                  //     : {
                                  //         label: "收款确认：",
                                  //         value: "待确认",
                                  //         valueStyle: {
                                  //             color: "#FF0000"
                                  //         },
                                  //         labelStyle: {
                                  //             color: "#FF0000"
                                  //         }
                                  //     }
                              ]
                            : [])
                        // {
                        //     label: "开户银行：",
                        //     value: assign_bank_name
                        // },
                        // {
                        //     label: "银行账户： ",
                        //     value: assign_bank_card
                        // },
                        // {
                        //     label: "支付宝：",
                        //     value: alipay_account
                        // },
                    ])}
                </View>
            </View>
        );
    }
    renderList = data => {
        const {
            params,
            params: { state }
        } = this.props.navigation.state;

        return (data ? data : getListByState(state, params)).map(item => {
            if (typeof item === "string") {
                return (
                    <View style={styles.item} key={item}>
                        <Text style={styles.itemLabelText}>{item}</Text>
                    </View>
                );
            } else {
                const { label, value, labelStyle, valueStyle } = item;
                if (label.includes("电话")) {
                    return (
                        <Button
                            onPress={() => {
                                Linking.openURL("tel:" + value);
                            }}
                            style={styles.item}
                            key={label}
                        >
                            <Text style={[styles.itemLabelText, labelStyle]}>
                                {label}
                            </Text>
                            <Text style={[styles.itemValueText, valueStyle]}>
                                {value}
                            </Text>
                        </Button>
                    );
                } else {
                    return (
                        <View style={styles.item} key={label}>
                            <Text style={[styles.itemLabelText, labelStyle]}>
                                {label}
                            </Text>
                            <Text
                                style={[
                                    styles.itemValueText,
                                    label === "成长中倒计时：" && {
                                        color: "#FF0000"
                                    },
                                    valueStyle
                                ]}
                            >
                                {value}
                            </Text>
                        </View>
                    );
                }
            }
        });
    };
    renderVoucher() {
        const { isComplaint } = this.state;
        const {
            state,
            number,
            voucher = [],
            complaint
        } = this.props.navigation.state.params;
        if (state !== "2") {
            return null;
        }
        const isComplaintVar = complaint === "1" || isComplaint;
        return (
            <Visible show={state !== "0"}>
                <View style={styles.voucher}>
                    <Button
                        disabled={isComplaintVar}
                        onPress={() => {
                            this.setState({
                                comfirm: {
                                    visible: true,
                                    content: "是否投诉"
                                }
                            });
                        }}
                        disabledButtonStyle={{ backgroundColor: "#fff" }}
                        style={styles.complaint}
                    >
                        <Icon
                            source={iconSource.complaint}
                            style={styles.complaintIcon}
                        />
                        <Text style={styles.complaintText}>
                            {isComplaintVar ? "已投诉" : "订单投诉"}
                        </Text>
                    </Button>
                    <Text style={styles.voucherTitleText}>查看凭证：</Text>
                    <View style={styles.voucherContent}>
                        <Visible show={state === "1" || state === "2"}>
                            {voucher.map(uri => {
                                return (
                                    <Button
                                        onPress={() => {
                                            this.setState({
                                                swiper: {
                                                    visible: true,
                                                    data: voucher,
                                                    size: []
                                                }
                                            });
                                        }}
                                        style={styles.voucherItem}
                                        key={uri}
                                    >
                                        <Image
                                            source={{ uri: host + uri }}
                                            style={styles.voucherItemImg}
                                            resizeMode="stretch"
                                        />
                                    </Button>
                                );
                            })}
                        </Visible>
                        <Visible show={state === "1" && voucher.length === 0}>
                            <View
                                style={{
                                    alignItems: "center",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    flex: 1
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: "#525252",
                                        textAlign: "center"
                                    }}
                                >
                                    暂无凭证截图
                                </Text>
                            </View>
                        </Visible>
                    </View>
                    <Visible show={state === "2"}>
                        <Button
                            style={styles.submit}
                            textStyle={styles.submitStyle}
                            onPress={() => {
                                orderSellSureCollection({ number }).then(
                                    res => {
                                        Tip.success("确认收款成功!");
                                        getOrderSellFlowerList();
                                        back();
                                    }
                                );
                            }}
                        >
                            确认收款
                        </Button>
                    </Visible>
                </View>
            </Visible>
        );
    }
    render() {
        const {
            alert: { visible, content },
            swiper,
            comfirm
        } = this.state;
        const {
            name,
            money,
            state,
            date,
            number,
            icon
        } = this.props.navigation.state.params;
        return (
            <Page title="转让订单详情">
                <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Icon source={icon} size={60} />
                            <View style={styles.headerContent}>
                                <View style={styles.headerTop}>
                                    <Text style={styles.productNameText}>
                                        {name} {money}
                                    </Text>
                                    <Text style={styles.productStatusText}>
                                        {this.getLabelByValue(state)}
                                    </Text>
                                </View>
                                <View style={styles.headerBottom}>
                                    <Text style={styles.productTimeText}>
                                        申请时间：
                                        {date}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.bottom}>
                            {this.renderList()}
                            {this.renderUser()}
                            {this.renderVoucher()}
                        </View>
                    </View>
                    <Comfirm
                        visible={comfirm.visible}
                        title={comfirm.content}
                        onOk={() => {
                            if (comfirm.content === "是否投诉") {
                                orderComplaint({ number }).then(res => {
                                    this.setState({
                                        comfirm: {
                                            visible: false,
                                            content: ""
                                        },
                                        alert: {
                                            visible: true,
                                            content: "投诉成功"
                                        },
                                        isComplaint: true
                                    });
                                });
                            } else {
                                orderSellRepetition({ number }).then(res => {
                                    this.setState({
                                        comfirm: {
                                            visible: false,
                                            content: ""
                                        },
                                        alert: {
                                            visible: true,
                                            content: "复投成功"
                                        }
                                    });
                                });
                            }
                        }}
                        onCancel={() => {
                            this.setState({
                                comfirm: {
                                    visible: false,
                                    content: ""
                                }
                            });
                        }}
                    />
                    <Alert
                        visible={visible}
                        showClose={false}
                        requestClose={() => {
                            this.setState({
                                alert: {
                                    visible: false,
                                    content: ""
                                }
                            });
                            back();
                        }}
                    >
                        <View style={alertStyle.container}>
                            <View style={styles.alertContainer}>
                                <Icon
                                    source={iconSource.success}
                                    style={styles.successIcon}
                                />
                                <Text style={styles.successText}>
                                    {content}
                                </Text>
                            </View>
                            <Button
                                onPress={() => {
                                    this.setState({
                                        alert: {
                                            visible: false,
                                            content: ""
                                        }
                                    });
                                    back();
                                }}
                                style={alertStyle.submit}
                                textStyle={alertStyle.submitText}
                            >
                                确定
                            </Button>
                        </View>
                    </Alert>
                    <Visible show={swiper.visible && swiper.data.length}>
                        <Modal>
                            <View style={styles.swiperContainer}>
                                <Button
                                    onPress={() => {
                                        this.setState(
                                            update(this.state, {
                                                swiper: {
                                                    visible: {
                                                        $set: false
                                                    }
                                                }
                                            })
                                        );
                                    }}
                                    style={styles.close}
                                >
                                    <Icon
                                        source={iconSource.closeSwiper}
                                        size={20}
                                    />
                                </Button>
                                <Swiper key={swiper.data.length}>
                                    {swiper.data.map((uri, i) => {
                                        const src = host + uri;
                                        Image.getSize(src, (width, height) => {
                                            const nextSize = _.cloneDeep(
                                                this.state.swiper.size
                                            );
                                            if (
                                                (nextSize[i] || {}).src !== src
                                            ) {
                                                if (width > height) {
                                                    const radioWidth =
                                                        screenWidth - 40;
                                                    const radio =
                                                        width / radioWidth;
                                                    const radioHeight =
                                                        height / radio;
                                                    nextSize[i] = {
                                                        width: radioWidth,
                                                        height: radioHeight,
                                                        src
                                                    };
                                                } else {
                                                    const radioHeight =
                                                        screenHeight - 80;
                                                    const radio =
                                                        height / radioHeight;
                                                    const radioWidth =
                                                        width / radio;
                                                    nextSize[i] = {
                                                        width: radioWidth,
                                                        height: radioHeight,
                                                        src
                                                    };
                                                }
                                                this.setState(
                                                    update(this.state, {
                                                        swiper: {
                                                            size: {
                                                                $set: nextSize
                                                            }
                                                        }
                                                    })
                                                );
                                            }
                                        });

                                        return (
                                            <View
                                                style={styles.swiper}
                                                key={uri}
                                            >
                                                <Image
                                                    style={swiper.size[i]}
                                                    source={{ uri: src }}
                                                />
                                            </View>
                                        );
                                    })}
                                </Swiper>
                            </View>
                        </Modal>
                    </Visible>
                </ScrollView>
            </Page>
        );
    }
}
