import React, { Component } from "react";
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback,
    RefreshControl,
    ActivityIndicator
} from "react-native";
import PropTypes from "prop-types";

import styles from "./style";
const { width } = Dimensions.get("window");
export default class ScrollTable extends Component {
    static defaultProps = {
        getData(i) {
            const nextDataSource = [];
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(nextDataSource);
                }, 500);
            });
        },
        //是否下拉加载更多
        isPulldownLoadMore: true,
        //是否上拉刷新
        isPullupRefresh: true,
        dataSource: [],
        columns: [
            // {
            //     dataIndex: 'key',//字段的key
            //     title: 'label',//字段的label
            //     //自定义渲染单元格的方法 传入行数据 单元格数据 行索引
            //     render(row, value, index){},
            //     //自定义行的样式
            //     style:{},
            //     //自定义表头的样式
            //     thStyle:{},
            //     //自定义单元格的样式
            //     tdStyle:{}
            // }
        ],
        //固定列的dataIndex集合
        fixedColums: [],
        //行点击事件
        onItemPress() {},
        //允许触发下拉加载的时间间隔
        pulldownLoadMoreInterval: 500,
        style: {
            //表头容器样式
            thead: {},
            //表头单元格容器样式
            th: {},
            //表头文本样式
            thText: {},
            //表格行容器样式
            row: {},
            //表格行单元格容器样式
            td: {},
            //表格行单元格文本样式
            tdText: {}
        },
        //是否通过dataSource注入数据
        injectData: false,
        //注入数据的刷新状态
        refreshing: false,
        //注入数据的下拉加载状态
        isLoadingMore: false,
        //loading的颜色
        loadingColor: "#666",
        //key
        keyIndex: ""
    };
    static contextTypes = {
        theme: PropTypes.object
    };
    static propTypes = {
        getData: PropTypes.func,
        dataSource: PropTypes.array,
        isPulldownLoadMore: PropTypes.bool,
        isPullupRefresh: PropTypes.bool,
        columns: PropTypes.array,
        fixedColums: PropTypes.array,
        onItemPress: PropTypes.func,
        pulldownLoadMoreInterval: PropTypes.number,
        injectData: PropTypes.bool,
        refreshing: PropTypes.bool,
        isLoadingMore: PropTypes.bool,
        keyExtractor: PropTypes.func,
        key: PropTypes.string,
        style: PropTypes.object,
        keyIndex: PropTypes.number,
        ListEmptyComponent: PropTypes.any,
        loadingColor: PropTypes.string
    };
    state = {
        fixed: {
            columns: [],
            dataSource: []
        },
        scroll: {
            columns: [],
            dataSource: []
        },
        refreshing: false,
        isLoadingMore: false,
        isXScroll: false,
        //下拉数据是否加载完毕
        loaded: false
    };
    UNSAFE_componentWillMount() {
        const { dataSource, injectData } = this.props;
        this.splitOriginalData(dataSource);

        //不是通过注入数据 则通过刷新获取数据
        if (!injectData) {
            this.onRefresh();
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { dataSource, injectData, refreshing, isLoadingMore } = nextProps;
        if (injectData) {
            this.splitOriginalData(dataSource);
            this.setState({
                refreshing,
                isLoadingMore
            });
        }
    }
    /**
     *根据columns中的dataIndex存储对应列的渲染规则
     **/
    renderRowRule = {};
    //传入getData的数据索引 用作分页
    currentDataIndex = 1;

    //上次触发下拉刷新的时间
    prevCalledPulldownLoadMoreTimes = Date.now();
    //存储dataSource元素数据
    originalDataSource = [];
    /**
    *将数据拆分为固定和可滑动俩部分
    params array:d 原始的数据源 
    **/
    splitOriginalData(d, HowTrigger) {
        const { columns: originalColumns } = this.props;
        const originalDataSource = (this.originalDataSource =
            d || this.props.dataSource);

        let { fixedColums } = this.props;
        //将key转换为字符串 用户传入的dataIndex是number datasource对应行的键为string造成错误
        fixedColums = fixedColums.map(dataIndex => String(dataIndex));

        const fixed = {
                columns: [],
                dataSource: []
            },
            scroll = {
                columns: [],
                dataSource: []
            };

        originalDataSource.forEach((item, i) => {
            for (const dataIndex in item) {
                if (fixedColums.includes(dataIndex)) {
                    fixed.dataSource[i] = fixed.dataSource[i] || {};
                    fixed.dataSource[i][dataIndex] = item[dataIndex];
                } else {
                    scroll.dataSource[i] = scroll.dataSource[i] || {};
                    scroll.dataSource[i][dataIndex] = item[dataIndex];
                }
            }
        });

        originalColumns.forEach(item => {
            const { dataIndex } = item;
            if (fixedColums.includes(String(dataIndex))) {
                fixed.columns.push(item);
            } else {
                scroll.columns.push(item);
            }
        });
        this.setState({
            fixed,
            scroll,
            ...(HowTrigger ? { [HowTrigger]: false } : {})
        });
    }
    getData() {
        const { getData } = this.props;
        const { refreshing, loaded } = this.state;
        const { currentDataIndex } = this;
        return getData(currentDataIndex)
            .then(dataSource => {
                this.currentDataIndex += 1;
                if (dataSource.length === 0 && !loaded) {
                    this.setState({ loaded: true });
                }
                if (dataSource.length) {
                    loaded && this.setState({ loaded: false });
                }
                return dataSource;
            })
            .catch(e => {
                //在刷新失败时返回上一次数据
                if (refreshing) {
                    return this.state.dataSource;
                } else {
                    return [];
                }
            });
    }
    onRefresh = () => {
        const { injectData } = this.props;
        const { isLoadingMore, refreshing } = this.state;

        if (!isLoadingMore && !refreshing) {
            if (injectData) {
                //重置数据索引
                this.currentDataIndex = 1;
                this.props.getData();
            } else {
                this.setState({ refreshing: true }, async () => {
                    //重置数据索引
                    this.currentDataIndex = 1;
                    const dataSource = await this.getData();
                    this.splitOriginalData(dataSource, "refreshing");
                });
            }
        }
    };
    pulldownLoadMore = () => {
        const { isLoadingMore, refreshing, loaded } = this.state;
        const prevDataSource = this.originalDataSource;
        const { isPulldownLoadMore, injectData } = this.props;
        //当 不在刷新 加载更多 允许加载更多 未加载完毕 时
        if (!isLoadingMore && !refreshing && isPulldownLoadMore && !loaded) {
            if (injectData) {
                //重置数据索引
                this.currentDataIndex = 1;
                this.props.getData();
            } else {
                this.setState({ isLoadingMore: true }, async () => {
                    const nextDataSource = await this.getData();
                    this.splitOriginalData(
                        [].concat(prevDataSource, nextDataSource),
                        "isLoadingMore"
                    );
                });
            }
        }
    };
    compatibilityPullDown = event => {
        const { pulldownLoadMoreInterval } = this.props;

        const now = Date.now();
        if (
            now - this.prevCalledPulldownLoadMoreTimes >
            pulldownLoadMoreInterval
        ) {
            const y = event.nativeEvent.contentOffset.y;
            const height = event.nativeEvent.layoutMeasurement.height;
            const contentHeight = event.nativeEvent.contentSize.height;
            //const { refreshing } = this.state;
            //在y轴偏移度加上高度等于内容的高度并且y轴偏移值为正值时
            //？在android下并不会像ios有默认的缓动区域 所以并不能产生 在y轴偏移度加上高度大于内容的高度 的情况
            //>= 大于适用于ios ===适用于android
            if (y + height >= contentHeight - 5 && y >= 1) {
                this.prevCalledPulldownLoadMoreTimes = now;
                this.pulldownLoadMore();
            }
        }
    };

    //placeholder占位符来切换渲染俩组表头 实现同步浮动右侧滚动列并且固定表头
    renderHeader(type, placeholder) {
        const { style: customStyle = {} } = this.props;
        const {
            fixed: { columns: fixedColumns },
            scroll: { columns: scrollColumns }
        } = this.state;
        const columns = type === "fixed" ? fixedColumns : scrollColumns;
        return (
            <View style={[styles.headerContainer, customStyle.thead]}>
                {columns.map((column, i) => {
                    const {
                        title,
                        dataIndex,
                        render,
                        style,
                        tdStyle,
                        thStyle
                    } = column;
                    this.renderRowRule[dataIndex] = {
                        index: i,
                        render,
                        style,
                        tdStyle
                    };
                    return (
                        placeholder && (
                            <View
                                style={[
                                    styles.th,
                                    customStyle.th,
                                    style,
                                    thStyle
                                ]}
                                key={dataIndex}
                            >
                                <Text
                                    style={[styles.thText, customStyle.thText]}
                                >
                                    {title}
                                </Text>
                            </View>
                        )
                    );
                })}
            </View>
        );
    }
    renderRow = (row, i) => {
        const {
            onItemPress = () => {},
            style: customStyle = {},
            keyIndex
        } = this.props;
        const children = [],
            { renderRowRule } = this,
            defaultRenderTd = (row, value, index) => {
                return (
                    <Text style={[styles.tdText, customStyle.tdText]}>
                        {value}
                    </Text>
                );
            };

        for (const item in row) {
            if (!renderRowRule[item]) {
                continue;
            }
            const {
                index,
                render = defaultRenderTd,
                style,
                tdStyle
            } = renderRowRule[item];
            children[index] = (
                <View
                    style={[styles.td, customStyle.td, style, tdStyle]}
                    key={item}
                >
                    {render(
                        this.originalDataSource[i],
                        row[item],
                        index,
                        styles.tdText
                    )}
                </View>
            );
        }
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    onItemPress(this.originalDataSource[i]);
                }}
                key={
                    keyIndex
                        ? this.originalDataSource[i][keyIndex]
                        : JSON.stringify(this.originalDataSource[i])
                }
            >
                <View style={styles.row}>{children}</View>
            </TouchableWithoutFeedback>
        );
    };
    renderBody(type) {
        const { style: customStyle = {} } = this.props;
        const {
            fixed: { dataSource: fixedDataSource },
            scroll: { dataSource: scrollDataSource }
        } = this.state;
        const dataSource =
            type === "fixed" ? fixedDataSource : scrollDataSource;
        return (
            <View style={[styles.tbody, customStyle.tbody]}>
                {dataSource.map(this.renderRow)}
            </View>
        );
    }
    renderFooter = () => {
        const { isLoadingMore, loaded, refreshing } = this.state;
        const { isPulldownLoadMore } = this.props;
        const { originalDataSource } = this;
        let footerContent;
        switch (true) {
            case isLoadingMore:
                footerContent = [
                    <ActivityIndicator
                        color="#333"
                        size="small"
                        key="ActivityIndicator"
                    />,
                    <Text
                        key="label"
                        style={[styles.footerHintText, { marginLeft: 6 }]}
                    >
                        正在加载数据中...
                    </Text>
                ];
                break;
            case !isPulldownLoadMore:
                footerContent = null;
                break;
            //在loaded时 数据不为空时显示footer组件 否则显示FlatList组件中的ListEmptyComponent
            case loaded && originalDataSource.length !== 0:
                footerContent = (
                    <Text style={styles.footerHintText}>没有更多了哦</Text>
                );
                break;
            case loaded && originalDataSource.length === 0:
                footerContent = null;
                break;
            case refreshing && originalDataSource.length === 0:
                footerContent = null;
                break;
            default:
                footerContent = (
                    <Text style={styles.footerHintText}>下拉加载更多</Text>
                );
        }

        return (
            footerContent && (
                <View style={styles.footerWrapper}>{footerContent}</View>
            )
        );
    };
    renderListEmptyComponent() {
        const { refreshing } = this.state;
        const {
            isPulldownLoadMore,
            isPullupRefresh,
            ListEmptyComponent
        } = this.props;
        const hint = [];
        isPulldownLoadMore && hint.push("下拉");
        isPullupRefresh && hint.push("上拉");

        if (this.originalDataSource.length) {
            return null;
        }
        if (ListEmptyComponent) {
            return <ListEmptyComponent />;
        }
        if (refreshing) {
            return (
                <View style={styles.ListEmptyComponent}>
                    <Text style={styles.ListEmptyComponentText}>
                        获取数据中...
                    </Text>
                </View>
            );
        } else {
            return (
                <View style={styles.ListEmptyComponent}>
                    <Text style={styles.ListEmptyComponentText}>
                        没有数据哦
                        {hint.length ? `尝试${hint.join("或者")}试试吧~` : "!"}
                    </Text>
                </View>
            );
        }
    }
    render() {
        const {
            refreshing,
            fixed: { columns },
            isXScroll
        } = this.state;
        const { loadingColor } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    {this.renderHeader("fixed", !isXScroll)}
                    <ScrollView
                        scrollEventThrottle={10}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                            width: width - columns.length * styles.th.width,
                            height: "100%"
                        }}
                        ref={e => (this.headerScrollContainer = e)}
                    >
                        {this.renderHeader("scroll", !isXScroll)}
                    </ScrollView>
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this.onRefresh}
                            tintColor={loadingColor}
                            title="加载中"
                            titleColor={loadingColor}
                            //colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#fff"
                        />
                    }
                    onScrollBeginDrag={(...p) => {
                        this.state.isXScroll &&
                            this.setState({
                                isXScroll: false
                            });
                        this.compatibilityPullDown(...p);
                    }}
                    scrollEventThrottle={100}
                >
                    <View style={styles.content}>
                        <View style={[styles.fixedContainer]}>
                            {this.renderHeader("fixed", isXScroll)}
                            {this.renderBody("fixed")}
                        </View>
                        <ScrollView
                            horizontal={true}
                            onScroll={() => {
                                !this.state.isXScroll &&
                                    this.setState({
                                        isXScroll: true
                                    });
                            }}
                            ref={e => (this.contentScrollContainer = e)}
                            scrollEventThrottle={100}
                        >
                            <View style={styles.scrollContainer}>
                                {this.renderHeader("scroll", isXScroll)}
                                {this.renderBody("scroll")}
                            </View>
                        </ScrollView>
                    </View>
                    {this.renderListEmptyComponent()}
                    {this.renderFooter()}
                </ScrollView>
            </View>
        );
    }
}
