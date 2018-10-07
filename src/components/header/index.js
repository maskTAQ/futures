import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import PropTypes from "prop-types";

import { Icon, Button, Text } from "../";
import createStyle from "./style";

const defaultLeftIconSource = require("./img/return.png");

const renderTitle = (styles, title, subTitle = "", style) => {
    if (subTitle) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.titleWrapper}>
                    <Text style={[styles.titleText, style]}>{title}</Text>
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={[styles.titleText, style, { fontSize: 12 }]}>
                        {subTitle}
                    </Text>
                </View>
            </View>
        );
    } else {
        return <Text style={[styles.titleText, style]}>{title}</Text>;
    }
};

export default class Header extends Component {
    static defaultProps = {
        RightComponent: <View />,
        onLeftPress() {}
    };
    static contextTypes = {
        theme: PropTypes.object
    };
    static propTypes = {
        LeftComponent: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.func,
            null
        ]),
        RightComponent: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.func
        ]),
        titleComponent: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.func
        ]),
        style: PropTypes.object,
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        onLeftPress: PropTypes.func,
        titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        dispatch: PropTypes.func,
        barStyle: PropTypes.string,
        leftIconSource: PropTypes.number,
        subTitle: PropTypes.string
    };
    state = {};
    render() {
        const styles = createStyle(this.context.theme);
        const {
            onLeftPress,
            LeftComponent,
            RightComponent,
            titleComponent,
            title,
            subTitle,
            style = {},
            titleStyle,
            barStyle = "light-content",
            leftIconSource = defaultLeftIconSource
        } = this.props;
        const barStyleObj = {
            backgroundColor:
                style.backgroundColor || styles.container.backgroundColor,
            barStyle: barStyle
        };
        return (
            <View style={[styles.container, style]}>
                <StatusBar
                    backgroundColor={"transparent"}
                    translucent={true}
                    barStyle={barStyleObj.barStyle}
                />
                <View style={styles.navigationContainer}>
                    <Button
                        style={[styles.item, styles.leftItem]}
                        onPress={onLeftPress}
                    >
                        {LeftComponent !== undefined || [
                            <Icon
                                size={16}
                                source={leftIconSource}
                                key="icon"
                            />,
                            <Text style={styles.backText} key="label">
                                返回
                            </Text>
                        ]}
                    </Button>
                    <View style={styles.title}>
                        {titleComponent ||
                            renderTitle(styles, title, subTitle, titleStyle)}
                    </View>
                    <View style={[styles.item, styles.rightItem]}>
                        {RightComponent}
                    </View>
                </View>
            </View>
        );
    }
}
