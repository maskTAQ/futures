import React, { PureComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { Header } from "components";
import { mine as styles } from "./styles";

@connect()
export default class Mine extends PureComponent {
    state = {};
    render() {
        return (
            <View style={styles.container}>
                <Header title="个人中心" LeftComponent={null} />
            </View>
        );
    }
}
