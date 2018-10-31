import defaultTheme from "../../theme";
export default (theme = {}) => {
    theme = Object.assign({}, defaultTheme, theme);
    const { color, pendingColor } = theme.codeButton;
    return {
        codeButton: {
            width: 100,
            //height: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent"
        },
        codeButtonText: {
            fontSize: 14,
            fontWeight: "bold",
            color
        },
        pending: {
            width: 90,
            alignItems: "center",
            justifyContent: "center"
        },
        pendingColor
    };
};
