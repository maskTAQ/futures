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
            padding: 20,
            paddingTop: 31,
            paddingBottom: 0
        },
        box: {
            height: 170,
            backgroundColor: "#fff",
            padding: 18,
            paddingBottom: 0,
            borderWidth: 1,
            borderColor: "#f7f7f7",
            borderRadius: 5
        },
        header: {
            //flex:1,
            flexDirection: "row",
            height: 44
        },
        headerContent: {
            paddingLeft: 18,
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
            fontSize: 16,
            color: "#333",
            fontFamily: "PingFangSC-Regular"
        },
        lv: {
            marginLeft: 6,
            marginRight: 6,
            height: 14,
            paddingLeft: 8,
            paddingRight: 8,
            borderRadius: 6,
            backgroundColor: "#fa4f75"
        },
        lvText: {
            color: "#fff",
            fontSize: 12
        },
        repositoryNumText: {
            fontSize: 13,
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
            borderBottomWidth: 0.3,
            borderColor: "#eee"
        },
        itemText: {
            fontSize: 12,
            color: "#999",
            marginTop: 6
        },
        itemValue: {
            fontSize: 14,
            color: "#333"
        },
        itemIcon: {
            width: 20,
            height: 23
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
        position: "relative"
    }
};
export { home, mine };
