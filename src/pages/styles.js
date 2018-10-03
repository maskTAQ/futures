import { scale } from "commons";
const home = {
    container: {
        flex: 1,
        flexDirection: "column",
        position: "relative"
    },
    bgContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#f7f7f7"
    },
    bg: {
        width: "100%",
        height: scale(200)
    },
    radius: {
        width: "100%",
        marginTop: scale(-36)
    },
    user: {
        container: {
            padding: scale(20),
            paddingTop: scale(31),
            paddingBottom: 0
        },
        box: {
            height: scale(170),
            backgroundColor: "#fff",
            padding: scale(18),
            paddingBottom: 0,
            borderWidth: scale(1),
            borderColor: "#f7f7f7",
            borderRadius: scale(5)
        },
        header: {
            //flex:1,
            flexDirection: "row",
            height: scale(44)
        },
        headerContent: {
            paddingLeft: scale(18),
            flex: 1
        },
        headerContentItem: {
            flex: 1,
            height: "100%"
        },
        headerContentTop: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start"
        },
        headerContentBottom: {
            flexDirection: "row",
            alignItems: "flex-end"
        },
        username: {
            flexDirection: "row",
            alignItems: "center"
        },
        usernameText: {
            fontSize: scale(16),
            color: "#333",
            fontFamily: "PingFangSC-Regular"
        },
        lv: {
            marginLeft: scale(6),
            marginRight: scale(6),
            height: scale(14),
            paddingLeft: scale(8),
            paddingRight: scale(8),

            justifyContent: "center",
            alignItems: "center",
            borderRadius: scale(6),
            backgroundColor: "#fa4f75"
        },
        lvText: {
            color: "#fff",
            fontSize: scale(12),
            lineHeight: scale(16)
        },
        repositoryNumText: {
            fontSize: scale(13),
            color: "#666"
        },
        detail: {
            flex: 1
        },
        detailGroup: {
            flex: 1,
            flexDirection: "row"
        },
        item: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        itemBorder: {
            width: 0.5,
            height: "80%",
            backgroundColor: "#eee"
        },
        itemBorderBottom: {
            borderBottomWidth: 0.5,
            borderColor: "#eee"
        },
        itemText: {
            fontSize: scale(12),
            color: "#999",
            marginTop: 6
        },
        itemValue: {
            fontSize: scale(14),
            color: "#333"
        },
        itemIcon: {
            width: scale(20),
            height: scale(23)
        }
    },
    modalContainer: {
        flex: 1,
        position: "relative",
        backgroundColor: "rgba(0,0,0,0.3)"
    },
    notif: {
        position: "absolute",
        top: scale(64),
        left: scale(8),
        right: scale(8),
        height: scale(144),
        flexDirection: "row"
    },
    notifBg: {
        width: "100%"
        //height:
    },
    notifBox: {
        position: "absolute",
        top: scale(20),
        left: scale(4),
        right: scale(4),
        bottom: scale(4),
        padding: scale(20),
        paddingTop: scale(10)
    },
    notifTitleText: {
        fontSize: scale(14),
        color: "#333"
    },
    notifContentText: {
        paddingTop: scale(10),
        fontSize: scale(12),
        lineHeight: scale(20),
        color: "#999"
    },

    list: {
        marginTop: scale(6),
        height: scale(102),
        backgroundColor: "#fff"
    },
    item: {
        height: scale(102),
        flexDirection: "row",
        paddingTop: scale(11),
        paddingBottom: scale(11),
        paddingLeft: scale(16),
        paddingRight: scale(16)
    },
    itemContent: {
        flex: 1,
        paddingLeft: scale(11),
        paddingTop: scale(2)
    },
    itemTop: {
        //flex: 1,
        height: scale(24),
        flexDirection: "row",
        justifyContent: "space-between"
    },
    buyButton: {
        width: scale(64),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: scale(32),
        backgroundColor: "#fa4f75"
    },
    buyButtonText: {
        fontSize: scale(12)
    },
    itemCenter: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    itemTitleText: {
        fontSize: scale(16),
        color: "#333"
    },
    statusText: {
        fontSize: scale(14),
        color: "#FD4C73"
    },
    itemPercentageText: {
        fontSize: scale(14),
        color: "#333"
    },
    itemDetail: {
        // alignSelf:'flex-end',
        fontSize: scale(12),
        color: "#999"
    },
    store: {
        flex: 1,
        backgroundColor: "#fff"
    },
    storeHeader: {
        height: scale(40),
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: scale(10),
        paddingRight: scale(10),
        justifyContent: "space-between",
        backgroundColor: "#f7f7f7"
    },
    storeTitle: {
        flexDirection: "row"
    },
    storeTitleText: {
        fontSize: scale(16),
        color: "#333"
    },
    storeTitleIcon: {
        width: scale(2),
        height: scale(19),
        marginRight: scale(6)
    },
    countDownText: {
        fontSize: scale(12),
        color: "#999"
    }
};
const mine = {
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#f2f2f2"
    },
    header: {
        container: {
            padding: scale(20),
            flexDirection: "row",
            height: scale(84),
            backgroundColor: "#fff"
        },
        headerContent: {
            paddingLeft: scale(18),
            flex: 1
        },
        headerContentItem: {
            flex: 1,
            height: "100%"
        },
        headerContentTop: {
            flexDirection: "row",
            alignItems: "flex-start"
        },
        headerContentBottom: {
            flexDirection: "row",
            alignItems: "flex-end"
        },
        username: {
            flexDirection: "row",
            alignItems: "center"
        },
        usernameText: {
            fontSize: scale(16),
            color: "#333",
            fontFamily: "PingFangSC-Regular"
        },
        lv: {
            marginLeft: scale(6),
            marginRight: scale(6),
            height: scale(14),
            paddingLeft: scale(8),
            paddingRight: scale(8),

            justifyContent: "center",
            alignItems: "center",
            borderRadius: scale(6),
            backgroundColor: "#fa4f75"
        },
        lvText: {
            color: "#fff",
            fontSize: scale(12),
            lineHeight: scale(16)
        },
        right: {
            justifyContent: "center"
        },
        closeIcon: {
            width: scale(22),
            height: scale(19)
        }
    },
    list: {
        flex: 1,
        marginTop: scale(13),
        paddingLeft: scale(14),
        paddingRight: scale(14),
        backgroundColor: "#fff"
    },
    group: {
        //flex: 1,
        borderBottomWidth: scale(5),
        borderColor: "#f2f2f2"
    },
    item: {
        height: scale(50),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#f2f2f2"
    },
    itemText: {
        fontSize: scale(16),
        color: "#333"
    }
};
const team = {
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    tree: {
        container: {
            flex: 1
        },
        treeNodeContent: {
            flexDirection: "row",
            height: scale(50),
            alignItems: "center",
            paddingLeft: scale(15),
            paddingRight: scale(15)
        },
        treeNodeLeft: {
            flexDirection: "row",
            alignItems: "center"
        },
        treeChildNumText: {
            marginLeft: scale(15),
            fontSize: scale(16),
            color: "#bfbfbf"
        },
        treeLine: {
            width: scale(18),
            height: scale(15),
            marginTop: scale(-4),
            marginRight: scale(4)
        },
        treeNodeCenter: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center"
        },
        usernameText: {
            fontSize: scale(16),
            color: "#606060",
            fontFamily: "PingFangSC-Regular"
        },
        lv: {
            marginLeft: scale(6),
            marginRight: scale(6),
            height: scale(14),
            paddingLeft: scale(8),
            paddingRight: scale(8),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: scale(6),
            backgroundColor: "#fa4f75"
        },
        lvText: {
            color: "#fff",
            fontSize: scale(12),
            lineHeight: scale(15)
        },
        vipIcon: {
            width: scale(13),
            height: scale(14)
        },
        treeNodeRight: {
            width: scale(34),
            height: scale(15),
            borderRadius: scale(4),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fa4f75"
        },
        freezeText: {
            fontSize: scale(10),
            color: "#fff"
        }
    },
    search: {
        container: {
            height: scale(70),
            backgroundColor: "#fa4f75",
            justifyContent: "flex-end"
        },
        box: {
            height: scale(30),
            flexDirection: "row",
            alignItems: "center",
            borderRadius: scale(12),
            marginLeft: scale(15),
            marginRight: scale(15),
            paddingLeft: scale(15),
            paddingRight: scale(15),
            marginBottom: scale(10),
            backgroundColor: "#fc91a9"
        },
        input: {
            flex: 1,

            color: "#fff",
            justifyContent: "center"
        }
    },
    invite: {
        height: scale(50),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: scale(15),
        marginRight: scale(15),
        paddingLeft: scale(15),
        paddingRight: scale(15),
        borderBottomWidth: 1,
        borderColor: "#E7E7E7"
    },
    inviteLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    inviteIcon: {
        width: scale(14),
        height: scale(17),
        marginRight: scale(10)
    },
    inviteText: {
        fontSize: scale(16),
        color: "#C5C5C5"
    },
    rightIcon: {
        width: scale(8),
        height: scale(14)
    },
    countText: {
        textAlign: "center",
        lineHeight: scale(40),
        fontSize: scale(17),
        color: "#606060"
    },
    numText: {
        fontWeight: "bold",
        fontSize: scale(19),
        color: "#fa4f75"
    }
};
const wallet = {
    container: {
        flex: 1,
        flexDirection: "column",
        position: "relative"
    },
    bgContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#f7f7f7"
    },
    bg: {
        width: "100%",
        height: scale(200)
    },
    radius: {
        width: "100%",
        marginTop: scale(-80)
    },
    card: {
        container: {
            padding: scale(20),
            paddingTop: scale(31),
            paddingBottom: 0
        },
        box: {
            height: scale(125),
            backgroundColor: "#fff",
            padding: scale(18),
            paddingBottom: 0,
            borderWidth: scale(1),
            borderColor: "#f7f7f7",
            borderRadius: scale(5)
        },
        repoText: {
            textAlign: "center",
            fontSize: scale(18),
            color: "#FD4C73"
        },
        list: {
            marginTop: 10,
            flexDirection: "row"
        },
        item: {
            flex: 1,
            height: scale(50),
            alignItems: "center"
        },
        itemBorderRight: {
            borderRightWidth: 0.5,
            borderColor: "#eee"
        },
        itemText: {
            fontSize: scale(12),
            color: "#999",
            marginTop: 6
        },
        itemValue: {
            fontSize: scale(14),
            color: "#333"
        }
    },
    group: {
        backgroundColor: "#fff"
    },
    item: {
        height: scale(50),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: scale(20),
        paddingRight: scale(20),
        borderBottomWidth: 1,
        borderColor: "#f7f7f7"
    },
    itemText: {
        fontSize: scale(16),
        color: "#333333"
    }
};

