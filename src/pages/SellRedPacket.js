import React, { PureComponent } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { sellRedPacket as styles } from "./styles";
import { Page, Text, Input, Button } from "components";

export default class SellRedPacket extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object
    };
    state = {};
    render() {
        const { title } = this.props.navigation.state.params;
        return (
            <Page title={title}>
                <View style={styles.container}>
                    <Text style={styles.labelText}>转让数量：</Text>
                    <Input style={styles.input} />
                    <Text style={styles.balanceText}>当前余额:0</Text>
                    <Text style={styles.hintText}>规则：200元起200的倍数</Text>
                    <Button
                        style={styles.submit}
                        textStyle={styles.submitStyle}
                        onPress={() => {}}
                    >
                        确定发布
                    </Button>
                </View>
            </Page>
        );
    }
}
