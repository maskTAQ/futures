import React, { PureComponent } from "react";
import {
    View,
    ScrollView,
    Image,
    Modal,
    Dimensions,
    Linking,
    Clipboard
} from "react-native";
import PropTypes from "prop-types";
import ImagePicker from "react-native-image-picker";
import update from "immutability-helper";
import RNFS from "react-native-fs";
import _ from "lodash";
import Swiper from "react-native-swiper";
import moment from "moment";

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
import { back, getOrderBuyFlowerList } from "actions";

moment.duration.fn.format = function() {
    const units = [
            { years: "年" },
            { months: "个月" },
            { weeks: "周" },
            { days: "天" },
            { hours: "小时" },
            { minutes: "分钟" },
            { seconds: "秒" }
            //{ milliseconds : '微秒'}
        ],
        result = [];
    for (let i = 0, len = units.length; i < len; i++) {
        for (const prop in units[i]) {
            const num = this._data[prop];
            if (num > 0) {
                result.push(num + units[i][prop]);
            }
        }
    }
    return result.join("");
};
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const tabs = [
    { label: "匹配中", value: "0" },
    { label: "待付款", value: "1" },
    { label: "待确认", value: "2" },
    { label: "成长中", value: "3" },
    { label: "已完成", value: "4" }
];
const getListByState = (state, data, timeDown) => {
    const {
        number,
        date,
        statenoice,
        assign_money,
        finishdate
        //predictmatchdate
        // growup_endtime
    } = data;
    switch (state) {
        case "0":
            return [
                {
                    label: "申请编号：",
                    value: number
                },
                {
                    label: "订单金额：",
                    value: assign_money
                },
                {
                    label: "申请时间：",
                    value: date
                },
                {
                    label: "当前状态： ",
                    value: statenoice
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
                    label: "申请编号：",
                    value: number
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
                    label: "申请编号：",
                    value: number
                },
                {
                    label: "订单金额：",
                    value: assign_money
                },
                {
                    label: "完成时间：",
                    value: finishdate
                },
                // {
                //     label: "当前状态： ",
                //     value: statenoice
                // },
                {
                    label: "成长中倒计时：",
                    value: timeDown,
                    valueStyle: {
                        color: "#FF0000"
                    }
                }
            ];
        case "4":
        default:
            return [
                {
                    label: "申请编号：",
                    value: number
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
                    label: "成长中倒计时：",
                    value: "恭喜成长周期已到，您可以进入花园仓库中查收。",
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
        swiper: {
            visible: false,
            data: [],
            size: []
        },
        voucherImgList: [],
        isComplaint: false
    };
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
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
        const { or_number } = this.props.navigation.state.params;
        const options = {
            title: "上传打款凭证",
            cancelButtonTitle: "取消",
            takePhotoButtonTitle: "拍照",
            chooseFromLibraryButtonTitle: "从相册选取",
            mediaType: "photo",
            quality: 0.1,
            permissionDenied: {
                title: "没有权限",
                text: "请在设置中允许清沐家园的相关权限,以便提高更好的使用体验",
                reTryTitle: "重试",
                okTitle: "我知道了"
            }
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
                                number: or_number,
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
                                    Tip.fail(`上传失败:${err}`);
                                });
                        })
                        .catch(err => {
                            Tip.fail(`上传失败:${err}`);
                        });
                    break;
                case !!didCancel:
                default:
                    break;
            }
        });
    };
    TimeDown = endDateStr => {
        const end = moment(endDateStr);

        //当前时间
        const start = moment();

        if (end.unix() - start.unix() <= 0) {
            this.setState({
                timeDown: "订单已完成 请注意查收!"
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
    renderUser() {
        const {
            state,
            assign_account,
            assign_money,
            matchdate,
            assign_endtime,
            assign_bank_user,
            assign_bank_name,
            assign_bank_card,
            assign_mobile,
            assign_logo,
            alipay_account
        } = this.props.navigation.state.params;
        const { timeDown } = this.state;
        if (state === "0" || state === "3" || state === "4") {
            return null;
        }
        if (
            ["1", "2"].includes(state) &&
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
                                  label: "付款倒计时：",
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
                        {
                            label: "收款姓名：",
                            value: assign_bank_user
                        },
                        {
                            label: "开户银行：",
                            value: assign_bank_name
                        },
                        {
                            label: "银行账户：",
                            value: assign_bank_card
                        },
                        {
                            label: "支付宝：",
                            value: alipay_account
                        },
                        {
                            label: "收款人电话：",
                            value: assign_mobile
                        }
                    ])}
                </View>
            </View>
        );
    }
    renderList = data => {
        const { timeDown } = this.state;
        const {
            params,
            params: { state, growup_endtime }
        } = this.props.navigation.state;
        if (state === "3" && growup_endtime && !this.startTimedown) {
            this.startTimedown = true;
            this.TimeDown(growup_endtime);
        }

        return (data ? data : getListByState(state, params, timeDown)).map(
            item => {
                if (typeof item === "string") {
                    return (
                        <View style={styles.item} key={item}>
                            <Text style={styles.itemLabelText}>{item}</Text>
                        </View>
                    );
                } else {
                    const { label, value, labelStyle, valueStyle } = item;
                    if (
                        label.includes("电话") ||
                        ["银行账户：", "支付宝：", "收款姓名："].includes(label)
                    ) {
                        return (
                            <Button
                                onPress={() => {
                                    if (
                                        [
                                            "银行账户：",
                                            "支付宝：",
                                            "收款姓名："
                                        ].indexOf(label) > -1
                                    ) {
                                        Clipboard.setString(value);
                                        Tip.success("复制成功");
                                    } else {
                                        Linking.openURL("tel:" + value);
                                    }
                                }}
                                style={styles.item}
                                key={label}
                            >
                                <Text
                                    style={[styles.itemLabelText, labelStyle]}
                                >
                                    {label}
                                </Text>
                                <Text
                                    style={[styles.itemValueText, valueStyle]}
                                >
                                    {value}
                                </Text>
                            </Button>
                        );
                    } else {
                        return (
                            <View style={styles.item} key={label}>
                                <Text
                                    style={[styles.itemLabelText, labelStyle]}
                                >
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
            }
        );
    };
    renderVoucher() {
        const { voucherImgList, isComplaint } = this.state;
        const {
            state,
            or_number,
            voucher = [],
            complaint
        } = this.props.navigation.state.params;
        if (state === "0" || state === "3" || state === "4") {
            return null;
        }
        const isComplaintVar = complaint === "1" || isComplaint;
        return (
            <Visible show={state !== "0"}>
                <View style={styles.voucher}>
                    <Visible show={state === "3"}>
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
                    </Visible>
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
                            {(voucher || []).map(uri => {
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
                    </View>
                    <Visible show={state === "1"}>
                        <Button
                            style={styles.submit}
                            textStyle={styles.submitStyle}
                            onPress={() => {
                                if (voucherImgList.length) {
                                    orderBuySureCollection({
                                        number: or_number
                                    }).then(res => {
                                        Tip.success("确认收款成功!");
                                        getOrderBuyFlowerList();
                                        back();
                                    });
                                } else {
                                    Tip.fail("请先上传凭证!");
                                }
                            }}
                        >
                            确认付款
                        </Button>
                    </Visible>
                </View>
            </Visible>
        );
    }
    render() {
        const {
            alert: { visible, content },
            comfirm,
            swiper
        } = this.state;
        const {
            name,
            money,
            state,
            date,
            percent,
            number,
            type,
            or_number
        } = this.props.navigation.state.params;
        return (
            <Page title="申请订单详情">
                <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Icon source={iconSource[type]} size={60} />
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
                                    <Text style={styles.productScheduleText}>
                                        {percent}
                                        成长值
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.bottom}>
                            {this.renderList()}

                            {/*
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
                                    */}

                            {this.renderUser()}
                            {this.renderVoucher()}
                        </View>
                    </View>
                    <Comfirm
                        visible={comfirm.visible}
                        title={comfirm.content}
                        onOk={() => {
                            if (comfirm.content === "是否投诉") {
                                orderComplaint({ number: or_number }).then(
                                    res => {
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
                                    }
                                );
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
