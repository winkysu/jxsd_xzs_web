<template>
  <div class="security-right">
    <div class="security-right-title">
      <span class="security-right-title-icon"></span>
      <span class="security-right-title-text">教务信息</span>
    </div>
    <div class="jx_info">
      <div class="el-form-item item-info item-id">
        <label class="el-form-item__label">学号:</label>
        <div class="el-form-item__content">
          <span class="userinfo-username">{{this.base_data.id}}</span>
        </div>
      </div>
      <div class="el-form-item item-info">
        <label class="el-form-item__label">姓名:</label>
        <div class="el-form-item__content">
          <span class="userinfo-username">{{this.base_data.name}}</span>
        </div>
      </div>
      <div class="el-form-item item-info">
        <label class="el-form-item__label">性别:</label>
        <div class="el-form-item__content">
          <span class="userinfo-username">{{this.base_data.gender}}</span>
        </div>
      </div>
      <div class="el-form-item item-info">
        <label class="el-form-item__label">民族:</label>
        <div class="el-form-item__content">
          <span class="userinfo-username">{{this.res.nationality}}</span>
        </div>
      </div>
      <div class="el-form-item item-info">
        <label class="el-form-item__label">出生年月:</label>
        <div class="el-form-item__content">
          <span class="userinfo-username">{{this.res.birthday}}</span>
        </div>
      </div>
      <div class="el-form-item item-info">
        <label class="el-form-item__label">政治面貌:</label>
        <div class="el-form-item__content">
          <span class="userinfo-username">{{this.res.political_status}}</span>
        </div>
      </div>
      <div class="el-form-item item-info">
        <label class="el-form-item__label">手机号:</label>
        <div class="el-form-item__content">
          <span class="userinfo-username">{{this.res.mobile}}</span>
        </div>
      </div>
      <div class="el-form-item item-info">
        <label class="el-form-item__label">照片:</label>
        <div class="el-form-item__content">
          <img :src='this.base_data.image' class="userinfo-username" width="15%" height="15%">
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import cookie from '../../static/js/cookie';
import { getJxInfo } from '../../api/api'

export default {
  name:'JxInfo',
  props: [],
  computed: {
    ...mapGetters({
      userInfo:'userInfo'
    })
  },
  data(){
      return{
        id:'',
        res:'',
        base_data:''
      }
  },
  created () {
    this.getInfo();
  },
  methods: {
    getInfo(){
        var getId = cookie.getCookie('username')
        this.id = getId
        getJxInfo(this.id).then((response)=> {
          this.res = response.data;
          this.base_data = response.data.base_data
          console.log("base" + JSON.stringify(this.res) )
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

  /* info */
  .item-info {
    float: left;
    width: 789px;
  }
  .item-id{
    margin-top: 20px;
  }
  .el-form-item {
    margin-bottom: 15px;
  }
  .el-form-item__label {
    font-size: 14px;
    color: #48576a;
    box-sizing: border-box;
    width: 195px;
    text-align: right;
    margin-right: 20px;
    float: left;
    line-height: 30px;
    padding: 0;
  }
  .el-form-item__content {
    line-height: 30px;
    position: relative;
    font-size: 14px;
  }
  .userinfo-username {
    font-size: 14px;
    color: #898989;
  }
</style>
