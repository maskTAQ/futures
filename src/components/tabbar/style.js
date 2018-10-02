import { Dimensions } from "react-native";

//import { computeSize } from "src/common";
const { width } = Dimensions.get("window");
const computeSize = s => s;
export default {
    container: {
        height: 50,
        flexDirection: "row",
        backgroundColor: "#fff"
    },
    tabItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    tabBarWrapper: {
        position: "relative"
    },
    tabBar: {
        flexDirection: "row",
        height: computeSize(50),
        backgroundColor: "#1b9be4"
    },
    tabBarItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    tabBarItemLabel: {
        fontSize: computeSize(12),
        color: "#fff"
    },
    tabBarScanQRWrapper: {
        position: "relative",
        zIndex: computeSize(9),
        width: computeSize(70),
        height: computeSize(50)
    },
    tabBarScanQR: {
        position: "absolute",
        zIndex: computeSize(9),
        bottom: 0,
        left: (width - computeSize(70)) / 2,
        borderRadius: computeSize(70),
        width: computeSize(70),
        height: computeSize(70),
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        borderWidth: 1.5,
        borderColor: "#1b9be4",
        backgroundColor: "#fff"
    }
};
