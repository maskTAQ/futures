import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";

const WrapperText = ({ style, ...otherProps }) => {
    return (
        <Text
            {...otherProps}
            style={[{ fontFamily: "PingFangSC-Regular" }, style]}
        />
    );
};

WrapperText.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default WrapperText;
