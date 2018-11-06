import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import { list as styles } from "./styles";
import { DataView, Page } from "components";
import { queuingRecord } from "apis";

export default class TransferManureList extends PureComponent {
    static propTypes = {
        orderBuyFlowerList: PropTypes.object,
        loading: PropTypes.object,
        nav: PropTypes.object
    };
    getQueuingRecord = () => {
        return queuingRecord().then(res => {
            console.log(res);
            return res.list;
        });
    };
    renderItem = ({ item: { date, content, num } }) => {
        return (
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <Text style={styles.itemDate}>{date}</Text>
                    <Text style={styles.itemLabel}>{content}</Text>
                </View>
                <View style={styles.itemRight}>
                    <Text style={styles.itemValue}>{num}</Text>
                </View>
            </View>
        );
    };
    render() {
        return (
            <Page title="排单币记录">
                <View style={styles.container}>
                    <DataView
                        getData={this.getQueuingRecord}
                        renderItem={this.renderItem}
                        isPulldownLoadMore={false}
                    />
                </View>
            </Page>
        );
    }
}
