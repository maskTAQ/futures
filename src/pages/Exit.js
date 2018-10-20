import React from "react";
import { View, Text, StatusBar } from "react-native";

import { welcome as styles } from "./styles";
//import { iconSource } from "commons";

const Exit = () => {
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={"transparent"}
                translucent={true}
                barStyle="light-content"
            />
            <Text style={{ fontSize: 30 }}>我是退出页面</Text>
        </View>
    );
};

export default Exit;
