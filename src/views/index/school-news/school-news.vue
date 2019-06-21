<template>
  <div class="productlist">
    <div class="titlebar">
      <i class="el-icon-s-grid"></i>
      <h4>校园通知</h4>
    </div>
    <ul class="cle">
      <li v-for="item in listData" class="items">
        <router-link :to="'/app/home/listDetail/'+item.id" target="_blank" class="productitem">
          {{item.title}}     <span>{{item.time}}</span>
        </router-link>
      </li>
    </ul>
    <br clear="all">
  </div>
</template>
<script>
  //import { getredios , getlistDetail } from '../../../api/api'
  export default {
    data () {
      return {
        //newData: '',
        //curPage: 1, // 页码
        //newsNum: 0
      };
    },
    props: {
      listData: {
        type: Array,
        default: function() {
          return [];
        }
      }
    },
    created () {
        //this.getschoolNews();
    },
    mouted: {

    },
    watch: {

    },
    computed: {

    },
    methods: {
      getschoolNews(){
        getredios({
          params:{ }
        }).then((response)=> {
          //console.log("2222"+JSON.stringify(response.data.results))
          this.newData = response.data.results
          this.newsNum = response.data.counter
        })
          .catch(function (error) {
            console.log(error);
          });
      },
    }
  }
</script>
<style scoped>
  .productlist{
    width: 90%;
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 9px;
  }
  .titlebar {
    position: relative;
    margin-bottom: 25px;
    text-align: left;
  }
  .el-icon-s-grid{
    color: #0063b9;
    font-size: 1.7rem;
    z-index: 3;
    background-color: #fff;
    margin-right: .7rem;
  }
  .titlebar h4 {
    font-size: 1.7rem;
    margin: 0;
    font-weight: normal;
    display: inline-block;
    padding-right: 2%;
    position: relative;
    z-index: 2;
    background-color: #fff;
    color: #0063b9;
  }
  .cle  span{
    text-align: right;
  }
  .items{
    margin-left: 15px;
    margin-bottom: 5px;
  }
  .items:hover{
    color:#0063b9 ;
  }
</style>
