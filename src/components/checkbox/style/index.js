import defaultTheme from '../../theme';
export default (theme = {}) => {
  theme = Object.assign({},defaultTheme,theme);
  return {
    checkboxGroup: {
      flexDirection: "row",
      flex: 1,
    },
    checkboxWrapper: {
      flexDirection: "row",
      height: 22,
      flex: 1,
    },
    checkboxImgWrapper: {

      justifyContent: "center",
      alignItems: "center"
    },
    label: {
      marginLeft: 4,
      lineHeight: 22,
      fontSize: 14,
      color: theme.checkbox.labelColor
    }
  };
}