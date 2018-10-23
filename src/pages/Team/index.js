import React, { PureComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";

import { Text, Icon, Button, RefreshContainer } from "components";
import { navigate, getTeam } from "actions";
import { team as styles } from "../styles";
import Tree from "./Tree";
import List from "./list";
import Search from "./Search";
import { iconSource } from "commons";

@connect(({ data, loading }) => {
    return { team: data.team, loading };
})
export default class Team extends PureComponent {
    static propTypes = {
        team: PropTypes.object,
        loading: PropTypes.object
    };
    state = {
        data: [],
        searchValue: ""
    };

    UNSAFE_componentWillMount() {
        //if (!this.props.team) {
        getTeam();
        //}
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.team !== nextProps.team && nextProps.team) {
            this.setState({
                data: nextProps.team.team || []
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
    matchMember() {
        const { searchValue, data = [] } = this.state;

        const result = [];
        const match = data => {
            data.forEach(item => {
                const { user_id, team } = item;
                if (user_id.includes(searchValue)) {
                    result.push(item);
                }
                if (team) {
                    match(team);
                }
            });
        };
        match(data);
        console.log(result, "data");
        return result;
    }
    render() {
        const { searchValue, data = [] } = this.state;
        const { total = 0 } = this.props.team || {};

        console.log(searchValue, "searchValue");
        return (
            <View style={styles.container}>
                <Search
                    value={searchValue}
                    onChangeSearch={searchValue => {
                        console.log(searchValue, "searchValue");
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
                <RefreshContainer
                    requestRefresh={getTeam}
                    refreshing={this.props.loading.data.team.loading}
                >
                    {searchValue ? (
                        <List data={this.matchMember()} />
                    ) : (
                        <Tree
                            data={data}
                            requestTreeNodeVisibleChange={
                                this.onTreeNodeVisibleChange
                            }
                        />
                    )}
                </RefreshContainer>
            </View>
        );
    }
}
