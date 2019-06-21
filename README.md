技术栈
-----
  vue2 + vuex + vue-router + webpack + ES6/7 + vue-axios 

项目运行
注意：由于涉及大量的 ES6/7 等新属性，node 需要 6.0 以上版本

npm install 或 yarn(推荐)

npm run dev

关于接口数据
此项目的所有接口数据都来源于配套的后台系统，

该项目只做前端开发，

说明
-----
开发环境 macOS 10.12.3 Chrome 56  nodejs 6.10.0

使用框架--- Element ui  /  echart.js  /  D3.js

目标功能
------
     .
     校园通知 -- 完成
     用户日志 -- 完成
     成绩分析 -- 完成
     课程显示 -- 完成
     搜索用户，班级，部门  -- 完成
     登录、注册 -- 完成
     忘记密码 -- 完成
     个人中心 -- 完成
     关系图谱 -- 部分完成
     知识图谱 -- 有点难，未完成 
     邮箱 -- 嵌套难，未完成 
     点到 -- 别问，问就未完成
     网盘 -- 不会（QVQ）
     老师端 ---  放过我（QAQ）
#总结
----
1、PC端，未响应

2、第一次做前后端分离，页面与页面之间交互复杂，在写到功能时众多的数据和逻辑一度让人很头疼，虽然设计和接口api文档，作为一个以前只写静态文件，就把页面丢给后台JSP处理，我觉得已经尽力了。【实话，别打人】

3、vue因其轻量级的框架在中小型项目中表现亮眼，在大型单页面应用中因为vuex的存在，表现依然出色，在处理复杂交互逻辑的时候，vuex的存在是不可或缺的。所以说利用 vue + vuex 完全可以去做大型的单页面项目。

4、项目写到现在，从 登录注册到、首页、搜索、成绩、课表、、个人中心 一个流程走完之后、不但对vue的理解更深一层，而且对以后掌控大型项目的时候也有非常多的帮助，做一个实际的项目才能对自己有很大的提升。【假的，其实我还是有点懵】

5、曾一度怀疑，花几个月的时间做这样一个项目到底有没有意义，本来只是想做一个小项目练练手，没想到后来越写越多，不过坚持下来后我相信一切都是值得的。【emmmmm】

6、项目已经完成，共4个页面。【 ？】

#最终目标
-------
1、如果时间来的及，会完成队友的伟大计划。
所以我的目的是什么呢。
。。。敬请期待

项目布局
----
#
    .
    ├── build                                       // webpack配置文件
    ├── config                                      // 项目打包路径
    ├── elm                                         // 上线项目文件，放在服务器即可正常访问
    ├── screenshots                                 // 项目截图
    ├── src                                         // 源码目录
    │   ├── components                              // 组件
    │   │   ├── common                              // 公共组件
    │   │   │   ├── messageBox.vue                  // 弹出框组件
    │   │   │   ├── page.vue                        // 分页组件
    │   │   ├── footer
    │   │   │   └── foot.vue                        // 底部公共组件
    │   │   └── header
    │   │       └── head.vue                        // 头部公共组件
    │   ├── config                                  // 基本配置
    │   │   ├── env.js                              // 环境切换配置
    │   │   ├── fetch.js                            // 获取数据
    │   │   ├── mUtils.js                           // 常用的js方法
    │   │   └── rem.js                              // px转换rem
    │   ├── images                                  // 公共图片
    │   ├── views
    │   │   ├── index
    │   │   │   ├── index.vue                        // index页
    │   │   │   └── children
    │   │   │       ├── history-log.vue              // 用户日志页
    │   │   │       └── school-news.vue              // 新闻页
    │   │   │           └── children
    │   │   │               ├── news-detail.vue      // 新闻详情页
    │   │   │               └── school-news.vue      // 新闻列表页
    │   │   ├── mail
    │   │   │   ├── mail.vue                         // 邮箱页
    │   │   │   └── children
    │   │   │       ├── Editor.vue                   // 文本内容页
    │   │   │       ├── mail-detail.vue              // 发邮件详情页
    │   │   │       ├── mail-detail-group.vue        // 发群邮件详情页
    │   │   │       ├── mail-nav.vue                 // 邮箱导航
    │   │   │       └── user.vue                     // 列表
    │   │   │           └── children
    │   │   │               ├── friends.vue          // 好友列表页
    │   │   │               ├── groups.vue           // 群组列表页
    │   │   │               └── searchs.vue          // 搜索用户页
    │   │   ├── relation
    │   │   │   ├──relation.vue                      // 关系图谱页
    │   │   │   └── children
    │   │   │       ├── find-rel.vue                 // 关系查询
    │   │   │       └──  find-sub.vue                // 专业查询
    │   │   ├── schedule
    │   │   │   └── schedule.vue                     // 课表页
    │   │   │   └── children
    │   │   │       ├── stulist.vue                  // 学生名单
    │   │   │       └── timetable.vue                // 课表详情页
    │   │   ├── score
    │   │   │   └── score.vue                        // 成绩分析市页
    │   │   │   └── navSlide
    │   │   │       └── nav-slide.vue                // 学期导航
    │   │   │   └── score-detail
    │   │   │       ├── credit-all.vue               // 查询总学分
    │   │   │       ├── credit-semster.vue           // 查询学期学分
    │   │   │       ├── score-detail.vue             // 成绩数据图
    │   │   │       ├── score-table.vue              // 成绩数据表
    │   │   │       └── score-update.vue             // 更新成绩
    │   │   ├── home
    │   │   │   └── home.vue                        // 首页
    │   │   ├── login
    │   │   │   ├── login.vue                       // 登录注册页
    │   │   │   └── forget.vue                      // 忘记密码，修改密码页
    │   │   ├── search
    │   │   │   └── search.vue                      // 搜索页
    │   ├── plugins                                 // 引用的插件
    │   ├── router
    │   │   └── router.js                           // 路由配置
    │   ├── service                                 // 数据交互统一调配
    │   │   ├── getData.js                          // 获取数据的统一调配文件，对接口进行统一管理
    │   │   └── tempdata                            // 开发阶段的临时数据
    │   ├── store                                   // vuex的状态管理
    │   │   ├── action.js                           // 配置actions
    │   │   ├── getters.js                          // 配置getters
    │   │   ├── index.js                            // 引用vuex，创建store
    │   │   ├── modules                             // store模块
    │   │   ├── mutation-types.js                   // 定义常量muations名
    │   │   └── mutations.js                        // 配置mutations
    │   └── style
    │       ├── common.scss                         // 公共样式文件
    │       ├── mixin.scss                          // 样式配置文件
    │       └── swiper.min.css
    │   ├── App.vue                                 // 页面入口文件
    │   ├── main.js                                 // 程序入口文件，加载各种公共组件
    ├── favicon.ico                                 // 图标
    ├── index.html                                  // 入口html文件


