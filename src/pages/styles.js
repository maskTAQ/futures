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
        height: scale(76),
        backgroundColor: "#fff"
    },
    item: {
        height: scale(76),
        flexDirection: "row",
        paddingTop: scale(4),
        paddingBottom: scale(4),
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
        height: scale(30),
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: scale(10),
        paddingRight: scale(10),
        marginBottom: scale(4),
        justifyContent: "space-between",
        backgroundColor: "#f7f7f7"
    },
    storeTitle: {
        flexDirection: "row"
    },
    storeTitleText: {
        fontSize: scale(14),
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
    },
    submit: {
        marginTop: scale(20),
        marginBottom: scale(20),
        height: scale(40),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: scale(4),
        backgroundColor: "#fa4f75"
    },
    submitText: {
        fontSize: scale(16),
        color: "#fff"
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
        backgroundColor: "#f2f2f2"
    },
    header: {
        height: scale(60),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: scale(15),
        paddingRight: scale(15),
        backgroundColor: "#fff"
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    headerLabelText: {
        marginLeft: scale(10),
        fontSize: scale(15),
        color: "#FD4C73"
    },
    residueText: {
        fontSize: scale(13),
        color: "#8E8E8E"
    },
    list: {
        marginTop: scale(15),
        flex: 1,
        paddingLeft: scale(10),
        paddingRight: scale(10),
        backgroundColor: "#fff"
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
        //width: scale(40),
        marginRight: scale(10),
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
        color: "#000",
        paddingLeft: scale(10)
    },
    inputContentBox: {
        marginTop: scale(20),
        height: scale(165),
        borderRadius: scale(4),
        backgroundColor: "#fff"
    },
    hintText: {
        //marginTop: scale(10),
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

const changeDealPassword = {
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingLeft: scale(15),
        paddingRight: scale(15)
    },
    group: {
        borderBottomWidth: scale(4),
        borderColor: "#F2F2F2"
    },
    item: {
        height: scale(50),
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#F2F2F2"
    },
    itemLabelText: {
        //width: scale(86),
        marginRight: scale(6),
        fontSize: scale(16),
        color: "#333"
    },
    itemInput: {
        flex: 1,
        height: "100%",
        fontSize: scale(16),
        color: "#000"
    },
    codeIcon: {
        width: scale(54),
        height: scale(19)
    },
    verifyBox: {
        height: scale(70),
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: scale(5),
        borderColor: "#F2F2F2"
    },
    verifyIcon: {
        width: scale(54),
        height: scale(19)
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

const about = {
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        paddingTop: scale(10),
        paddingLeft: scale(15),
        paddingRight: scale(15)
    },
    content: {
        flex: 1,
        paddingLeft: scale(10),
        paddingRight: scale(10),
        backgroundColor: "#fff"
    },
    titleText: {
        fontSize: scale(18),
        lineHeight: scale(60),
        color: "#363636",
        textAlign: "center"
    },
    subTitleText: {
        fontSize: scale(13),
        lineHeight: scale(20),
        color: "#363636",
        textAlign: "center"
    },
    contentText: {
        fontSize: scale(13),
        lineHeight: scale(30),
        color: "#363636"
    },
    submit: {
        marginTop: scale(20),
        marginBottom: scale(20),
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

const transferInvitationCode = {
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2"
    },
    header: {
        height: scale(60),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: scale(15),
        paddingRight: scale(15),
        backgroundColor: "#fff"
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    headerLabelText: {
        marginLeft: scale(10),
        fontSize: scale(15),
        color: "#FD4C73"
    },
    residueText: {
        fontSize: scale(13),
        color: "#8E8E8E"
    },
    content: {
        flex: 1,
        paddingLeft: scale(15),
        paddingRight: scale(15),
        backgroundColor: "#fff"
    },
    item: {
        height: scale(80),
        borderBottomWidth: 1,
        borderColor: "#DAD9D9"
    },
    itemLabel: {
        flex: 1,
        justifyContent: "center"
    },
    itemLabelText: {
        fontSize: scale(16),
        color: "#333333"
    },
    itemInput: {
        flex: 1,
        fontSize: scale(16)
    },
    submit: {
        marginTop: scale(60),
        marginBottom: scale(20),
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
const gardenWarehouse = {
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2"
    },
    header: {
        height: scale(60),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: scale(15),
        paddingRight: scale(15),
        backgroundColor: "#fff"
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    headerLabelText: {
        marginLeft: scale(10),
        fontSize: scale(15),
        color: "#FD4C73"
    },
    residueText: {
        fontSize: scale(13),
        color: "#8E8E8E"
    },
    list: {
        marginTop: scale(10),
        flex: 1,
        backgroundColor: "#fff"
    },
    item: {
        //height: scale(80),
        paddingLeft: scale(15),
        paddingRight: scale(15),
        borderBottomWidth: 1,
        borderColor: "#F2F2F2"
    },
    itemTop: {
        height: scale(20),
        justifyContent: "flex-end"
    },
    itemTimeText: {
        fontSize: scale(11),
        color: "#AFAFAF"
    },
    itemCenter: {
        height: scale(40),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    itemTypeText: {
        fontSize: scale(17),
        color: "#606060"
    },
    itemValueText: {
        fontSize: scale(11),
        color: "#FD4C73"
    },
    userIdText: {
        lineHeight: scale(20),
        fontSize: scale(11),
        color: "#AFAFAF"
    },
    itemBottom: {
        height: scale(20),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    balanceText: {
        fontSize: scale(11),
        color: "#AFAFAF"
    },
    submit: {
        marginTop: scale(20),
        marginBottom: scale(20),
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

const alert = {
    container: {
        flex: 1,
        borderRadius: 6,
        //justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden"
    },
    top: {
        width: "100%",
        marginBottom: scale(20),
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center"
    },
    titleText: {
        fontSize: scale(20),
        lineHeight: scale(40),
        color: "#606060",
        textAlign: "center"
    },
    input: {
        width: "90%",
        height: scale(40),
        borderBottomWidth: 1,
        borderColor: "#DEDCDC"
    },
    btnGroup: {
        width: "100%",
        flexDirection: "row"
    },
    submit: {
        width: "100%",
        height: scale(40),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fa4f75"
    },
    submitText: {
        fontSize: scale(16),
        color: "#fff"
    },
    cancel: {
        flex: 1,
        height: scale(40),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ededed"
    },
    cancelText: {
        fontSize: scale(16),
        color: "#333"
    }
};
const buy = {
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2"
    },
    header: {
        paddingLeft: scale(15),
        paddingRight: scale(15),
        paddingBottom: scale(30),
        backgroundColor: "#fff"
    },
    title: {
        height: scale(70),
        justifyContent: "center"
    },
    titleText: {
        fontSize: scale(16),
        color: "#333"
    },
    intro: {
        //flex:1,
        flexDirection: "row"
    },
    introDetail: {
        flex: 1,
        paddingLeft: scale(10)
    },
    productName: {
        flex: 1,
        justifyContent: "center"
    },
    productNameText: {
        fontSize: scale(31),
        color: "#333"
    },
    productDesc: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    productDescText: {
        fontSize: scale(12),
        color: "#999"
    },
    bottom: {
        marginTop: scale(10),
        flex: 1,
        paddingLeft: scale(15),
        paddingRight: scale(15),
        backgroundColor: "#fff"
    },
    consume: {
        flexDirection: "row",
        height: scale(40),
        justifyContent: "space-between",
        alignItems: "center"
    },
    consumeText: {
        fontSize: scale(14),
        color: "#999"
    },
    residueText: {
        fontSize: scale(12),
        color: "#999"
    },
    submit: {
        marginTop: scale(40),
        marginBottom: scale(20),
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
const orderDetail = {
    container: {
        flex: 1,
        paddingLeft: scale(15),
        paddingRight: scale(15),
        backgroundColor: "#fff"
    },
    header: {
        flexDirection: "row",
        paddingTop: scale(20),
        paddingBottom: scale(20),
        borderBottomWidth: 1,
        borderColor: "#F2F2F2"
    },
    headerContent: {
        flex: 1,
        paddingLeft: scale(15)
    },
    headerTop: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    productNameText: {
        fontSize: scale(17),
        color: "#333"
    },
    productStatusText: {
        fontSize: scale(14),
        color: "#FD4C73"
    },
    headerBottom: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    productTimeText: {
        fontSize: scale(10),
        color: "#AFAFAF"
    },
    productScheduleText: {
        fontSize: scale(10),
        color: "#AFAFAF"
    },
    bottom: {
        paddingTop: scale(20)
    },
    item: {
        flexDirection: "row",
        ///alignItems:'center',
        //justifyContent:'space-between',
        height: scale(40)
    },
    itemLabelText: {
        fontSize: scale(12),
        color: "#797979"
    },
    itemValueText: {
        fontSize: scale(12),
        color: "#797979"
    },
    voucher: {
        position: "relative",
        borderTopWidth: 1,
        borderColor: "#F2F2F2",
        marginBottom: scale(30)
    },
    complaint: {
        position: "absolute",
        width: scale(25),
        height: scale(40),
        top: scale(-15),
        right: 20,
        zIndex: 1
    },
    complaintIcon: {
        width: scale(25),
        height: scale(25),
        backgroundColor: "#fff"
    },
    complaintText: {
        fontSize: scale(11),
        color: "#FD4C73"
    },
    voucherTitleText: {
        lineHeight: scale(60),
        fontSize: scale(14),
        color: "#797979"
    },
    voucherContent: {
        flexDirection: "row",
        paddingLeft: scale(10),
        paddingRight: scale(10)
    },
    voucherItem: {
        marginLeft: scale(10),
        width: scale(65),
        height: scale(65)
    },
    voucherItemImg: {
        width: "100%",
        height: "100%"
    },
    voucherItemBorder: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.3,
        borderColor: "#D6D6D6"
    },
    alertContainer: {
        flex: 1,
        alignItems: "center"
    },
    successIcon: {
        width: scale(43),
        height: scale(43),
        marginTop: scale(15)
        //marginBottom:scale(20),
    },
    successText: {
        marginTop: scale(35),
        fontSize: scale(25),
        color: "#FD4C73"
    },
    submit: {
        marginTop: scale(40),
        marginBottom: scale(20),
        height: scale(40),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: scale(4),
        backgroundColor: "#fa4f75"
    },
    submitText: {
        fontSize: scale(16),
        color: "#fff"
    }
};

const login = {
    container: {
        // position: "absolute",
        // top: 0,
        // left: 0,
        // width: "100%",
        // height: "100%",
        flex: 1,
        paddingLeft: scale(15),
        paddingRight: scale(15),
        backgroundColor: "#fa4f75"
    },
    logoBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    logoIcon: {
        width: scale(86),
        height: scale(195)
    },
    content: {
        flex: 1
    },
    inputItem: {
        height: scale(60),
        paddingLeft: scale(10),
        paddingRight: scale(10),
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#fff"
    },
    usernameIcon: {
        width: scale(22),
        height: scale(24)
    },
    passwordIcon: {
        width: scale(19),
        height: scale(26)
    },
    bottomIcon: {
        width: scale(14),
        height: scale(8)
    },
    input: {
        flex: 1,
        height: "100%",
        fontSize: scale(16),
        paddingLeft: scale(10),
        color: "#fff"
    },
    submit: {
        marginTop: scale(30),
        height: scale(41),
        borderRadius: scale(4),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    submitText: {
        fontSize: scale(18),
        color: "#fa4f75"
    },
    nav: {
        marginTop: scale(10),
        flexDirection: "row",
        justifyContent: "space-between"
    },
    navText: {
        fontSize: scale(12),
        color: "#fff"
    }
};

const forgetPassword = {
    container: {
        flex: 1,
        // position: "absolute",
        // top: 0,
        // right: 0,
        // left: 0,
        // bottom: 0,
        paddingTop: scale(15),
        paddingLeft: scale(15),
        paddingRight: scale(15),
        backgroundColor: "#fff"
    },
    item: {
        height: scale(50),
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#F2F2F2"
    },
    input: {
        flex: 1,
        fontSize: scale(16),
        color: "#8F8F8F"
    },
    code: {
        width: scale(106),
        height: scale(31),
        borderRadius: scale(4),
        backgroundColor: "#fa4f75"
    },
    codeText: {
        fontSize: scale(14),
        color: "#fff"
    },
    buttonBox: {
        // flex: 1,
        // justifyContent: "flex-end"
    },
    submit: {
        marginTop: scale(50),
        height: scale(40),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: scale(4),
        backgroundColor: "#fa4f75"
    },
    submitText: {
        fontSize: scale(16),
        color: "#fff"
    }
};

const orderSellFlowerList = {
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: scale(15),
        marginRight: scale(15),
        height: scale(82),
        borderBottomWidth: 1,
        borderColor: "#F2F2F2"
    },
    icon: {
        width: scale(60),
        height: scale(60),
        borderRadius: scale(5),
        overflow: "hidden"
    },
    itemContent: {
        flex: 1,
        height: scale(60),
        paddingLeft: scale(15)
    },
    itemTop: {
        flexDirection: "row",
        height: scale(30),
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    textBox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    text: {
        fontSize: scale(10),
        color: "#999999"
    },
    itemTitleText: {
        fontSize: scale(17),
        color: "#333"
    },
    stateText: {
        fontSize: scale(14),
        color: "#FD4C73",
        alignSelf: "flex-end"
    }
};

const sellRedPacket = {
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingLeft: scale(15),
        paddingRight: scale(15)
    },
    labelText: {
        fontSize: scale(16),
        lineHeight: scale(40),
        color: "#333333"
    },
    input: {
        height: scale(40),
        borderBottomWidth: 1,
        borderColor: "#DAD9D9"
    },
    balanceText: {
        marginBottom: scale(10),
        fontSize: scale(15),
        lineHeight: scale(40),
        color: "#858585"
    },
    hintText: {
        fontSize: scale(11),
        lineHeight: scale(20),
        color: "#9D9D9D"
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
const share = {
    container: {
        flex: 1,
        paddingLeft: scale(10),
        paddingRight: scale(10),
        backgroundColor: "#fff"
    },
    top: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    codebg: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    bottom: {
        flex: 3,
        alignItems: "center",
        justifyContent: "space-around"
    },
    dotIcon: {
        width: scale(11),
        height: scale(38)
    },
    save: {
        width: scale(140),
        height: scale(35),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: scale(4),
        borderColor: "#fa4f75",
        borderStyle: "dashed"
    },
    saveText: {
        fontSize: scale(18),
        color: "#fa4f75"
    },
    copyBox: {
        flexDirection: "row",
        height: scale(),
        borderRadius: scale(4),
        overflow: "hidden"
    },
    copyContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#C8C8C8"
    },
    copyContentText: {
        fontSize: scale(15),
        color: "#C8C8C8"
    },
    copy: {
        width: scale(84),
        height: scale(30),
        backgroundColor: "#fa4f75",
        justifyContent: "center",
        alignItems: "center"
    },
    copyText: {
        fontSize: scale(14),
        color: "#fff"
    }
};

const welcome = {
    container: {
        position: "relative",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    slogan: {
        position: "absolute",
        bottom: scale(19)
    }
};
export {
    home,
    mine,
    team,
    wallet,
    inviteList,
    feedback,
    changeDealPassword,
    about,
    transferInvitationCode,
    gardenWarehouse,
    alert,
    buy,
    orderDetail,
    login,
    forgetPassword,
    orderSellFlowerList,
    sellRedPacket,
    share,
    welcome
};
