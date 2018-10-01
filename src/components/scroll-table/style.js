import theme from "../theme";

const {
    thBG,
    thBorderColor,
    thTextColor,
    tdBG,
    tdTextColor,
    footerWrapperBG,
    footerHintTextColor,
    emptyTextColor
} = theme.scrollTable;

export default {
    container: {
        flex: 1
    },
    header: {
        flexDirection: "row"
    },
    content: {
        flex: 1,
        flexDirection: "row",
        overflow: "hidden"
    },
    fixedContainer: {},
    scrollContainer: {
        flex: 1,
        overflow: "hidden"
    },
    headerContainer: {
        flexDirection: "row"
    },
    row: {
        flexDirection: "row"
    },
    th: {
        height: 50,
        width: 120,
        backgroundColor: thBG,
        alignItems: "flex-start",
        justifyContent: "center",
        borderBottomWidth: 0.6,
        borderColor: thBorderColor,
        paddingLeft: 10
    },
    thText: {
        fontSize: 16,
        color: thTextColor
    },
    td: {
        height: 50,
        width: 120,
        backgroundColor: tdBG,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: 10
    },
    tdText: {
        fontSize: 14,
        color: tdTextColor
    },
    ListEmptyComponent: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20
    },
    ListEmptyComponentText: {
        fontSize: 14,
        color: emptyTextColor
    },
    footerWrapper: {
        height: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: footerWrapperBG
    },
    footerHintText: {
        fontSize: 12,
        color: footerHintTextColor
    }
};
