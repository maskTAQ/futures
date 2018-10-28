import React from "react";
import { View, Modal, TouchableWithoutFeedback, StatusBar } from "react-native";
import PropTypes from "prop-types";

import { Icon, Visible } from "../";
import createStyle from "./style";

const closeIcon = require("./style/close.png");

const Alert = (
    { children, visible = false, requestClose, showClose = true },
    context
) => {
    const styles = createStyle(context.theme);
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType={"fade"}
            onRequestClose={() => {}}
        >
            <StatusBar
                backgroundColor="rgba(0,0,0,0.3)"
                translucent={true}
                barStyle="light-content"
            />
            <TouchableWithoutFeedback onPress={requestClose}>
                <View style={styles.container}>
                    <View style={styles.box}>
                        <Visible show={showClose}>
                            <TouchableWithoutFeedback onPress={requestClose}>
                                <View style={styles.close}>
                                    <Icon source={closeIcon} size={40} />
                                </View>
                            </TouchableWithoutFeedback>
                        </Visible>
                        {children}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};
Alert.propTypes = {
    visible: PropTypes.bool,
    requestClose: PropTypes.func,
    children: PropTypes.any,
    showClose: PropTypes.bool
};

export default Alert;
