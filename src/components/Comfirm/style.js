import { scale } from "commons";
export default {
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)"
        //padding: scale(10)
    },
    content: {
        flex: 1,
        justifyContent: "flex-end"
    },
    list: {
        marginBottom: scale(15),
        borderRadius: scale(6),
        backgroundColor: "#fff"
    },
    title: {
        height: scale(40),
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: scale(12),
        color: "#8A8A8A"
    },
    ok: {
        height: scale(40),
        justifyContent: "center",
        alignItems: "center"
    },
    okText: {
        fontSize: scale(16),
        color: "#FF0000"
    },
    itemBorder: {
        height: 1,
        backgroundColor: "#ccc"
    },
    cancel: {
        height: scale(40),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    cancelText: {
        fontSize: scale(16),
        color: "#BDBDBD"
    }
};
