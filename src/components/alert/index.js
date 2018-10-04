import React from "react";
import { View, Modal, TouchableWithoutFeedback } from "react-native";
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
            <View style={styles.container}>
                <View style={styles.box}>
                    <Visible show={showClose}>
                        <TouchableWithoutFeedback onPress={requestClose}>
                            <View style={styles.close}>
                                <Icon source={closeIcon} size={25} />
                            </View>
                        </TouchableWithoutFeedback>
                    </Visible>
                    {children}
                </View>
            </View>
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
