import React, { PureComponent } from "react";
import { View } from "react-native";

import { buy as styles, alert as alertStyle } from "./styles";
import { Page, Text, Button, Icon, Alert } from "components";
import { iconSource } from "commons";

export default class Buy extends PureComponent {
    state = {
        a: "",
        b: "",
        isEnough: true
    };
    render() {
        const { isEnough } = this.state;
        return (
            <Page title="购买鲜花">
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>购买花种：</Text>
                        </View>
                        <View style={styles.intro}>
                            <Icon size={84} source={iconSource.mudan} />
                            <View style={styles.introDetail}>
                                <View style={styles.productName}>
                                    <Text style={styles.productNameText}>
                                        牡丹花
                                    </Text>
                                </View>
                                <View style={styles.productDesc}>
                                    <Text style={styles.productDescText}>
                                        预计每个生长周期收入20%
                                    </Text>
                                    <Text style={styles.productDescText}>
                                        2000
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
                            <Text style={styles.consumeText}>5个</Text>
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
