import React, { Component } from "react";
import { Text, View, Image, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

import theme from '../theme';
import IconMap from "./Config.json";
import styles from "./style/index";


export default class Icon extends Component {
  static defaultProps = {
    size: 48,
    color: theme.icon.tintColor,
    shape: 'default',
  };
  static contextTypes = {
    theme: PropTypes.object
  };
  static propTypes = {
    type: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    source: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    shape: PropTypes.string
  };
  state = {
    //当图片资源为网络资源时的state
    pending: true,
    status: '',//emua {'success','error'}
  };
  renderFontIcon() {
    const { size, color, type,style } = this.props;
    return <Text style={[styles.fontIcon, { fontSize: size, color }, style]}>{IconMap[type]}</Text>
  }
  renderImageIcon() {
    const { size, source,style } = this.props;
    const { pending, status } = this.state;
    return (
      <View style={[styles.imageIconBox, style || { width: size, height: size }]}>
        {
          pending && (
            <ActivityIndicator
              style={styles.imgPeningIndicator}
              color="#ccc"
              size="small"
            />
          )
        }
        <Image
          source={status === 'error' ? require('./img/error.png') : source}
          style={[styles.imageIcon, { width: size, height: size }]}
          resizeMode="contain"
          //tintColor={color}
          onError={() => {
            this.setState({
              pending: false,
              status: 'error'
            });
          }}
          onLoad={() => {
            this.setState({
              pending: false,
              status: 'success'
            });
          }}
        />
      </View>
    )
  }
  render() {
    const { type } = this.props;
    return (
      <View style={styles.iconWrapper}>
        {type ? this.renderFontIcon() : this.renderImageIcon()}
      </View>
    )
  }
}
