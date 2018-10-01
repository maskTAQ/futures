# 使用说明

## 项目结构
```
.
├── examples                                 	// 项目示例目录
│   ├── src                                  // 示例源码
├── src                               		// 组件库
.
```

## 主题
    现有主题：defaultTheme;
    组件样式的优先级 theme < props中传入的样式
    可以通过注入主题来使用自定义的主题
    
  ```javascript
import { ThemeProvider } from "@hx/noxus";
//传入的主题会与默认主题合并补全未提供的样式来供组件使用
<ThemeProvider
          theme={{
            header: {
              containerBG: "#D00004",
              titleColor: "#fff"
            }
          }}
        >
  <YourAppRoot />
</ThemeProvider>
```


## 已有组件
- [Butotn](#button)
- [Icon](#icon)
- [Input](#input)
- [Loading](#loading)
- [HXAlert](#hxalert)
- [CodeButton](#codebutton)
- [Checkbox](#checkbox)
- [Header](#header)
- [Page](#page)
- [DataView](#dataview)
- [ScrollTable](#scrolltable)
- [FormCreators表单生成器](#formcreators表单生成器)


## 计划组件

## 组件库

### Button

| 属性 | 说明 | 类型 | 默认值
| :- | :- | :- |  :- | 
| onPress | 触发事件 | function | 
| disabled | 是否禁用 | bool | false
| style | 样式 | string | object/number | 
| textStyle |  文字样式 | object/number | 
| disabledButtonStyle | 禁用时样式 | object/number | 
| disabledTextStyle | 禁用时文本样式 | object/number | 
| feedback | 是否有反馈 | bool | true

### Icon

| 属性 | 说明 | 类型 | 默认值
| :- | :- | :- |  :- | 
| size | 图片的宽和高 | number | 48
| style | 图片的样式,在type为空并且style存在时将不采用size | object | 
| color | 图片的颜色 | string | #fff
| type |  unicode字符编码 | string |
| source | icon的图片资源[同时传入type和source采纳type] | object/number | 
| feedback | 是否显示loading动效 | bool | false

### Input

同TextInpuut

### Loading

| 属性 | 说明 | 类型 | 默认值
| :- | :- | :- |  :- | 
| size | loading大小 | number | 
| color | 颜色 | string | 
| visible |  是否显示 | bool |

### HXAlert

| 属性 | 说明 | 类型 | 默认值
| :- | :- | :- |  :- | 
| title | title | string | 
| titleComponent | 对于title优先采用 | ReactDom | 
| message |  message | string |
| messageComponent | 对于message优先采用 | ReactDom | 
| buttons | onPress返回一个Promise成功会调用onFeedback | {style,text,onPress} | 
| visible | visible | bool | 
| onFeedback | 申请关闭HXAlert | func | 
| style | 样式 | object | 

### CodeButton

| 属性 | 说明 | 类型 | 默认值
| :- | :- | :- |  :- | 
| mobile | 手机号 | string | 
| onValidateError | 手机号错误的回调 | (e):void | ()=>{}
| requestGetCode |  请求获取验证码 | ():Promise | ()=>{Promise.reject('请传入props:requestGetCode')}
| style | 按钮样式 | object | 
| textStyle | 按钮文本样式 | object | 

### Checkbox

| 属性 | 说明 | 类型 | 默认值
| :- | :- | :- |  :- | 
| multiple | 是否为多选，开启时传入options参数传入多个可选参 | boolean  | false
| checked | 是否选中，在multiple为false时生效 | boolean | false
| label | 描述，在multiple为false时生效 | string | 
| labelStyle | 描述样式 | object |
| options | { checked, label }  array 在multiple为true时生效  | array | 
| onChange |  值的改变回调 | (multiple?options:checked):void | ()=>{}
| checkedImg | 选中时展示的图片 | number/object | require('xx.png')
| unCheckedImg | 未选中时展示的图片 | number/object | require('xx.png')


### Header

| 属性 | 说明 | 类型 | 默认值
| :- | :- | :- |  :- | 
| title | 标题 | string | 
| titleComponent |自定义标题组件| ReactNode | 
| onLeftPress |  左侧按钮点击事件 | ():Void | ()=>{}
| LeftComponent | 头部左边组件 | ReactNode| 
| RightComponent | 头部右边组件 | ReactNode| 
| style | 样式 | object | 
| titleStyle | title字体样式 | object| 
| barStyle | statusbar样式 enum('default', 'light-content', 'dark-content') | string|  light-content

### Page

  Page组件包裹着Header组件。可以全局配置返回事件,和返回icon

```javascript
import { Page } from "@hx/noxus";
Page.registerReturnEventlistener(() => {
      //doing something
      //this.props.dispatch(navigate.pop());
});
Page.setLeftIconSource(require("yourIconPath"));
```


### DataView

| 属性 | 说明 | 类型 | 默认值
| :- | :- | :- |  :- | 
| isPulldownLoadMore | 是否开启下拉加载 | boolean | true
| isPullupRefresh |是否开启上拉刷新| boolean | true
| getData |  getData | (number:pageIndex):Promise | ()=>{return resolve([])}
| renderItem | 渲染行的函数 | (object:item):ReactNode| 
| ItemSeparatorComponent | 行与行的组件 | ():ReactNode| ()=> (<View></View>)
| injectData | 是否通过dataSource注入数据 | bool | false
| dataSource | 注入的数据 | array | []
| refreshing | 注入数据的刷新状态 | bool | false
| isLoadingMore | 注入数据的下拉加载状态 | bool | false

### ScrollTable

| 属性 | 说明 | 类型 | 默认值
| :- | :- | :- |  :- | 
| isPulldownLoadMore | 是否开启下拉加载 | boolean | true
| isPullupRefresh |是否开启上拉刷新| boolean | true
| getData |  getData | (number:pageIndex):Promise | ()=>{return resolve([])}
| columns | 表头数据 | array | [] 
| fixedColums | 固定表头的dataIndex集合 | array | []
| keyIndex | 行key的索引名[默认会将行数据为key] | string | 
| injectData | 是否通过dataSource注入数据 | bool | false
| dataSource | 注入的数据 | array | []
| refreshing | 注入数据的刷新状态 | bool | false
| isLoadingMore | 注入数据的下拉加载状态 | bool | false
| pulldownLoadMoreInterval | 允许触发下拉加载的时间间隔单位ms | number | 500
| style | 样式 | object | {}
| loadingColor | loading的颜色 | string | #666

### FormCreators表单生成器

    首先你想使用FormCreators来构造一个表单必须进过下列的步骤.

1. 渲染由FormCreators方法生成的表单[详细的data配置](./form-creators-config.md).
```
const data = {
//表单名
formName: "memberAdd",
//表单片段
sections: []
};

const Form = FormCreators(data);//通过data表单描述数据来实例化一个表单组件
//通过<Form />来使用即可
```
2. 将路由配置注入到项目到路由配置中

    因为type为select、time这些组件，需要跳转到单独的页面进行选择所以需要你在路由配置中添加Form所需的路由
```
const RouteConfigs = Object.assign(FormCreators.FormRoutes, {
  //项目中其他的路由配置
  Home: {
    screen: Home
  },
  Form: {
    screen: PageWrapper(Form)
  }
});
```
3. 在reducer中添加form的reducer
```
import { reducer as formReducer } from "redux-form";
combineReducers({
  form: formReducer,
  //项目中其他的reducer
});
```