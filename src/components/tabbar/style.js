export default {
    container: {
        height: 50,
        flexDirection: "row",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#ccc"
    },
    tabItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalContainer: {
        flex: 1,
        position: "relative",
        backgroundColor: "rgba(0,0,0,0.3)"
    },
    list: {
        position: "absolute",
        bottom: 50,
        left: 16,
        right: 16,
        height: 114,
        flexDirection: "row"
    },
    listBg: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
    },
    item: {
        flex: 1,
        paddingBottom: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    itemText: {
        marginTop: 10,
        fontSize: 12,
        color: "#333"
    },
    tabItemText: {
        marginTop: 6,
        fontSize: 12,
        color: "#999"
    }
};
