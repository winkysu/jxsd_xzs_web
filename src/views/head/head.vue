<template>
  <div class="container">
    <img class="logo" src="../../static/images/logo.png">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-menu
            :default-active="$route.path"
            class="el-menu-demo home-nav"
            router
            mode="horizontal"
            background-color="#ffffff"
            text-color="#0063b9"
            active-text-color="#ffd04b">
            <el-menu-item v-for="(item,i) in navList" :key="i" :index="'/app/home/'+item.name">
              <router-link :to="'/app/home/'+item.name">{{ item.navItem }}</router-link>
            </el-menu-item>

            <el-submenu id="ECS_MEMBERZONE" v-if="userInfo.name" index="2" >
              <template slot="title" >
                {{username}}
              </template>
              <el-menu-item class="user_info" ><router-link :to="'/app/home/member/userinfo'">个人信息</router-link></el-menu-item>
              <el-menu-item class="update_password" >同步密码</el-menu-item>
              <el-menu-item class="user_logout" ><a @click="loginOut">退出</a></el-menu-item>
            </el-submenu>

            <el-menu-item  id="ECS_MEMBERZONE" v-else  class="user_login">
              <router-link :to="'/app/login'" >请登录</router-link>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import cookie from '../../static/js/cookie';
//import { getCategory } from  '../../api/api'
export default {
    data(){
        return {
          username:'',
          semester:'2019/3/1 0:00:00',
          navList:[
            {name: 'index', navItem: '首页'},
          ],
          navList1: [
            {name: 'index', navItem: '首页'},
            {name: 'mail', navItem: '消息'},
            {name: 'score', navItem: '成绩'},
            {name: 'schedule', navItem: '课程'},
            {name: 'search', navItem: '查询'},
            {name: 'relation', navItem: '关系图谱'}
          ],
          navList2: [
            {name: 'index', navItem: '首页'},
            {name: 'mail', navItem: '消息'},
            {name: 'score', navItem: '签到'},
            {name: 'schedule', navItem: '课程'},
            {name: 'bigdata', navItem: '大数据'},
            {name: 'relation', navItem: '关系图谱'},
            {name: 'relation', navItem: '查找'}

          ]
        }

    },
    computed: {
        ...mapGetters({
          goods_list: 'goods_list',
          userInfo:'userInfo'
        })
    },
    methods:{
        loginOut(){
            //跳转到登录
            this.$router.push({ name: 'login' })
        },
        getUserName(){
          var name =  cookie.getCookie('name')
          var is_stu = cookie.getCookie('is_student')
          var is_tec = cookie.getCookie('is_teacher')
          this.username=unescape(name)
          if(is_stu === "true"){
            this.navList = this.navList1
            return;
          }
          if(is_tec === "true") {
            this.navList = this.navList2
          }

        }
    },
    watch:{
      navList(newValue, oldValue) {
        this.navList = newValue
      }
    },
    created(){
    },
    mounted () {
      this.getUserName()
    }

}
</script>
<style scoped>
  .logo{
    display: block;
    margin-top: 2rem;
    margin-bottom: 2rem;
    margin-left: 8rem;
  }
  .container{
    width: 100%;
    margin-left: 0;
    position: relative;
  }
  .container >>> .el-submenu{
    position: absolute;
    right: 7rem;
  }
  .user_login{
    position: absolute;
    right: 7rem;
  }
  .home-nav{
    padding-left: 9rem;
  }
  el-menu-item{
    font-size: 1.6rem;
  }
  a:hover{
    text-decoration: none;
  }
  .user_info :hover,
  .user_logout :hover{
    color: #2d2d2d;
  }

</style>
