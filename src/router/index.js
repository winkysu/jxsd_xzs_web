//引入vue
import Vue from 'vue'
//获取参数
import  getQueryString from './getQueryString';
//引入路由组件
import Router from 'vue-router';

import cookie from '../static/js/cookie';

//注册路由
Vue.use(Router);
//引入路由需要的组件


//公共部分
import app from '../views/app/app';

//全局状态控制引入
import store from '../store/store'
import home from '../views/home/home'
import head from '../views/head/head'
import footer from '../views/footer/footer'
import list from '../views/list/list'
import index from '../views/index/index'
import loginHead from '../views/loginHead/loginHead'
import login from '../views/login/login'
import forget from '../views/login/forgetLogin'
import mail from '../views/mail/mail'
import search from '../views/search/search'
import relation from '../views/relation/relation'
import member from '../views/member/member'
import friends from '../views/member/friends'
import fans from '../views/member/fans'
import JxInfo from '../views/member/JxInfo'
import userinfo from '../views/member/userinfo'
import schedule from '../views/schedule/schedule'
import score from '../views/score/score'
import newsDetail from '../views/index/school-news/news-detail'


//配置路由
var router = new Router({
  routes: [{
    path: '/app',
    component: app,
    children: [
      {
        path: 'login',
        name: 'login',
        components: {
          head: loginHead,
          content: login,
          footer: footer
        },
        meta: {
          title: '登录',
          need_log: false
        }
      },
      {
        path: 'forget',
        name: 'forget',
        components: {
          head: loginHead,
          content: forget,
          footer: footer
        },
        meta: {
          title: '忘记密码',
          need_log: false
        }
      },
      {
        path: 'home',
        components: {
          head: head,
          content: home,
          footer: footer,
          need_log: false
        },
        children: [
          {
            path: 'list/:schedule_lesson__semester',
            name: 'list',
            component: list,
            meta: {
              title: '列表',
              need_log: false
            }
          },
          {
            path: 'search',
            name: 'search',
            component: search,
            meta: {
              title: '搜索',
              need_log: false
            }
          },
          {
            path: 'mail',
            name: 'mail',
            component: mail,
            meta: {
              title: '邮件',
              need_log: false
            }
          },
          {
            path: 'schedule',
            name: 'schedule',
            component: schedule,
            meta: {
              title: '课程表',
              need_log: true
            }
          },
          {
            path: 'score',
            name: 'score',
            component: score,
            meta: {
              title: '成绩',
              need_log: true
            }
          },
          {
            path: 'relation',
            name: 'relation',
            component: relation,
            meta: {
              title: '关系',
              need_log: true
            }
          },
          {
            path: 'index',
            name: 'index',
            component: index,
            meta: {
              title: '首页',
              need_log: false
            }
          },
          {
            path: 'listDetail/:id',
            name: 'listDetail',
            component: newsDetail,
            meta: {
              title: '新闻详情',
              need_log: false
            }
          },
          {
            path: 'member',
            name: 'member',
            component: member,
            children: [
              {
                path: 'friends',
                name: 'friends',
                component: friends,
                meta: {
                  title: '我的关注',
                  need_log: true
                }
              },
              {
                path: 'fans',
                name: 'fans',
                component: fans,
                meta: {
                  title: '关注我的',
                  need_log: true
                }
              },
              {
                path: 'JxInfo',
                name: 'JxInfo',
                component: JxInfo,
                meta: {
                  title: '教务信息',
                  need_log: true
                }
              },
              {
                path: 'userinfo',
                name: 'userinfo',
                component: userinfo,
                meta: {
                  title: '用户信息',
                  need_log: true
                }
              },
            ]
          }
        ]
      },
    ]
  }]
})

//进行路由判断
router.beforeEach((to, from, next) => {
  var nextPath = cookie.getCookie('nextPath')
  console.log(nextPath)
  if(nextPath=="pay"){
    next({
      path: '/app/home/member/order',
    });
  }else{
    if(to!=undefined){
      if(to.meta.need_log){
        console.log(to.meta.need_log)
        if(!store.state.userInfo.token){
          next({
            path: '/app/login',
          });
        }else {
          next();
        }
      }else {
        if (to.path === '/') {
          next({
            path: '/app/home/index',
          });
        }else {
          next();
        }
      }
    }else {
      if (to.path === '/') {
        next({
          path: '/app/home/index',
        });
      }else {
        next();
      }
    }
  }


  // if(!store.state.userInfo.token&&to.path!='/app/login'){
  //     next({
  //     path: '/app/login',
  //   });
  // }else{
  //   if (to.path === '/') {
  //     next({
  //       path: '/app/home/index',
  //     });
  //   } else {
  //     next();
  //   }
  // }

  // if (to.path === '/') {
  //   next({
  //     path: '/app/home/index',
  //   });
  // } else {
  //   next();
  // }
  //有登录时使用
  // if(to.path !== "/login"&&to.path !== "/home/index"&&to.path !== "/"){
  //    // iView.LoadingBar.start();
  // }
})

// if (to.path === '/') {
//         next({
//             path: '/home/index',
//         });
//     } else {
//         next();
//     }
// })

//修改网页标题
//router.afterEach((to, from, next) => {
 // document.title = to.matched[to.matched.length - 1].meta.title;
//})

//抛出路由
export default router;
