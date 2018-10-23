import React, { PureComponent } from "react";
import { View, Alert as A } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { buy as styles, alert as alertStyle } from "./styles";
import { Page, Text, Button, Icon, Alert, Input } from "components";
import { iconSource, Tip } from "commons";
import { tradePassword, buyFlower } from "apis";
import { getMyWallet, getOrderBuyFlowerList, navigate } from "actions";

@connect(({ data, user }) => {
    return { user: user.main, wallet: data.wallet };
})
export default class Buy extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object,
        user: PropTypes.object,
        wallet: PropTypes.object,
        dispatch: PropTypes.func
    };
    state = {
        a: "",
        b: "",
        password: "",
        isVerifyVisible: false,
        isEnough: true
    };
    UNSAFE_componentWillMount() {
        if (!this.props.wallet) {
            getMyWallet();
        }
    }
    render() {
        const { isVerifyVisible, password } = this.state;
        const { queuing_money: has_queuing_money = 0 } =
            this.props.wallet || {};
        const {
            type,
            name,
            percent,
            money,
            queuing_money
        } = this.props.navigation.state.params;
        return (
            <Page title="购买鲜花">
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>购买花种：</Text>
                        </View>
                        <View style={styles.intro}>
                            <Icon size={84} source={iconSource[type]} />
                            <View style={styles.introDetail}>
                                <View style={styles.productName}>
                                    <Text style={styles.productNameText}>
                                        {name}
                                    </Text>
                                </View>
                                <View style={styles.productDesc}>
                                    <Text style={styles.productDescText}>
                                        预计每个生长周期收入
                                        {percent}%
                                    </Text>
                                    <Text style={styles.productDescText}>
                                        {money}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <View style={styles.consume}>
                            <Text style={styles.consumeText}>
                                消耗排单币（肥料）
                            </Text>
                            <Text style={styles.consumeText}>
                                {queuing_money}个
                            </Text>
                        </View>
                        <Text style={styles.residueText}>
                            当前剩余
                            {has_queuing_money}个
                        </Text>
                        <Button
                            style={styles.submit}
                            textStyle={styles.submitStyle}
                            onPress={() => {
                                if (has_queuing_money <= 0) {
                                    Tip.fail("排单币不足");
                                } else {
                                    this.setState({
                                        isVerifyVisible: true
                                    });
                                }
                            }}
                        >
                            确定发布
                        </Button>
                    </View>
                </View>
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
                                                    buyFlower({ type }).then(
                                                        res => {
                                                            //更新购买列表
                                                            getOrderBuyFlowerList();
                                                            navigate({
                                                                routeName:
                                                                    "OrderBuyFlowerList"
                                                            });
                                                            Tip.success(
                                                                "发布成功"
                                                            );
                                                        }
                                                    );
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
                                        isVerifyVisible: false,
                                        password: ""
                                    });
                                }}
                            >
                                取消
                            </Button>
                        </View>
                    </View>
                </Alert>
            </Page>
        );
    }
}
