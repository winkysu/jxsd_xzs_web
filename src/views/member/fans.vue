<template>
  <div class="security-right">
    <div class="security-right-title">
      <span class="security-right-title-icon"></span>
      <span class="security-right-title-text">关注我的</span>
    </div>
    <div class="members">
      <ul class="members_ul">
        <li v-for="(item,index) in this.collections" class="items">
          <div class="member_wrap clearfix S_link1_br">
            <div class="mod_pic S_line1">
              <p class="pic_box">
                <img :src="item.user.image" width="60" height="60" class="W_face_radius" />
              </p>
            </div>
            <div class="mod_info">
              <div class="title W_fb W_autocut ">
                {{item.user.name}}
              </div>
              <div class="statu" v-if="this.isConcern === getFriend(item.user.username)" >
                <i class="el-icon-check S_ficon"></i>
                <span class="S_txt1">已关注</span>
              </div>
              <div class="statu" v-else>
                <i class="el-icon-check S_ficon"></i>
                <span class="S_txt1">未关注</span>
              </div>


              <div class="opt" v-if="this.isConcern === getFriend(item.user.username)">
                <p class="btn_bed">
                  <a class="W_btn_b btn_spe" >私信</a>
                  <a class="W_btn_b btn_spe" @click="deleteFriend(index, item.id)">取消关注</a>
                </p>
              </div>
              <div class="opt" v-else>
                <p class="btn_bed" >
                  <a class="W_btn_b btn_spe" >私信</a>
                  <a class="W_btn_b btn_spe" @click="addFriend(index, item.id)">取消关注</a>
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div >
        <Page class="pagesort" pre-text="上一页" next-text="下一页"
              end-show="false" :page="curPage" :total-page='totalPage' @pagefn="pagefn"></Page>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {  addFriend , getFriend , getAllFriend } from '../../api/api'
  import page from '../list/page/page'
  import { mapGetters } from 'vuex';
  import cookie from '../../static/js/cookie';

  export default {
    name:'friends',
    props: [],
    data(){
      return{
        username:'',
        curPage: 1, // 页码
        newsNum: 0, //数量
        collections: [ ],
        ordering: '-add_time',
        isConcern: ''
      };
    },
    components:{
      'Page': page,
    },
    watch: {
      "$route": "getAllFriend"
    },
    computed: {
      ...mapGetters({
        userInfo:'userInfo'
      }),
      totalPage(){
        console.log(this.newsNum/10)
        return  Math.ceil(this.newsNum/10)
      }
    },

    created () {
      this.getAllFriend();
    },
    methods:{
      getAllFriend () { //获取收藏列表
        var getUserName = cookie.getCookie('username')
        this.username = getUserName
        getAllFriend({
          page: this.curPage, //当前页码
          ordering: this.ordering, //排序类型
          friend_username:this.username
        }).then((response)=> {
          this.collections = response.data.results;
          this.newsNum = response.data.count
          console.log("coll" + JSON.stringify(this.collections) )
        }).catch(function (error) {
          console.log(error);
        });
      },
      deleteFriend (index, id) { //删除收藏商品
        alert('您确定要取消关注吗？');
        delFriend(id).then((response)=> {
          this.collections.splice(index,1);
          alert('已取消');
        }).catch(function (error) {
          console.log(error);
        });
      },
      pagefn(value){//点击分页
        this.curPage = value.page;
        this.getAllFriend ()
      },
      getFriend(id){
        getFriend({
          user_username: this.username,
          friend_username: id
        }).then((response) => {
            console.log("111" + JSON.stringify(response.data))
            if(response.data.count >= 1){
              console.log("wsixix: "+id)
              return true
            }else{
              return false
            }
        }).catch(function (error) {
          console.log(error);
        });

      }
    },
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
  .items{
    float: left;
    width: 290px;
    height: 120px;
    margin: 20px 40px 20px 60px;
    border-radius: 2px;
    background-color: #f2f2f5;
  }
  .member_wrap {
    width: 274px;
    height: 108px;
    padding: 16px 0 16px 16px;
  }
  .mod_pic {
    float: left;
    position: relative;
    width: 66px;
    height: 88px;
    margin-left: -5px;
    border-right-width: 1px;
    border-right-style: solid;
  }
  .S_line1,  .W_btn_b {
    border-color: #d9d9d9;
  }
  .mod_info {
    margin-left: 85px;
    margin-top: 10px;
  }
  .member_wrap .mod_info .title {
    height: 17px;
    vertical-align: top;
    line-height: 1em;
    margin-bottom: 5px;
    font-size: 14px;
  }
  .statu{
    color: #898989;
  }
  .title{
    letter-spacing: 4px;
    word-spacing: normal;
    font-weight: bold;
  }
  .member_wrap .mod_info .title,
  .member_wrap .mod_info .statu,
  .member_wrap .mod_info .text {
    width: 100%;
    margin-bottom: 5px;
  }
  .pic_box{
    margin-top: 12px;
  }
  .W_face_radius{
    border-radius: 50%;
  }
  .opt .W_btn_b {
    vertical-align: top;
    margin-right: 6px;
  }
  .mod_info .btn_spe {
    width: 72px;
  }
</style>
