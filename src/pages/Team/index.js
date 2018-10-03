import React, { PureComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";

import { Text, Icon } from "components";
import { team as styles } from "../styles";
import Tree from "./Tree";
import Search from "./Search";
import { iconSource } from "commons";

const data = [
    {
        username: "张xx",
        lv: 2,
        showChildren: true,
        children: [
            {
                username: "张1xx",
                lv: 2,
                showChildren: true,
                freeze: true,
                children: [
                    {
                        username: "张2xx",
                        lv: 2,
                        showChildren: true
                    }
                ]
            }
        ]
    },
    {
        username: "1张xx",
        lv: 2,
        showChildren: false,
        children: [
            {
                username: "1张1xx",
                lv: 2,
                showChildren: false,
                children: [
                    {
                        username: "1张2xx",
                        lv: 2,
                        showChildren: false
                    }
                ]
            }
        ]
    }
];
@connect()
export default class Team extends PureComponent {
    state = {
        data,
        searchValue: ""
    };
    onTreeNodeVisibleChange = d => {
        const { data } = this.state;
        const nextData = _.cloneDeep(data);

        const isMatchNode = (a = []) => {
            for (let i = 0; i < a.length; i++) {
                if (a[i].username === d.username) {
                    a[i].showChildren = d.showChildren;
                    this.setState({
                        data: nextData
                    });
                    break;
                } else {
                    isMatchNode(a[i].children);
                }
            }
        };
        isMatchNode(nextData);
    };
    getCount = () => {
        const { data } = this.state;
        let count = 0;
        const traverse = (a = []) => {
            for (let i = 0; i < a.length; i++) {
                count += 1;
                traverse(a[i].children);
            }
        };
        traverse(data);
        return count;
    };
    render() {
        const { data, searchValue } = this.state;
        return (
            <View style={styles.container}>
                <Search
                    value={searchValue}
                    onChangeSearch={searchValue => {
                        this.setState({
                            searchValue
                        });
                    }}
                />
                <View style={styles.invite}>
                    <View style={styles.inviteLeft}>
                        <Icon
                            source={iconSource.invite}
                            style={styles.inviteIcon}
                        />
                        <Text style={styles.inviteText}>邀请列表</Text>
                    </View>
                    <View style={styles.inviteRight}>
                        <Icon
                            source={iconSource.right}
                            style={styles.rightIcon}
                        />
                    </View>
                </View>
                <Text style={styles.countText}>
                    当前团队总人数：
                    <Text style={styles.numText}>{this.getCount()}</Text> 人
                </Text>
                <Tree
                    data={data}
                    requestTreeNodeVisibleChange={this.onTreeNodeVisibleChange}
                />
            </View>
        );
    }
}
