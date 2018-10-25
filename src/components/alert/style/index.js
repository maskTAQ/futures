// import { PixelRatio } from "react-native";
// import defaultTheme from "../../theme";
export default (theme = {}) => {
    // theme = Object.assign({}, defaultTheme, theme);
    // const {
    //     wrapBG,
    //     containerBG,
    //     titleColor,
    //     footerTopBorderColor,
    //     messageColor,
    //     buttonTextColor,
    //     cancelColor,
    //     buttonBorderColor
    // } = theme.alert;
    return {
        container: {
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.3)"
        },
        box: {
            position: "relative",
            marginLeft: 20,
            marginRight: 20,
            height: 218,
            borderRadius: 6,
            backgroundColor: "#fff"
        },
        close: {
            position: "absolute",
            top: -15,
            right: -15,
            width: 40,
            height: 40,
            zIndex: 1
        }
    };
};
