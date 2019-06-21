<template>
  <div class="security-right">
    <div class="security-right-title">
      <span class="security-right-title-icon"></span>
      <span class="security-right-title-text">用户信息</span>
    </div>
    <form name="formEdit" >
        <div class="el-form-item user-nick-name">
          <label class="el-form-item__label">姓名:</label>
          <div class="el-form-item__content">
            {{this.name}}
          </div>

        </div>
        <div class="el-form-item user-email">
          <label class="el-form-item__label">你的邮箱:</label>
          <div class="el-form-item__content">
            <div class="el-input">
              <input type="text" autocomplete="off" placeholder="xxxx@xx.com"
                     v-model="email" rows="2" maxlength="19"  class="el-input__inner">
            </div>
          </div>

        </div>
        <div class="el-form-item user-img">
          <label class="el-form-item__label">头像:</label>
          <el-upload class="upload-demo" action="" :auto-upload='false'>
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
        <div class="el-form-item user-my-btn">
          <div class="el-form-item__content">
            <div class="padding-dom"></div>
            <div class="user-my-btn-warp">
              <el-button type="primary" class="btn"  @click="confirmModify">
                <span>保存</span>
              </el-button>
            </div>
          </div>
        </div>
    </form>
  </div>
</template>
<script>
import datepicker from 'vue-date'
import {getUserDetail, updateUserInfo} from '../../api/api'
import { mapGetters } from 'vuex';
import cookie from '../../static/js/cookie';
export default {
    data () {
        return {
          name:'',
          id:'',
          email: '',
          image: ''

        };
    },
    props: {

    },
    components: {
        datepicker
    },
    created () {
       this.getUserInfo();
    },
    watch: {

    },
    computed: {
      ...mapGetters({
        //goods_list: 'goods_list',
        userInfo:'userInfo'
      })
    },
    methods: {
        handleAvatarSuccess(res, file) {
          this.image = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        getUserInfo () { //请求用户信息
           var getname = cookie.getCookie('name')
           this.name=unescape(getname)

           var id = cookie.getCookie('id')
           this.id = id
          console.log("id" + this.id );
           //邮箱/头像信息
           getUserDetail(this.id).then((response)=> {
             this.email = response.data.email;
             this.image = response.data.image;
             console.log("获取" +response.data );
           }).catch(function (error) {
             console.log(error);
           });
        },
        confirmModify () { // 确认修改
            updateUserInfo({
                email : this.email,
            }).then((response)=> {
                alert('修改成功');
                console.log("修改成功" +response.data );
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}
</script>
<style scoped>
  .security-right{
    float: left;
    width: 829px;
    border-left: 1px solid #ddd;
    background: #fff;
    min-height: 600px!important;
  }
  .security-right-title{
    height: 50px;
    padding-left: 30px;
    border-bottom: 1px solid #ddd;
  }
  .security-right-title-icon{
    float: left;
    width: 4px;
    height: 16px;
    margin-top: 18px;
    background-color: #00a1d6;
    border-radius: 4px;
  }
  .security-right-title-text{
    float: left;
    margin: 15px 0 0 5px;
    color: #00a1d6;
    font-size: 14px;
    cursor: default;
  }

  .user-nick-name{
    margin-top: 60px;
    float: left;
    width: 789px;
  }
  .el-input__inner {
    float: left;
    width: 225px;
    height: 30px;
    margin-right: 40px;
  }
  .el-form-item__label{
    width: 125px;
    text-align: right;
    margin-right: 20px;
    float: left;
    line-height: 30px;
    padding: 0;
  }
  .el-form-item__content{
    float: left;
    width: 225px;
    height: 30px;
    line-height: 30px;
    margin-right: 40px;
  }
  .el-form-item{
    margin-bottom: 22px;
  }
  .padding-dom {
    width: 789px;
    height: 99px;
    border-bottom: 1px solid #e5e9ef;
    margin-bottom: 40px;
  }
  .user-my-btn{
    float: left;
    width: 789px;
  }
  .user-my-btn-warp {
    float: left;
    width: 789px;
    height: 36px;
    position: relative;
  }
  .btn {
    width: 110px;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }

  /*img*/
  .el-upload__tip{
    margin-left:190px;
  }
  .avatar-uploader  {
    width: 178px;
    height: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>




