import defaultTheme from "../../theme";
export default (theme = {}) => {
    theme = Object.assign({}, defaultTheme, theme);
    const { footerTextColor, emptyTextColor } = theme.dataView;
    return {
        container: {
            flex: 1
        },
        footerWrapper: {
            height: 40,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        },
        footerText: {
            fontSize: 14,
            color: footerTextColor
        },
        ListEmptyComponent: {
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 20
        },
        ListEmptyComponentText: {
            fontSize: 14,
            color: emptyTextColor
        }
    };
};
