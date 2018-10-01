import defaultTheme from "../../theme";
export default (theme = {}) => {
    theme = Object.assign({}, defaultTheme, theme);
    const { disabledBG, color, disabledColor } = theme.button;
    return {
        disabledButton: {
            backgroundColor: disabledBG
        },
        text: {
            color: color,
            fontSize: 14
        },
        disabledText: {
            color: disabledColor
        }
    };
};
