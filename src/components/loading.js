import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

const Loading = ({ visible, color, size, text,style={}, textStyle = {} }) => {
    switch (true) {
        case !visible:
            return null;
        case visible && !text:
            return <ActivityIndicator size={size} color={color} />;
        case visible && text:
        default:
            return (
                <View style={style}>
                    <ActivityIndicator size={size} color={color} />;
                     <Text style={textStyle}>{text}</Text>
                </View>
            )
    }
};
Loading.propTypes = {
    visible: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.oneOf(['small', 'large']),
    text: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
export default Loading;