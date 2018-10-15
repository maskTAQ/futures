import React from "react";
import { View, Modal, TouchableWithoutFeedback, StatusBar } from "react-native";
import PropTypes from "prop-types";

import { Button, Text } from "../index";
import styles from "./style";

const Comfirm = ({ title, okText, cancelText, onOk, onCancel, visible }) => {
    return (
        <Modal
            transparent={true}
            onRequestClose={() => {}}
            visible={visible}
            animationType="fade"
        >
            <StatusBar
                backgroundColor="rgba(0,0,0,0.3)"
                translucent={true}
                barStyle="light-content"
            />
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.list}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>{title}</Text>
                            </View>
                            <Button
                                onPress={onOk}
                                style={styles.ok}
                                textStyle={styles.okText}
                            >
                                {okText}
                            </Button>
                        </View>
                        <Button
                            onPress={onCancel}
                            style={styles.cancel}
                            textStyle={styles.cancelText}
                        >
                            {cancelText}
                        </Button>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};
Comfirm.defaultProps = {
    okText: "确定",
    cancelText: "取消"
};
Comfirm.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
};
export default Comfirm;
