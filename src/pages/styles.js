const login = {
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
        height: 200
    },
    radius: {
        width: "100%",
        marginTop: -36
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
            color: "#333"
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
        top: 64,
        left: 8,
        right: 8,
        height: 144,
        flexDirection: "row"
    },
    notifBg: {
        width: "100%"
        //height:
    },
    notifBox: {
        position: "absolute",
        top: 20,
        left: 4,
        right: 4,
        bottom: 4,
        padding: 20,
        paddingTop: 10
    },
    notifTitleText: {
        fontSize: 14,
        color: "#333"
    },
    notifContentText: {
        paddingTop: 10,
        fontSize: 12,
        lineHeight: 20,
        color: "#999"
    },

    list: {
        marginTop: 6,
        height: 102,
        backgroundColor: "#fff"
    },
    item: {
        height: 102,
        flexDirection: "row",
        paddingTop: 11,
        paddingBottom: 11,
        paddingLeft: 16,
        paddingRight: 16
    },
    itemContent: {
        flex: 1,
        paddingLeft: 11,
        paddingTop: 2
    },
    itemTop: {
        //flex: 1,
        height: 24,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    buyButton: {
        width: 64,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 32,
        backgroundColor: "#fa4f75"
    },
    buyButtonText: {
        fontSize: 12
    },
    itemCenter: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    itemTitleText: {
        fontSize: 16,
        color: "#333"
    },
    statusText: {
        fontSize: 14,
        color: "#FD4C73"
    },
    itemPercentageText: {
        fontSize: 14,
        color: "#333"
    },
    itemDetail: {
        // alignSelf:'flex-end',
        fontSize: 12,
        color: "#999"
    },
    store: {
        flex: 1,
        backgroundColor: "#fff"
    },
    storeHeader: {
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "space-between",
        backgroundColor: "#f7f7f7"
    },
    storeTitle: {
        flexDirection: "row"
    },
    storeTitleText: {
        fontSize: 16,
        color: "#333"
    },
    storeTitleIcon: {
        width: 2,
        height: 19,
        marginRight: 6
    },
    countDownText: {
        fontSize: 12,
        color: "#999"
    }
};
export { login };
