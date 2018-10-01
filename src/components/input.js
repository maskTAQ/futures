import React from "react";
import { TextInput } from "react-native";
import PropTypes from "prop-types";

const Input = ({ style, ...otherProps }) => {
    return (
        <TextInput
            clearButtonMode="while-editing"
            autoCapitalize={"none"}
            autoCorrect={false}
            underlineColorAndroid="transparent"
            {...otherProps}
            style={[{ margin: 0, padding: 0 }, style]}
        />
    );
};

Input.propTypes = {
    style: PropTypes.object
};

export default Input;
