<template>
  <div>
    <div class="c-box" >
      <div class="login-box clearfix"style="margin-top:10px">
        <div class="fr form-box">
          <h2>帐号登录</h2>
          <form id="jsLoginForm" autocomplete="off">
            <input type="hidden" name="csrfmiddlewaretoken" value="ywSlOHdiGsK6VFB6iyhnB1B30khmz8SU">

            <div class="form-group marb20">
              <label class="el-icon-user"></label>
              <input name="account_l" id="account_l" type="text" v-model="userName" @focus="errorUnshow" placeholder="教务在线学号">
            </div>
             <p class="error-text" v-show="userNameError">{{userNameError}}</p>

            <div class="form-group marb8">
              <label class="el-icon-key"></label>
              <input name="password_l" id="password_l" type="password" v-model="parseWord" @focus="errorUnshow" placeholder="请输入您的密码">
            </div>
            <p class="error-text" v-show="parseWordError">{{parseWordError}}</p>

            <div class="forget-btn">
              <router-link :to="'/app/forget' ">忘记密码?</router-link>
            </div>
            <div class="auto-box marb38">
            </div>
            <p class="error-text" v-show="error">{{error}}</p>
            <input class="btn btn-green" id="jsLoginBtn" type="button" @click = "login" value="立即登录 &gt; ">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import cookie from '../../static/js/cookie';
  import { login } from '../../api/api'
  export default {
    data(){
      return {
        id:'',
        userName:'',
        parseWord:'',
        gender:'',
        is_student: '',
        is_teacher: '',
        image:'',
        autoLogin:false,
        error:false,
        userNameError:'',
        parseWordError:''
      }
    },
    methods:{
      login(){
          var that = this;
      login(
        {
          username:this.userName,
          password:this.parseWord
        }
      ).then((response)=> {
        console.log(response);
        //本地存储用户信息
        cookie.setCookie('id',response.data.user.id,7);
        cookie.setCookie('username',this.userName,7);
        cookie.setCookie('name',response.data.user.name ,7);
        cookie.setCookie('gender',response.data.user.gender ,7);
        cookie.setCookie('is_student',response.data.user.is_student ,7);
        cookie.setCookie('is_teacher',response.data.user.is_teacher ,7);
        cookie.setCookie('image',response.data.user.image ,7);
        cookie.setCookie('token',response.data.token,7)
        //存储在store
        // 更新store数据
        that.$store.dispatch('setInfo');
        //跳转到首页页面
        this.$router.push({ name: 'index'})
      })
      .catch(function (error) {
        if("non_field_errors" in error){
          that.error = error.non_field_errors[0];
        }
        if("username" in error){
          that.userNameError = error.username[0];
        }
        if("password" in error){
          that.parseWordError = error.password[0];
        }
      });
    },
      errorUnshow(){
        this.error = false;
      }
    },
    created(){
      //清除缓存
      cookie.delCookie('token');
      cookie.delCookie('name');
      //重新触发store
      //更新store数据
      this.$store.dispatch('setInfo');
    }
  }
</script>
<style  scoped>
  .error-text{
    color:#fa8341;
  }
  .c-box{
    width:100%;
    min-width: 1190px;
    overflow:hidden;
  }
  .login-box{
    width:500px;
    margin:20px auto;
  }
  .clearfix::after {
    clear: both;
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    visibility: hidden;
  }

  .form-box{
    position:relative;
    height: 472px;
    color:#666;
    width: 400px;
    margin: 60px auto 0;
    padding: 50px 50px 30px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
    vertical-align: middle;
    display: inline-block;
  }
  .form-box > h2,
  .form-box > .tab{
    height:54px;
    line-height:54px;
    margin-bottom:34px;
    font-size:18px;
    font-weight:normal;
    color:#333;
    border-bottom:1px solid #eaeaea;
  }
  .form-box > .tab > h2{
    float:left;
    width:90px;
    height:53px;
    line-height:53px;
    cursor: pointer;
    font-weight:normal;
    text-align:center;
  }
  .form-box > .tab > h2.active{
    border-bottom:3px solid #6ec55a;
    color:#333;
  }


  .form-group{
    position: relative;
  }
  .form-group > label{
    position: absolute;
    top: 22px;
    left: 10px;
    font-size: 26px;
    color: #969696;
  }
  .form-group > input{
    position:relative;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    overflow:hidden;
    width: 80%;
    height: 50px;
    margin: 5px auto;
    padding: 4px 12px 4px 40px;
    border: 1px solid #c8c8c8;
    background-color: hsla(0,0%,71%,.1);
    vertical-align: middle;
  }
  .form-group .mobile-register-captcha{
    width:85px;
  }
  .form-group .captcha{
    cursor: pointer;
  }
  .forget-btn{
    float: right;
    position: relative;
    margin: 15px 0;
    font-size: 14px;
  }
  .forget-btn a{
    color: #999;
    display: block;
    margin-right: 10px;
  }
  .forget-btn a:hover{
    color: #000;
  }
  .marb20{
    margin-bottom:8px;
  }
  .marb8{
    margin-bottom:8px;
    margin-top: 20px;
  }
  .marb38{
    margin-bottom:38px;
  }
  .error{
    background: #fb8344;
    color:#fff !important;
    text-align: center;
    height:40px !important;
    line-height: 40px !important;
    margin:10px 0;
  }
  .auto-box{
    height:18px;
    line-height:18px;
  }
  .auto-box > label > input{
    vertical-align: sub;
  }
  .auto-box > label > a{
    color:#6ec559;
  }
  .btn{
    width:100%;
    height:50px;
    line-height:42px;
    font-size:14px;
    color:#fff;
    border:0;
    border-radius: 5px;
    cursor:pointer;
  }
  .btn-green{
    background:	rgba(0,99,185,0.8);
  }
  .btn-green:hover{
    background:rgba(0,99,185,1);
  }
  .form-p{
    position:absolute;
    left:40px;
    bottom:25px;
  }
  .form-p > a{
    color:#fa8341;
  }
  .form-p > a:hover{
    color:#666;
  }


</style>
