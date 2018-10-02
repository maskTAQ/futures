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
        marginTop: -30
    },
    user: {
        container: {
            padding: 28,
            paddingTop: 31
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
            width: 1,
            height: "80%",
            backgroundColor: "#eee"
        },
        itemBorderBottom: {
            borderBottomWidth: 1,
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
    }
};
export { login };
