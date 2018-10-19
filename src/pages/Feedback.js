import React, { PureComponent } from "react";
import { View } from "react-native";

import { feedback as styles } from "./styles";
import { Page, Text, Input, Button } from "components";
import { myInfo } from "apis";
import { Tip } from "commons";

export default class Feedback extends PureComponent {
    state = {
        title: "",
        content: ""
    };
    render() {
        const { title, content } = this.state;
        return (
            <Page title="求助反馈">
                <View style={styles.container}>
                    <Text style={styles.title}>
                        您有什么问题或者建议想对我们说？
                    </Text>
                    <View style={styles.inputTitleBox}>
                        <Input
                            value={title}
                            onChangeText={title => {
                                this.setState({ title });
                            }}
                            placeholder="您的标题:"
                            style={styles.inputTitle}
                            placeholderTextColor="#A7A7A7"
                        />
                    </View>
                    <View style={styles.inputContentBox}>
                        <Input
                            value={content}
                            onChangeText={content => {
                                this.setState({ content });
                            }}
                            multiline={true}
                            placeholder="反馈内容:"
                            style={styles.inputTitle}
                            placeholderTextColor="#A7A7A7"
                        />
                    </View>
                    <Text style={styles.hintText}>
                        <Text style={styles.importantText}>温馨提示：</Text>
                        请详细描述您遇到的问题，有助于我们快速定位并解决问题，或者留下您宝贵的建议，我们会认真进行评估！
                    </Text>
                    <Button
                        style={styles.submit}
                        textStyle={styles.submitStyle}
                        onPress={() => {
                            const { title, content } = this.state;
                            myInfo({ title, content }).then(res => {
                                Tip.success("提交成功!");
                            });
                        }}
                    >
                        完成
                    </Button>
                </View>
            </Page>
        );
    }
}
