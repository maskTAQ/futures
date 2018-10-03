import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { team as teamStyles } from "../styles";
import { Input, Icon } from "components";
import { iconSource } from "commons";

const styles = teamStyles.search;

const Search = ({ value, onChangeSearch }) => {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Input
                    value={value}
                    onChangeText={onChangeSearch}
                    placeholder="通过ID名称模糊搜索"
                    style={styles.input}
                    placeholderTextColor="#fff"
                />
                <Icon size={16} source={iconSource.search} />
            </View>
        </View>
    );
};
Search.propTypes = {
    value: PropTypes.string,
    onChangeSearch: PropTypes.func
};

export default Search;
