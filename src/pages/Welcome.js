import React from "react";
import { View, Image, StatusBar } from "react-native";

import { welcome as styles } from "./styles";
import { iconSource } from "commons";

const Welcome = () => {
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={"transparent"}
                translucent={true}
                barStyle="light-content"
            />
            <Image source={iconSource.welcome} />
            <Image source={iconSource.slogan} style={styles.slogan} />
        </View>
    );
};

export default Welcome;
