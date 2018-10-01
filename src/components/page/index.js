import React from "react";
import { View } from "react-native";
import styles from "./style";
import PropTypes from "prop-types";

import { Header } from "../";

let fn = () => {
    console.log("page未注册默认的返回句柄");
};
let leftIconSource;
const Page = ({ children, ...otherProps }) => {
    return (
        <View style={styles.container}>
            <Header
                onLeftPress={fn}
                leftIconSource={leftIconSource}
                {...otherProps}
            />
            <View style={styles.content}>{children}</View>
        </View>
    );
};
Page.propTypes = {
    children: PropTypes.any
};
//暴露定义默认的返回函数的句柄
Page.registerReturnEventlistener = f => {
    if ({}.toString.call(f) === "[object Function]") {
        fn = f;
    } else {
        console.error("registerReturnEventlistenrt params is not func");
    }
};
Page.setLeftIconSource = s => (leftIconSource = s);
export default Page;
