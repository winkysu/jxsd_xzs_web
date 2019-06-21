<template>
  <div>
    <div class="c-box" >
      <div class="login-box clearfix"style="margin-top:10px">
        <div class="fr form-box">
          <h2>忘记密码</h2>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="学号/工号" prop="userName">
              <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import cookie from '../../static/js/cookie';
  import { resetPwd } from '../../api/api'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          userName: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              console.log("2222"+this.ruleForm.userName)
              console.log("2222"+this.ruleForm.pass)
            resetPwd(
              {
                username:this.ruleForm.userName,
                password:this.ruleForm.pass
              }
            ).then((response)=> {
              alert(response);
            })
              .catch(function (error) {
                alert(error.detail);
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
          } else {
            alert('error submit!!');
            return false;
          }
        });
        this.$router.push({ name: 'login'})

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
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
    margin-bottom:5px;
  }
  .marb8{
    margin-bottom:8px;
    margin-top: 10px;
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

  .return{
    display: block;
    width: 40%;
    height: 30px;
    padding-top: 10px;
    font-size: 16px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    color: #969696;
    cursor: pointer;
  }
  .return i {
    margin-right: 5px;
  }
</style>
