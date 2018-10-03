import React, { PureComponent } from "react";
import { View } from "react-native";

import { changeDealPassword as styles } from "./styles";
import { Page, Text, Input, Button } from "components";

const inputList = [
    [
        {
            placeholder: "卡号",
            key: "old"
        },
        {
            placeholder: "开户行",
            key: "new"
        },
        {
            placeholder: "收款姓名",
            key: "newT"
        },
        {
            placeholder: "联系电话",
            key: "mobile"
        }
    ],
    [
        {
            placeholder: "支付宝账号",
            key: "old"
        },
        {
            placeholder: "收款人姓名",
            key: "new"
        }
    ],
    [
        {
            placeholder: "设置交易密码",
            key: "old"
        },
        {
            placeholder: "确认交易密码",
            key: "new"
        }
    ]
];
export default class AccountInfo extends PureComponent {
    state = {};
    render() {
        return (
            <Page title="修改交易密码">
                <View style={styles.container}>
                    {inputList.map((group, groupI) => {
                        return (
                            <View style={styles.group} key={groupI}>
                                {group.map(({ placeholder, key }) => {
                                    return (
                                        <View style={styles.item} key={key}>
                                            <Text style={styles.itemLabelText}>
                                                {placeholder}
                                            </Text>
                                            <Input style={styles.itemInput} />
                                        </View>
                                    );
                                })}
                            </View>
                        );
                    })}

                    <Button
                        style={styles.submit}
                        textStyle={styles.submitStyle}
                    >
                        完成
                    </Button>
                </View>
            </Page>
        );
    }
}
