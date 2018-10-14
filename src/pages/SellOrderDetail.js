import React, { PureComponent } from "react";
import { View, ScrollView, Image } from "react-native";
import PropTypes from "prop-types";

import { orderDetail as styles, alert as alertStyle } from "./styles";
import { Page, Text, Button, Icon, Comfirm, Alert, Visible } from "components";
import { orderSellSureCollection, host, orderSellRepetition } from "apis";
import { iconSource, Tip } from "commons";
import { back } from "actions";

const tabs = [
    { label: "匹配中", value: "0" },
    { label: "代付款", value: "1" },
    { label: "待确认", value: "2" },
    { label: "成长中", value: "3" },
    { label: "已完成", value: "4" }
];
const getListByState = (state, data) => {
    const {
        number,
        date,
        statenoice,
        buy_money,
        predictmatchdate,
        growup_endtime
    } = data;
    switch (state) {
        case "0":
            return [
                {
                    label: "转让编号：",
                    value: number
                },
                {
                    label: "转让数额：",
                    value: "4000.00"
                },
                // {
                //     label: "匹配时间：",
                //     value: date
                // },
                {
                    label: "匹配状态： ",
                    value: statenoice
                },
                {
                    label: "预计匹配时间：",
                    value: predictmatchdate
                },
                "如系统未能在上述时间范围内为您自动匹配，请您耐心等待，系统将尽快优先为您匹配，或者您也可以取消帮助。"
            ];
        case "1":
        case "2":
            return [
                {
                    label: "转让编号：",
                    value: number
                },
                {
                    label: "转让数额：",
                    value: buy_money
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
                    label: "转让编号：",
                    value: number
                },
                {
                    label: "转让数额：",
                    value: "4000.00"
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
                    label: "转让编号：",
                    value: number
                },
                {
                    label: "转让数额：",
                    value: "4000.00"
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
                    value:
                        "恭喜成长周期已到，您可以进入花园仓库中查收。或选择复投马上开始重新生长。",
                    valueStyle: {
                        color: "#FF0000"
                    }
                }
            ];
    }
};
export default class SellOrderDetail extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object
    };
    state = {
        isComfirmVisible: false,
        isAlertVisible: false
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
        const {
            state,
            user_id,
            buy_money,
            matchdate,
            pay_endtime,
            assign_bank_name,
            assign_bank_card,
            assign_phone
        } = this.props.navigation.state.params;
        if (state === "0" || state === "3" || state === "4") {
            return null;
        }
        return (
            <View style={{ marginTop: 30 }}>
                <Text style={styles.itemLabelText}>转让用户：</Text>
                <View style={styles.header}>
                    <Icon source={iconSource.mudan} size={60} />
                    <View style={styles.headerContent}>
                        <View style={styles.headerTop}>
                            <Text style={styles.productNameText}>
                                ID:
                                {user_id}
                            </Text>
                        </View>
                        <View style={styles.headerBottom}>
                            <Text style={styles.productTimeText}>
                                数额：
                                {buy_money}
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
                        {
                            label: "付款倒计时：",
                            value: pay_endtime,
                            valueStyle: {
                                color: "#FD4C73"
                            }
                        },
                        "收款信息：",
                        {
                            label: "开户银行：",
                            value: assign_bank_name
                        },
                        {
                            label: "银行账户： ",
                            value: assign_bank_card
                        },
                        {
                            label: "收款人电话：",
                            value: assign_phone
                        },
                        state === "1"
                            ? {
                                  label: "收款确认：",
                                  value: "代付款",
                                  valueStyle: {
                                      color: "#00B415"
                                  },
                                  labelStyle: {
                                      color: "#00B415"
                                  }
                              }
                            : {
                                  label: "收款确认：",
                                  value: "待确认",
                                  valueStyle: {
                                      color: "#FF0000"
                                  },
                                  labelStyle: {
                                      color: "#FF0000"
                                  }
                              }
                    ])}
                </View>
            </View>
        );
    }
    renderList = data => {
        const { state } = this.props.navigation.state.params;
        return (data
            ? data
            : getListByState(state, this.props.navigation.state.params)
        ).map(item => {
            if (typeof item === "string") {
                return (
                    <View style={styles.item} key={item}>
                        <Text style={styles.itemLabelText}>{item}</Text>
                    </View>
                );
            } else {
                const { label, value, labelStyle, valueStyle } = item;
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
        });
    };
    renderVoucher() {
        const {
            state,
            number,
            voucher = []
        } = this.props.navigation.state.params;
        if (state === "0" || state === "3" || state === "4") {
            return null;
        }
        return (
            <Visible show={state !== "0"}>
                <View style={styles.voucher}>
                    <View style={styles.complaint}>
                        <Icon
                            source={iconSource.complaint}
                            style={styles.complaintIcon}
                        />
                        <Text style={styles.complaintText}>投诉</Text>
                    </View>
                    <Text style={styles.voucherTitleText}>上传打款凭证：</Text>
                    <View style={styles.voucherContent}>
                        <Visible show={state === "1" || state === "2"}>
                            {voucher.map(uri => {
                                return (
                                    <View style={styles.voucherItem} key={uri}>
                                        <Image
                                            source={{ uri: host + uri }}
                                            style={styles.voucherItemImg}
                                            resizeMode="stretch"
                                        />
                                    </View>
                                );
                            })}
                        </Visible>
                        <Visible show={state === "1"}>
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
                                // this.setState({
                                //     isComfirmVisible: true
                                // });
                                orderSellSureCollection({ number }).then(
                                    res => {
                                        Tip.success("确认收款成功!");
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
        const { isComfirmVisible, isAlertVisible } = this.state;
        const {
            name,
            money,
            state,
            date,
            percent,
            number
        } = this.props.navigation.state.params;
        return (
            <Page title="转让订单详情">
                <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Icon source={iconSource.mudan} size={60} />
                            <View style={styles.headerContent}>
                                <View style={styles.headerTop}>
                                    <Text style={styles.productNameText}>
                                        {name} | {money}
                                    </Text>
                                    <Text style={styles.productStatusText}>
                                        {this.getLabelByValue(state)}
                                    </Text>
                                </View>
                                <View style={styles.headerBottom}>
                                    <Text style={styles.productTimeText}>
                                        排单时间：
                                        {date}
                                    </Text>
                                    <Text style={styles.productScheduleText}>
                                        {percent}
                                        %成长值
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.bottom}>
                            {this.renderList()}
                            <Visible show={state === "4"}>
                                <Button
                                    onPress={() => {
                                        this.setState({
                                            isComfirmVisible: true
                                        });
                                    }}
                                    style={styles.submit}
                                    textStyle={styles.submitText}
                                >
                                    复投
                                </Button>
                            </Visible>
                            {this.renderUser()}
                            {this.renderVoucher()}
                        </View>
                    </View>
                    <Comfirm
                        visible={isComfirmVisible}
                        title="是否复投"
                        onOk={() => {
                            orderSellRepetition({ number }).then(res => {
                                this.setState({
                                    isComfirmVisible: false,
                                    isAlertVisible: true
                                });
                            });
                        }}
                        onCancel={() => {
                            this.setState({
                                isComfirmVisible: false
                            });
                        }}
                    />
                    <Alert
                        visible={isAlertVisible}
                        showClose={false}
                        requestClose={() => {
                            this.setState({
                                isAlertVisible: false
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
                                <Text style={styles.successText}>复投成功</Text>
                            </View>
                            <Button
                                onPress={() => {
                                    this.setState({
                                        isAlertVisible: false
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
                </ScrollView>
            </Page>
        );
    }
}
