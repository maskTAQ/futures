import React, { PureComponent } from "react";
import { View, ScrollView, Image } from "react-native";
import PropTypes from "prop-types";
import ImagePicker from "react-native-image-picker";
import update from "immutability-helper";
import RNFS from "react-native-fs";

import { orderDetail as styles, alert as alertStyle } from "./styles";
import { Page, Text, Button, Icon, Comfirm, Alert, Visible } from "components";
import {
    orderBuyUpdateVoucher,
    orderBuySureCollection,
    host,
    orderBuyRepetition,
    orderComplaint
} from "apis";
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
                    label: "采收编号：",
                    value: number
                },
                {
                    label: "采购数额：",
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
                    label: "预计匹配时间：",
                    value: predictmatchdate
                },
                "如系统未能在上述时间范围内为您自动匹配，请您耐心等待，系统将尽快优先为您匹配，或者您也可以取消帮助。"
            ];
        case "1":
        case "2":
            return [
                {
                    label: "采收编号：",
                    value: number
                },
                {
                    label: "采购数额：",
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
                    label: "采收编号：",
                    value: number
                },
                {
                    label: "采购数额：",
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
                    label: "采收编号：",
                    value: number
                },
                {
                    label: "采购数额：",
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
export default class BuyOrderDetail extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object
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
        voucherImgList: []
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
    upVoucher = () => {
        const { number } = this.props.navigation.state.params;
        const options = {
            title: "上传打款凭证",
            cancelButtonTitle: "取消",
            takePhotoButtonTitle: "拍照",
            chooseFromLibraryButtonTitle: "从相册选取",
            mediaType: "photo",
            quality: 0.1
        };
        ImagePicker.showImagePicker(options, response => {
            const { didCancel, error, uri } = response;
            switch (true) {
                case !!error:
                    Tip.fail(error);
                    break;
                case !!uri:
                    Tip.loading("图片解码中");
                    RNFS.readFile(uri, "base64")
                        .then(content => {
                            Tip.loading(`图片上传中`);
                            orderBuyUpdateVoucher({
                                number,
                                voucher: "data:image/png;base64," + content
                            })
                                .then(res => {
                                    Tip.success("图片上传成功");
                                    this.setState(
                                        update(this.state, {
                                            voucherImgList: {
                                                $push: [uri]
                                            }
                                        })
                                    );
                                })
                                .catch(err => {
                                    Tip.fail(`头像上传失败:${err}`);
                                });
                        })
                        .catch(err => {
                            Tip.fail(`头像上传失败:${err}`);
                        });
                    break;
                case !!didCancel:
                default:
                    break;
            }
        });
    };
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
        const { voucherImgList } = this.state;
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
                    <Button
                        onPress={() => {
                            this.setState({
                                comfirm: {
                                    visible: true,
                                    content: "是否投诉"
                                }
                            });
                        }}
                        style={styles.complaint}
                    >
                        <Icon
                            source={iconSource.complaint}
                            style={styles.complaintIcon}
                        />
                        <Text style={styles.complaintText}>投诉</Text>
                    </Button>
                    <Text style={styles.voucherTitleText}>上传打款凭证：</Text>
                    <View style={styles.voucherContent}>
                        <Visible show={state === "1"}>
                            {voucherImgList.map(uri => {
                                return (
                                    <View style={styles.voucherItem} key={uri}>
                                        <Image
                                            source={{ uri: uri }}
                                            style={styles.voucherItemImg}
                                            resizeMode="stretch"
                                        />
                                    </View>
                                );
                            })}
                            <Button
                                onPress={this.upVoucher}
                                style={[
                                    styles.voucherItem,
                                    styles.voucherItemBorder
                                ]}
                            >
                                <Icon source={iconSource.add} size={35} />
                            </Button>
                        </Visible>
                        <Visible show={state === "2"}>
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
                    </View>
                    <Visible show={state === "1"}>
                        <Button
                            style={styles.submit}
                            textStyle={styles.submitStyle}
                            onPress={() => {
                                orderBuySureCollection({ number }).then(res => {
                                    Tip.success("确认收款成功!");
                                    back();
                                });
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
            comfirm
        } = this.state;
        const {
            name,
            money,
            state,
            date,
            percent,
            number
        } = this.props.navigation.state.params;
        return (
            <Page title="采收订单详情">
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
                                            comfirm: {
                                                visible: true,
                                                content: "是否复投"
                                            }
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
                                        }
                                    });
                                });
                            } else {
                                orderBuyRepetition({ number }).then(res => {
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
                            // back();
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
                                    // back();
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
