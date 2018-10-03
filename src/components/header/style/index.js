import defaultTheme from "../../theme";
import isIphoneX from "../isIphoneX";

const isX = isIphoneX();
export default (theme = {}) => {
    theme = Object.assign({}, defaultTheme, theme);
    return {
        container: {
            backgroundColor: theme.header.containerBG
        },
        navigationContainer: {
            marginTop: isX ? 20 + 20 : 20,
            height: 44,
            flexDirection: "row"
        },

        item: {
            width: 80,
            justifyContent: "center"
        },
        leftItem: {
            flexDirection: "row",
            alignItems: "center",
            //alignItems: "flex-end",
            paddingLeft: 6
        },
        backText: {
            marginLeft: 4,
            fontSize: 15,
            color: "#fff"
        },
        rightItem: {
            alignItems: "flex-end",
            paddingRight: 6
        },
        titleWrapper: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        title: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        titleText: {
            fontSize: 16,
            color: theme.header.titleColor
        }
    };
};
