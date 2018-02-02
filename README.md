# scmsmodules-runner

[![npm](https://img.shields.io/npm/v/scmsmodules-runner.svg)](https://www.npmjs.com/package/scms-modules)
[![npm](https://img.shields.io/npm/dt/scmsmodules-runner.svg)]()



### 简介
scmsmodules-runner 是对scmsmodules组件库的预览服务。预览平台内部代码也是由scmsmodules组件构成。

scmsmodules组件想在预览平台看到效果，需要沿用一定规则操作。

### scmsmodules-runner是怎么工作的：

1. 整个应用由scmsmodules组件构成
2. scmsmodules的效果展示，会去引入scmsmodules/demo/index.js，此js会输出一个数组数据，此数据为所有组件的数据对像。runner会跟据这个数据转换成预览效果的模板。
3. scmsmodules的组件形式分为两种：
    1）scmsUi的形式：可复用的html样式组件
    2）angular directive的形式：可复用的angular directive组件
    因此他们在输出数据对像时，会有所差别

### scmsUi输出的数据对像，如buttons为例

```sh
    import buttons from "./buttons.html";
    import buttonIcon from "./buttonIcon.html";
    export default [{   //输出的可以是一个数组，也可以是个对像
        title: "Buttons",   //组件名称
        parentTitle: "Buttons", //如果这个组件与别的组件为一类，他们父名称
        author: "tianyanrong",  //作者
        html: [buttons, buttonIcon],    //html模板，按钮的不同形态的html
        isCode: true    //是否需要显示代码
    }]
```

### angular directive输出的数据对像：
    

### 开发过程

![](http://image.tf56.com/dfs/group1/M00/48/46/CiFBClpq4ZWAd_-pAACtFnH91l0169.png)





