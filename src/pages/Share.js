import React, { PureComponent } from "react";
import { View, Clipboard, Platform, CameraRoll } from "react-native";
import RNFS from "react-native-fs";

import { share as styles } from "./styles";
import { Page, Icon, Text, Button } from "components";
import { iconSource, Tip } from "commons";
import { shareAPP } from "apis";

export default class Share extends PureComponent {
    state = {
        text: ""
    };
    UNSAFE_componentWillMount() {
        shareAPP().then(({ url }) => {
            this.setState({
                text: url
            });
        });
    }
    saveImg = () => {
        this._Download(`http://qr.liantu.com/api.php?text=${this.state.text}`);
    };
    _Download(uri) {
        return new Promise((resolve, reject) => {
            const dirs =
                Platform.OS === "ios"
                    ? RNFS.LibraryDirectoryPath
                    : RNFS.ExternalDirectoryPath; //外部文件，共享目录的绝对路径（仅限android）
            const downloadDest = `${dirs}/${(Math.random() * 10000000) |
                0}.jpg`;
            const options = {
                fromUrl: uri,
                toFile: downloadDest,
                background: true,
                begin: res => {
                    console.log("begin", res);
                    console.log(
                        "contentLength:",
                        res.contentLength / 1024 / 1024,
                        "M"
                    );
                }
            };
            try {
                const ret = RNFS.downloadFile(options);
                ret.promise
                    .then(res => {
                        console.log("success", res);
                        console.log("file://" + downloadDest);
                        const promise = CameraRoll.saveToCameraRoll(
                            downloadDest
                        );
                        promise
                            .then(function(result) {
                                Tip.success("保存成功！地址如下：\n" + result);
                            })
                            .catch(function(error) {
                                Tip.fail("保存失败！\n" + error);
                            });
                        resolve(res);
                    })
                    .catch(err => {
                        reject(new Error(err));
                    });
            } catch (e) {
                console.log(e);
                reject(new Error(e));
            }
        });
    }

    render() {
        const { text } = this.state;
        return (
            <Page title="应用分享">
                <View style={styles.container}>
                    <View style={styles.top}>
                        <View style={styles.codebg}>
                            <Icon source={iconSource.codebg} size={216} />
                        </View>
                        <Icon
                            source={{
                                uri: `http://qr.liantu.com/api.php?text=${text}`
                            }}
                            size={97}
                        />
                    </View>
                    <View style={styles.bottom}>
                        <Icon source={iconSource.dot} style={styles.dotIcon} />
                        <Button
                            onPress={this.saveImg}
                            style={styles.save}
                            textStyle={styles.saveText}
                        >
                            保存图片
                        </Button>
                        <View style={styles.copyBox}>
                            <View style={styles.copyContent}>
                                <Text
                                    style={styles.copyContentText}
                                    numberOfLines={1}
                                >
                                    {`text`}
                                </Text>
                            </View>
                            <Button
                                onPress={() => {
                                    Clipboard.setString(
                                        `http://qr.liantu.com/api.php?text=${text}`
                                    );
                                    Tip.success("复制成功");
                                    // .then(res => {
                                    //     Tip.success('复制成功');
                                    // })
                                    // .catch(e => {
                                    //     Tip.success('复制失败');
                                    // })
                                }}
                                style={styles.copy}
                                textStyle={styles.copyText}
                            >
                                复制
                            </Button>
                        </View>
                    </View>
                </View>
            </Page>
        );
    }
}
