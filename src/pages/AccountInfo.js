import React, { PureComponent } from "react";
import { View, Alert as A } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { changeDealPassword as styles, alert as alertStyle } from "./styles";
import { Page, Text, Input, Button, Alert } from "components";
import { collectionInfo, tradePassword } from "apis";
import { Tip } from "commons";
import { getBanckInfo, getHome } from "actions";

const inputList = [
    [
        {
            placeholder: "卡号",
            props: {
                keyboardType: "numeric"
            },
            key: "bank_card_number"
        },
        {
            placeholder: "开户行",
            key: "bank_name"
        },
        {
            placeholder: "收款姓名",
            key: "bankpayee_name"
        },
        {
            placeholder: "联系电话",
            props: {
                keyboardType: "numeric"
            },
            key: "bank_phone"
        }
    ],
    [
        {
            placeholder: "支付宝账号",
            key: "alipay_account"
        },
        {
            placeholder: "交易密码",
            props: {
                secureTextEntry: true
            },
            key: "traders_password"
        },
        {
            placeholder: "确认交易密码",
            props: {
                secureTextEntry: true
            },
            key: "traders_passwordT"
        }
    ]
    // [
    //     {
    //         placeholder: "设置交易密码",
    //         key: "old"
    //     },
    //     {
    //         placeholder: "确认交易密码",
    //         key: "new"
    //     }
    // ]
];

@connect(({ data, user }) => {
    return { bankInfo: data.bankInfo, home: data.home, user: user.main };
})
export default class AccountInfo extends PureComponent {
    static propTypes = {
        wallet: PropTypes.object,
        getData: PropTypes.object
    };
    state = {
        isVerifyVisible: false,
        password: ""
    };
    UNSAFE_componentWillMount() {
        if (!this.props.wallet) {
            getBanckInfo();
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps.bankInfo
        });
    }
    render() {
        const { isVerifyVisible, password } = this.state;
        const { bankstate } = this.props.home || {};
        return (
            <Page title="收款信息">
                <View style={styles.container}>
                    {inputList.map((group, groupI) => {
                        return (
                            <View style={styles.group} key={groupI}>
                                {group
                                    .filter(({ placeholder }) => {
                                        return !(
                                            [
                                                "确认交易密码",
                                                "交易密码"
                                            ].includes(placeholder) &&
                                            bankstate === "1"
                                        );
                                    })
                                    .map(({ placeholder, key, props }) => {
                                        return (
                                            <View style={styles.item} key={key}>
                                                <Text
                                                    style={styles.itemLabelText}
                                                >
                                                    {placeholder}
                                                </Text>
                                                <Input
                                                    value={this.state[key]}
                                                    onChangeText={v => {
                                                        this.setState({
                                                            [key]: v
                                                        });
                                                    }}
                                                    style={styles.itemInput}
                                                    {...props}
                                                />
                                            </View>
                                        );
                                    })}
                            </View>
                        );
                    })}

                    <Button
                        style={styles.submit}
                        textStyle={styles.submitStyle}
                        onPress={() => {
                            const {
                                bank_card_number,
                                bank_name,
                                bankpayee_name,
                                bank_phone,
                                alipay_account,
                                traders_password,
                                traders_passwordT
                            } = this.state;
                            if (traders_passwordT !== traders_password) {
                                Tip.fail("俩次输入的交易密码不一致!");
                            } else {
                                if (bankstate === "1") {
                                    this.setState({
                                        isVerifyVisible: true
                                    });
                                } else {
                                    collectionInfo({
                                        bank_card_number,
                                        bank_name,
                                        bankpayee_name,
                                        bank_phone,
                                        alipay_account,
                                        traders_password
                                    }).then(() => {
                                        getHome();
                                        setTimeout(getBanckInfo, 1000);
                                        Tip.success("账户信息修改成功");
                                    });
                                }
                            }
                        }}
                    >
                        {bankstate === "1" ? "修改" : "完成"}
                    </Button>
                    <Alert
                        visible={isVerifyVisible}
                        requestClose={() => {
                            this.setState({
                                isVerifyVisible: false,
                                password: ""
                            });
                        }}
                    >
                        <View style={alertStyle.container}>
                            <View style={alertStyle.top}>
                                <Text style={alertStyle.titleText}>
                                    请输入交易密码
                                </Text>
                                <Input
                                    style={alertStyle.input}
                                    value={password}
                                    secureTextEntry={true}
                                    onChangeText={password => {
                                        this.setState({
                                            password
                                        });
                                    }}
                                />
                            </View>
                            <View style={alertStyle.btnGroup}>
                                <Button
                                    style={alertStyle.submit}
                                    textStyle={alertStyle.submitText}
                                    onPress={() => {
                                        const {
                                            bank_card_number,
                                            bank_name,
                                            bankpayee_name,
                                            bank_phone,
                                            alipay_account,
                                            traders_password,
                                            password
                                        } = this.state;
                                        tradePassword({
                                            account: this.props.user.account,
                                            password
                                        })
                                            .then(res => {
                                                this.setState(
                                                    {
                                                        isVerifyVisible: false,
                                                        password: ""
                                                    },
                                                    () => {
                                                        collectionInfo({
                                                            bank_card_number,
                                                            bank_name,
                                                            bankpayee_name,
                                                            bank_phone,
                                                            alipay_account,
                                                            traders_password
                                                        }).then(() => {
                                                            setTimeout(
                                                                getBanckInfo,
                                                                1000
                                                            );
                                                            Tip.success(
                                                                "账户信息修改成功"
                                                            );
                                                        });
                                                    }
                                                );
                                            })
                                            .catch(e => {
                                                A.alert(e);
                                            });
                                    }}
                                >
                                    确定发布
                                </Button>
                                <Button
                                    style={alertStyle.cancel}
                                    textStyle={alertStyle.cancelText}
                                    onPress={() => {
                                        this.setState({
                                            isVerifyVisible: false
                                        });
                                    }}
                                >
                                    取消
                                </Button>
                            </View>
                        </View>
                    </Alert>
                </View>
            </Page>
        );
    }
}
