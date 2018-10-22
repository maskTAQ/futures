import React, { PureComponent } from "react";
import { View, ScrollView, Linking } from "react-native";

import { about as styles } from "./styles";
import { Page, Text, Button } from "components";
import { checkUpdate } from "apis";

const content = [
    "1.通过邀请链接下载APP",
    "2.登陆APP注册账户，一个手机号最多注册2个账户",
    "3.每个账户激活需要一个邀请码，向邀请人购买并激活账户",
    "4.注册成功并激活后需完善个人收款信息，银行卡，支付宝",
    ["购买规则"],
    "1.邀请码200元1个，只可向上级购买，激活下级用户",
    "2.牡丹花2000元，桔梗花5000元，木兰花10000元，天堂鸟20000元.",
    " 3.申请种植花卉需消耗相对于的有机肥（1袋=100元），",
    "4.牡丹花1袋，桔梗花1袋，木兰花2袋，天堂鸟4袋。",
    "5.每个种植周期10天，至少播种一次，最多两次，当上笔订单成长周期结束方可进行新订单申请，注：一个成长周期内只允许一个正在成长中在订单。（防撞单）",
    "6.复投订单可直接进入成长周期。",
    ["匹配与付款"],
    "1.种植申请为3-5天，成长周期5天，出售时间48小时",
    "2.成功匹配后12小时内进行打款交易",
    "3.问题单投诉后当天重新匹配`",
    "4.上传假截图，超时不打款，永久封号并扣除推荐人推荐奖金1000元",
    ["静动态收益说明"],
    "1.静态收益为花卉种植金额的20%（5天）",
    "2.初级园艺师V1",
    "最低种植申请为2000，享2待推荐奖一待5% ，二待4%！",
    "3.中级园艺师V2",
    "最低种植申请为5000，享3待推荐奖一待5%，二待4%，三待3%！",
    "4.高级园艺师V3",
    "最低种植申请为10000，享5待推荐奖一待5%，二待4%，三待3%，四待2%，五待1%",
    ["烧伤制度"],
    "1.采取1:1烧伤制度，例如：A会员订单申请10000元，B会员订单申请20000元,则A会员只能拿到B会员10000元的推荐奖",
    "2.团队烧伤：若伞下会员优先上级升级，则上级烧伤，不再享受该会员伞下收益。",
    ["其它规则"],
    "1.每天晚22：00至次日8：00不匹配！可以注册，激活，打款完成当前订单。",
    "2.账户激活后24小时内未申请种植则冻结账户。",
    "3.更改个人信息需消耗一个邀请码。",
    "4.非永久冻结账户解封需200元",
    "5.静态提现为200和200的倍数，动态提现为500和500的倍数，每日只可提现一次。",
    "6.V1动态奖金提现每日限额2000，V2动态奖金提现每日限额5000，V3动态奖金提现每日限额10000。"
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
                            if (typeof row === "string") {
                                return (
                                    <Text style={styles.contentText} key={row}>
                                        {row}
                                    </Text>
                                );
                            } else {
                                return (
                                    <Text
                                        style={styles.subTitleText}
                                        key={row[0]}
                                    >
                                        {row[0]}
                                    </Text>
                                );
                            }
                        })}
                    </ScrollView>
                    <Button
                        style={styles.submit}
                        textStyle={styles.submitStyle}
                        onPress={() => {
                            checkUpdate().then(({ url }) => {
                                Linking.openURL(url);
                                //console.log(res,'res');
                            });
                        }}
                    >
                        检测版本更新
                    </Button>
                </View>
            </Page>
        );
    }
}
