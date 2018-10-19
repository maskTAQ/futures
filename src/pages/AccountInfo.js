import React, { PureComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { changeDealPassword as styles } from "./styles";
import { Page, Text, Input, Button } from "components";
import { collectionInfo } from "apis";
import { Tip } from "commons";
import { getBanckInfo } from "actions";

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
            placeholder: "收款人姓名",
            key: "alipay_name"
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

@connect(({ data }) => {
    return { bankInfo: data.bankInfo };
})
export default class AccountInfo extends PureComponent {
    static propTypes = {
        wallet: PropTypes.object
    };
    state = {};
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
        return (
            <Page title="收款信息">
                <View style={styles.container}>
                    {inputList.map((group, groupI) => {
                        return (
                            <View style={styles.group} key={groupI}>
                                {group.map(({ placeholder, key, props }) => {
                                    return (
                                        <View style={styles.item} key={key}>
                                            <Text style={styles.itemLabelText}>
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
                                alipay_name
                            } = this.state;
                            collectionInfo({
                                bank_card_number,
                                bank_name,
                                bankpayee_name,
                                bank_phone,
                                alipay_account,
                                alipay_name
                            }).then(() => {
                                getBanckInfo();
                                Tip.success("账户信息修改成功");
                            });
                        }}
                    >
                        完成
                    </Button>
                </View>
            </Page>
        );
    }
}
