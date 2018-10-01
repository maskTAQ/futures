import { PixelRatio } from "react-native";
import defaultTheme from "../../theme";
export default (theme = {}) => {
    theme = Object.assign({}, defaultTheme, theme);
    const {
        wrapBG,
        containerBG,
        titleColor,
        footerTopBorderColor,
        messageColor,
        buttonTextColor,
        cancelColor,
        buttonBorderColor
    } = theme.alert;
    return {
        wrap: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: wrapBG
        },
        feedBack: {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: null
        },
        container: {
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: -26,
            marginLeft: 32,
            marginRight: 32,
            borderRadius: 10,
            overflow: "hidden",
            backgroundColor: containerBG,
            paddingTop: 10,
            paddingBottom: 10
        },
        title: {
            marginTop: 14,
            fontSize: 18,
            fontWeight: "bold",
            color: titleColor
        },
        content: {
            width: "100%",
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 20,
            paddingBottom: 28
        },
        message: {
            paddingTop: 6,
            lineHeight: 36,
            fontSize: 16,
            color: messageColor
        },
        footer: {
            flexDirection: "row",
            height: 45,
            borderTopWidth: 1 / PixelRatio.get(),
            borderTopColor: footerTopBorderColor,
            marginBottom: -10
        },
        buttonItem: {
            flex: 1,
            flexDirection: "row"
        },
        button: {
            flex: 1
        },
        buttonInner: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 2
        },
        buttonText: {
            fontSize: 17,
            color: buttonTextColor
        },
        cancel: {
            color: cancelColor
        },
        buttonBorder: {
            width: 1 / PixelRatio.get(),
            marginTop: 0,
            marginBottom: 0,
            backgroundColor: buttonBorderColor
        }
    };
};
