import React, { PureComponent } from "react";
import { View, Image } from "react-native";
import { connect } from "react-redux";

import { login as styles } from "../styles";
import User from "./User";

const bg = require("./img/bg.png");
const radius = require("./img/radius.png");
@connect(({ stock, loading, quotation }) => ({
    choiceAll: stock.choice || [],
    choiceAllLoading: loading.stock.choice.loading,
    quotation: quotation.all || {}
}))
export default class Home extends PureComponent {
    state = {};
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.bgContainer}>
                    <Image source={bg} style={styles.bg} resizeMode="stretch" />
                    <Image
                        source={radius}
                        style={styles.radius}
                        resizeMode="stretch"
                    />
                </View>
                <User username={"张某某"} lv={2} repositoryNum={2333.4} />
            </View>
        );
    }
}
