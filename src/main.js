//这个是全局文件

import mock from '../mock/mock.js'

//全局引入jq
import $ from 'jquery';
import './axios/';
import Axios from 'axios';
Vue.prototype.$http = Axios
Vue.prototype.$echarts = echarts

//全局引入echarts
import echarts from 'echarts'
Vue.use(echarts);
//全局引入vue
import Vue from 'vue';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Popover } from 'element-ui';
Vue.use(Popover);
Vue.use(ElementUI)

import VueQuillEditor  from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor);


import * as d3 from 'd3';


//全局引入共用css
import './styles/common.scss';
//引入字体样式
import './styles/fonts/iconfont.css';
//全局引入路由配置
import router from './router';


//全局状态控制引入
import store from './store/store';


//全局加载resource拦截器


//引入需要渲染的视图组件
import App from './App';

//创建全局实例
new Vue({
    el:'#app',
    router,
    store,
    template:'<App/>',
    components:{App}
})

