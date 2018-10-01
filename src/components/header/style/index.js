import defaultTheme from '../../theme';
import isIphoneX from '../isIphoneX';

const isX = isIphoneX();
export default (theme = {}) => {
  theme = Object.assign({}, defaultTheme, theme);
  return {
    container: {
      backgroundColor: theme.header.containerBG
    },
    navigationContainer: {
      marginTop: isX ? 20 + 20 : 20,
      height:  44,
      flexDirection: "row"
    },
    item: {
      width: 80,
      justifyContent: "center",
    },
    leftItem: {
      alignItems: 'flex-start',
      paddingLeft: 10,
    },
    rightItem: {
      alignItems: 'flex-end',
      paddingRight: 10,
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
  }
};
