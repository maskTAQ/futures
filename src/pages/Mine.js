import React, { PureComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { Header } from "components";
import { Icon, Text } from "components";
import { iconSource } from "commons";
import { mine as styles } from "./styles";

@connect()
export default class Mine extends PureComponent {
    state = {};
    renderHeader() {
        return (
            <View style={styles.header}>
                <Icon source={iconSource.defaultPortrait} size={44} />
                <View style={styles.headerContent}>
                    <View
                        style={[
                            styles.headerContentTop,
                            styles.headerContentItem
                        ]}
                    >
                        <View style={styles.username}>
                            <Text style={styles.usernameText}>12</Text>
                            <View style={styles.lv}>
                                <Text style={styles.lvText}>v2</Text>
                            </View>
                            <Icon source={iconSource.vipIcon} size={14} />
                        </View>
                    </View>
                    <View
                        style={[
                            styles.headerContentItem,
                            styles.headerContentBottom
                        ]}
                    >
                        <Text style={styles.repositoryNumText}>
                            仓库数量: 1
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <Header title="个人中心" LeftComponent={null} />
                {this.renderHeader()}
            </View>
        );
    }
}
