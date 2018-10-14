import React, { PureComponent } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { buy as styles, alert as alertStyle } from "./styles";
import { Page, Text, Button, Icon, Alert } from "components";
import { iconSource } from "commons";

export default class Buy extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object
    };
    state = {
        a: "",
        b: "",
        isEnough: true
    };
    render() {
        const { isEnough } = this.state;
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
                        <Text style={styles.residueText}>当前剩余5个</Text>
                        <Button
                            style={styles.submit}
                            textStyle={styles.submitStyle}
                            onPress={() => {
                                this.setState({
                                    isEnough: false
                                });
                            }}
                        >
                            确定发布
                        </Button>
                    </View>
                </View>
                <Alert
                    visible={!isEnough}
                    requestClose={() => {
                        this.setState({
                            isEnough: true
                        });
                    }}
                >
                    <View style={alertStyle.container}>
                        <View>
                            <Text style={alertStyle.errorTitleText}>
                                Sorry...
                            </Text>
                            <Text style={alertStyle.errorContentText}>
                                网络故障{" "}
                            </Text>
                        </View>
                        <Button
                            style={alertStyle.submit}
                            textStyle={alertStyle.submitText}
                        >
                            OK
                        </Button>
                    </View>
                </Alert>
            </Page>
        );
    }
}
