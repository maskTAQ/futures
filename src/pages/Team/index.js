import React, { PureComponent } from "react";
import { View, ScrollView } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";

import { Text, Icon, Button } from "components";
import { navigate, getTeam } from "actions";
import { team as styles } from "../styles";
import Tree from "./Tree";
import Search from "./Search";
import { iconSource } from "commons";

@connect(({ data }) => {
    console.log(data, "data");
    return { team: data.team };
})
export default class Team extends PureComponent {
    static propTypes = {
        team: PropTypes.object
    };
    state = {
        data: [],
        searchValue: ""
    };

    UNSAFE_componentWillMount() {
        if (!this.props.team) {
            getTeam();
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.team !== nextProps.team && nextProps.team) {
            this.setState({
                data: nextProps.team.team
            });
        }
    }
    onTreeNodeVisibleChange = d => {
        const { data } = this.state;
        const nextData = _.cloneDeep(data);
        const isMatchNode = (a = []) => {
            for (let i = 0; i < a.length; i++) {
                if (a[i].user_id === d.user_id) {
                    a[i].showChildren = d.showChildren;
                    this.setState({
                        data: nextData
                    });
                    break;
                } else {
                    isMatchNode(a[i].team);
                }
            }
        };
        isMatchNode(nextData);
    };
    render() {
        const { searchValue, data = [] } = this.state;
        const { total = 0 } = this.props.team || {};
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
                <Button
                    onPress={() => {
                        navigate({
                            routeName: "InviteList"
                        });
                    }}
                    style={styles.invite}
                >
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
                </Button>
                <Text style={styles.countText}>
                    当前团队总人数：
                    <Text style={styles.numText}>{total}</Text> 人
                </Text>
                <ScrollView>
                    <Tree
                        data={data}
                        requestTreeNodeVisibleChange={
                            this.onTreeNodeVisibleChange
                        }
                    />
                </ScrollView>
            </View>
        );
    }
}
