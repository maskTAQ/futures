import React from "react";
import { View, Modal, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

import { Icon } from "../";
import createStyle from "./style";

const closeIcon = require("./style/close.png");

const Alert = ({ children, visible = false, requestClose }, context) => {
    const styles = createStyle(context.theme);
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType={"fade"}
            onRequestClose={() => {}}
        >
            <View style={styles.container}>
                <View style={styles.box}>
                    <TouchableWithoutFeedback onPress={requestClose}>
                        <View style={styles.close}>
                            <Icon source={closeIcon} size={25} />
                        </View>
                    </TouchableWithoutFeedback>
                    {children}
                </View>
            </View>
        </Modal>
    );
};
Alert.propTypes = {
    visible: PropTypes.bool,
    requestClose: PropTypes.func,
    children: PropTypes.any
};

export default Alert;
