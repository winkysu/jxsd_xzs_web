<template>
<div class="sliderbar">
    <span class="sliderbar_title">个人中心</span>
    <ul class="slide_item">
      <li class="item">
        <i class="item_icon"></i>
        <a :class="{on: current==='userinfo'}" @click="toUserInfo" class="item_title">用户信息</a>
        <!-- <a :class="{on: current==='collection'}" @click="toCollection">我的收藏</a> -->
      </li>
      <li class="item">
        <i class="item_icon"></i>
        <a :class="{on: current==='friends'}" @click="toFriend" class="item_title">我的关注</a>
      </li>
      <li class="item">
        <i class="item_icon"></i>
        <a :class="{on: current==='fans'}" @click="toFans" class="item_title">关注我的</a>
      </li>
      <li class="item">
        <i class="item_icon"></i>
        <a :class="{on: current==='fans'}" @click="toJxInfo" class="item_title">教务信息</a>
      </li>
    </ul>
</div>
</template>
<script>
export default {
  data () {
    return {
        current: 'userinfo'
    };
  },
  props: {

  },
  created () {
    var temp = this.$route.path.split('/');
    this.current = temp[temp.length - 1];
  },
  watch: {

  },
  computed: {

  },
  methods: {
    /*
    member () { // 会员中心
        this.$router.push({name: 'member'});
    },
    toOrder () {  // 我的订单
        this.current = 'order';
        this.$router.push({name: 'order'});
    },
    toReceive () { // 收货地址
        this.current = 'receive';
        this.$router.push({name: 'receive'});
    },*/
    toUserInfo () { // 用户信息
        this.current = 'userinfo';
        this.$router.push({name: 'userinfo'});
    },
    toFriend () { //我的关注
        this.current = 'friends';
        this.$router.push({name: 'friends'});
    },
    toFans () { //关注我的
      this.current = 'fans';
      this.$router.push({name: 'fans'});
    },
    toJxInfo () { //关注我的
      this.current = 'JxInfo';
      this.$router.push({name: 'JxInfo'});
    }
  }
}
</script>
<style scoped>
  .sliderbar{
    float: left;
    width: 150px;
    height: 100%;
    overflow: hidden;
  }
  .sliderbar_title{
    display: block;
    width: 150px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: #99a2aa;
    cursor: default;
    border-bottom: 1px solid #e1e2e5;
  }
  .slide_item{
    border-bottom: 1px solid #e1e2e5;
  }
  .item{
    width: 150px;
    height: 60px;
    line-height: 60px;
  }
  .item_title{
    display: block;
    text-align: center;
    letter-spacing: 7px;
  }
  .item_title:hover{
    color: #68a0fc;
  }
</style>
