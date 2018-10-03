import React, { PureComponent } from "react";
import { View, ScrollView } from "react-native";

import { about as styles } from "./styles";
import { Page, Text, Button } from "components";

const content = [
    "1.通过邀请链接下载APP",
    "2.登陆APP注册账户，一个手机号最多注册2个账户",
    "3.每个账户激活需要一个邀请码，向邀请人购买并激活账户",
    "4.注册成功并激活后需完善个人收款信息，银行卡，支付宝",
    "购买规则",
    "1.邀请码200元1个，只可向上级购买，激活下级用户",
    "2.牡丹花2000元，桔梗花5000元，木兰花10000元，天堂鸟20000元.",
    " 3.申请种植花卉需消耗相对于的有机肥（1袋=100元），",
    "4.牡丹花1袋，桔梗花1袋，木兰花2袋，天堂鸟4袋。",
    "5.每个种植周期10天，至少播种一次，最多两次，当上笔订单成长周期结束方可进行新订单申请，注：一个成长周期内只允许一个正在成长中在订单。（防撞单）",
    "6.复投订单可直接进入成长周期。",
    " 匹配与付款",
    "1.种植申请为3-5天，成长周期5天，出售时间48小时",
    "2.成功匹配后12小时内进行打款交易",
    "3.问题单投诉后当天重新匹配`"
];
export default class About extends PureComponent {
    state = {};
    render() {
        return (
            <Page title="关于我们">
                <View style={styles.container}>
                    <ScrollView style={styles.content}>
                        <Text style={styles.titleText}>青沐家园</Text>
                        <Text style={styles.subTitleText}>注册流程</Text>
                        {content.map(row => {
                            return (
                                <Text style={styles.contentText} key={row}>
                                    {row}
                                </Text>
                            );
                        })}
                    </ScrollView>
                    <Button
                        style={styles.submit}
                        textStyle={styles.submitStyle}
                    >
                        检测版本更新
                    </Button>
                </View>
            </Page>
        );
    }
}
