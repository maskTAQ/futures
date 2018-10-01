import React, { Component } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import PropTypes from "prop-types";

import { Button, Loading } from '../';
import createStyle from "./style";

class HXAlert extends Component {
  static propTypes = {
    title: PropTypes.string,
    titleComponent: PropTypes.any,
    message: PropTypes.string,
    messageComponent: PropTypes.any,
    buttons: PropTypes.array,
    visible: PropTypes.bool,
    onFeedback: PropTypes.func,
    style: PropTypes.object
  };
  static contextTypes = {
    theme: PropTypes.object
  };
  static defaultProps = {
    buttons: [],
    onFeedback: () => { }
  };
  state = {
    buttonsStatus: []//[bool :buttonsStatus];
  };
  componentWillMount() {
    this.updateButtonsStatus(this.props.buttons);
  }
  componentWillReceiveProps(nextProps) {
    const { buttons: prevButtons } = this.props;
    const { buttons: nextButtons } = nextProps;
    if (prevButtons.length !== nextButtons.length) {
      this.updateButtonsStatus(nextButtons);
    }
  }
  handlePress = (f = () => { }, i, text) => {
    const { buttonsStatus } = this.state;
    if (buttonsStatus[i]) {
      return
    }
    const result = f();
    //rn 中直接判断构造函数不返回Promise  返回Object
    if (result && result.then && result.catch) {
      const { buttonsStatus } = this.state;
      const nextButtonsStatus = Object.assign([], buttonsStatus);

      nextButtonsStatus[i] = true;
      this.setState({
        buttonsStatus: nextButtonsStatus
      });
      result
        .then(() => {
          nextButtonsStatus[i] = false;
          this.setState({
            buttonsStatus: nextButtonsStatus
          }, () => {
            this.props.onFeedback();
          });
        })
        .catch(e => {
          nextButtonsStatus[i] = false;
          this.setState({
            buttonsStatus: nextButtonsStatus
          })
        })
    }
  }
  updateButtonsStatus(buttons) {
    this.setState({
      buttonsStatus: buttons.map(item => false)
    });
  }
  render() {
    const {
      title,
      titleComponent,
      message,
      messageComponent,
      buttons,
      visible = false,
      onFeedback,
      style
    } = this.props;
    const styles = createStyle(this.context.theme);
    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType={"fade"}
        onRequestClose={() => { }}
      >
        <View style={styles.wrap}>
          <TouchableWithoutFeedback onPress={onFeedback}>
            <View style={styles.feedBack} />
          </TouchableWithoutFeedback>
          <View style={[styles.container, style]}>
            {titleComponent ? (
              titleComponent
            ) : (
                <Text style={styles.title}>{title}</Text>
              )}
            <View style={styles.content}>
              {messageComponent ? (
                messageComponent
              ) : (
                  <Text style={styles.message}>{message}</Text>
                )}
            </View>
            {buttons && buttons.length !== 0 ? (
              <View style={styles.footer}>
                {buttons.map(({ style, onPress, text }, index) => {
                  style = styles[style];
                  const status = this.state.buttonsStatus[index];
                  return (
                    <View style={styles.buttonItem} key={index}>
                      {index !== 0 && <View style={styles.buttonBorder} />}
                      <Button
                        style={styles.button}
                        onPress={() => this.handlePress(onPress, index, text)}
                      >
                        <View style={styles.buttonInner}>
                          <Loading visible={status} size="small" color={style ? style.color : '' || styles.buttonText.color} />
                          <Text style={[styles.buttonText, style]}>
                            {text}
                          </Text>
                        </View>
                      </Button>
                    </View>
                  );
                })}
              </View>
            ) : null}
          </View>
        </View>
      </Modal>
    );
  }
}



export default HXAlert;
