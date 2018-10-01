# form-creators-config

>下面是最简单的表单描述
```
const data = {
formName: "memberAdd",//表单名
sections: [{
    name:'基本信息',
    fields:[{
        {
          name: "income",
          label: "年收入(元)",
          placeholder: "请输入年收入",
          type: "text",
        }
    }],
}]//表单片段
};
```
    表单由名字和很多部分组成。
    将表单也够抽象成一个对象。formName为表单名,sections为表单的块描述信息。
    sections描述的是表单对应每部分的信息。fields为具体的表单最基本使用单元信息。

>type

    text|switch|area|code|select|inputNumber|time|checkbox|city

>表单组件共同的参数[基础参数]

    1. name:表单值的名称 
    2. label:表单显示给用户的名称
    3. placeholder:未输入时的占位符
    4. type:表单组件的输入类型  emum text|switch|area|code|select|inputNumber|time|checkbox
    5. when:何时验证表单 | emum['show','submit']
    6. validate:表单验证方法，验证不通过提示error。详情见redux-form-validators使用说明
    7. warn:表单验证方法，验证不通过提示warn。详情见redux-form-validators使用说明
    8. style:组件的样式具体见源码

>Input

    RightComponent:接受一个组件放置在输入框右侧，props:value
    disabled:是否禁用输入框
    secureTextEntry:是否隐藏输入内容

>switch

    单选组件。配置同基础参数

>area

    输入域组件。配置同基础参数

>code

    验证码组件。
    mobileFrom:'',//手机号码源的字段
    getCode: () => {
            return new Promise((resolve, reject) => {
              setTimeout(resolve, 2000);
            });
    },//点击验证码的回调
    validate:[
        code => {
              return new Promise(resolve => {
                setTimeout(resolve, 20, "");
              });
              // if (code !== '12345') {
              //   return "验证码错误";
              // } else {
              //   return "";
              // }
        }//自定义验证函数。可以返回promise。return的值存在则验证失败，return一个空字符串则验证成功
    ]

>select

    列表单选组件。
    optionsDes: {
        label: "name",//列表中label的字段名
        value: "id"//列表中value的字段名
    },
    options: [
        { id: 1, name: "儿子" },
        { id: 2, name: "女儿" },
        { id: 3, name: "父亲" },
        { id: 4, name: "母亲" },
        { id: 5, name: "丈夫" },
        { id: 6, name: "妻子" }
    ],//列表参数

>inputNumber

    浮动输入组件。配置同基础参数

>time

    时间选择组件。配置同基础参数

>checkbox

    多选组件。
    options: [{key:'test',label:'test'}"]//多选的内容

>checkbox

    省市选择组件。
```javascript
{
name: "city",
label: ['开户所在省', '开户所在区'],
placeholder: ['请选择省', '请选择市区'],
//when: 'show',
validate: [(v = ['','']) => {
return v.map((v, i) => {
    return v ? '' : i === 0 ? '请选择省' : '请选择市区'
});

}],
type: "city"
},
```


# Form props
>pass:(values){}

    点击提交,并且验证通过时触发的函数，values为接受表单输入的数据

>navgation:{push(routeName,params){},pop(params){}}

    表单内部请求路由挑战是触发的函数。
    push为跳转，pop为返回。

>initialValues:{}

    表单的初始数据。
