import React from "react";
import { View, FlatList } from "react-native";
import PropTypes from "prop-types";

const RefreshContainer = ({ requestRefresh, refreshing, style, children }) => {
    return (
        <View style={[{ flex: 1 }, style]}>
            <FlatList
                data={["container"]}
                style={[{ flex: 1 }]}
                onRefresh={requestRefresh}
                refreshing={refreshing}
                keyExtractor={row => row}
                renderItem={() => children}
            />
        </View>
    );
};
RefreshContainer.propTypes = {
    requestRefresh: PropTypes.func,
    refreshing: PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    children: PropTypes.any
};
export default RefreshContainer;
