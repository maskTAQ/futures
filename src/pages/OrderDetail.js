import React, { PureComponent } from "react";
import { View } from "react-native";

import { orderDetail as styles } from "./styles";
import { Page, Text, Button, Icon } from "components";
import { iconSource } from "commons";

const list = [
    {
        label: "采收编号：",
        value: "T32587890"
    },
    {
        label: "采购数额：",
        value: "4000.00"
    },
    {
        label: "匹配时间：",
        value: "2016-08-02 02:13:16"
    },
    {
        label: "当前状态： ",
        value: "已确认（2016-08-02 02:46）"
    },
    {
        label: "成长中倒计时：",
        value:
            "恭喜成长周期已到，您可以进入花园仓库中查收。或选择复投马上开始重新生长。"
    }
];
export default class OrderDetail extends PureComponent {
    state = {
        a: "",
        b: "",
        isEnough: true
    };
    render() {
        //const { isEnough } = this.state;
        return (
            <Page title="采收订单详情">
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Icon source={iconSource.mudan} size={80} />
                        <View style={styles.headerContent}>
                            <View style={styles.headerTop}>
                                <Text style={styles.productNameText}>
                                    牡丹花 | 2000
                                </Text>
                                <Text style={styles.productStatusText}>
                                    已经完成
                                </Text>
                            </View>
                            <View style={styles.headerBottom}>
                                <Text style={styles.productTimeText}>
                                    排单时间：2018/09/22 22:12
                                </Text>
                                <Text style={styles.productScheduleText}>
                                    排单时间：2018/09/22 22:12
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        {list.map(({ label, value }) => {
                            return (
                                <View style={styles.item} key={label}>
                                    <Text style={styles.itemLabelText}>
                                        {label}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.itemValueText,
                                            label === "成长中倒计时：" && {
                                                color: "#FF0000"
                                            }
                                        ]}
                                    >
                                        {value}
                                    </Text>
                                </View>
                            );
                        })}
                        <Button
                            style={styles.submit}
                            textStyle={styles.submitStyle}
                            onPress={() => {
                                this.setState({
                                    isEnough: false
                                });
                            }}
                        >
                            复投
                        </Button>
                    </View>
                </View>
            </Page>
        );
    }
}
