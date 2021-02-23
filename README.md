<h2>RetinaPtWechat</h2>
Patient-specific service solutions in the referral audit system make it easy for patients to create/view/maintain/share personal information and inspection reports, as well as convenient channels to quickly create/view/maintain referral appointment-related information.<br/>
(眼底检查预约转诊解决方案体系中针对患者的服务解决方案，主旨使患者可以轻松创建/查看/维护/分享个人信息及检查报告，同时有便捷渠道快速创建/查看/维护转诊预约相关信息。)<br/>

## Introduction
Type (类型)：公众号；<br/>
Audiences (受众/服务对象)：患者；<br/>
Key Features (主要功能)：<br/>
 1. 注册/登陆；
 2. 患者信息维护/绑定；
 3. 预约转诊；
 4. 查看个人检查报告；

## Prerequisites

-   git (v2.2+)
-   node.js (v14.15.4+)
-   npm (v6.14.10+)
-   yarn (v1.22.10+)
-   TypeScript(V3.9.5+)
-   expo (v39.0.2+)
-   react-native (v0.63.3+)
-   redux (V4.0.5+)

## Initial Evironment
-   One Step: `yarn install`;
    Install all dependencies;
-   Scripts:
    - "start": 打包运行APP在production模式下;
    - "web": 运行React-native项目在Web模式下（开发模式）
    - "build": 产品级打包
-   Config files:
    - babel.config.js: JS兼容性配置
    - tsconfig.json: The compilation configuration of the typescript. // type script的编译配置;

## Structure
   - assets: 资源文件（图片/字体）
   - constants：样式文件
   - hooks
   - i18n：国际化
   - components: 通用组件
   - middleware：前端中间层，负责请求及数据格式化
   - navigation：路由转换
   - screens：具体界面
   - store： reducer
   
## Run test tools
   - 微信开发者工具 https://codeload.github.com/onlyhom/mobileSelect.js/zip/master
   ![image text](https://github.com/SujunYao/readme-images/blob/master/images/wechart_tools.png)

## Resource links:
- React Native (https://reactnative.dev/);
- TypeScript: (https://www.typescriptlang.org/index.html)
- Redux: (https://redux.js.org/)
- React Navigation:(https://reactnavigation.org/)
- expo (https://expo.io/)