const inviteList = {
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingLeft: scale(10),
        paddingRight: scale(10)
    },
    item: {
        //flex:1,
        flexDirection: "row",
        alignItems: "center",
        //height: scale(60),
        paddingTop: scale(10),
        paddingBottom: scale(10),
        borderTopWidth: 1,
        borderColor: "#F2F2F2"
    },
    itemContent: {
        paddingLeft: scale(18),
        flex: 1
    },
    itemContentItem: {
        flex: 1,
        height: "100%"
    },
    itemContentTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    itemContentBottom: {
        flexDirection: "row",
        alignItems: "flex-end"
    },
    username: {
        flexDirection: "row",
        alignItems: "center"
    },
    usernameText: {
        width: scale(40),
        fontSize: scale(16),
        color: "#333",
        fontFamily: "PingFangSC-Regular"
    },
    lv: {
        //marginLeft: scale(16),
        height: scale(14),
        paddingLeft: scale(8),
        paddingRight: scale(8),

        justifyContent: "center",
        alignItems: "center",
        borderRadius: scale(6),
        backgroundColor: "#fa4f75"
    },
    lvText: {
        color: "#fff",
        fontSize: scale(12),
        lineHeight: scale(16)
    },
    timeText: {
        fontSize: scale(13),
        color: "#666"
    },
    agree: {
        backgroundColor: "#fa4f75",
        width: scale(41),
        height: scale(23),
        borderRadius: scale(4),
        justifyContent: "center",
        alignItems: "center"
    },
    agreeText: {
        fontSize: scale(11),
        color: "#fff"
    },
    hasArgee: {
        color: "#B1B1B1",
        fontSize: scale(11)
    }
};
const feedback = {
    container: {
        flex: 1,
        paddingLeft: scale(15),
        paddingRight: scale(15),
        backgroundColor: "#ebebeb"
    },
    title: {
        fontSize: scale(16),
        lineHeight: scale(70),
        color: "#FD4C73"
    },
    inputTitleBox: {
        height: scale(40),
        borderRadius: scale(4),
        backgroundColor: "#fff"
    },
    inputTitle: {
        flex: 1,
        fontSize: scale(15),
        color: "#A7A7A7",
        paddingLeft: scale(10)
    },
    inputContentBox: {
        marginTop: scale(20),
        height: scale(165),
        borderRadius: scale(4),
        backgroundColor: "#fff"
    },
    hintText: {
        marginTop: scale(10),
        fontSize: scale(11),
        lineHeight: scale(20),
        color: "#979696"
    },
    importantText: {
        fontSize: scale(11),
        color: "#FD4C73"
    },
    submit: {
        marginTop: scale(40),
        height: scale(40),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: scale(4),
        backgroundColor: "#fa4f75"
    },
    submitText: {
        fontSize: scale(22),
        color: "#fff"
    }
};
export { home, mine, team, wallet, inviteList, feedback };
