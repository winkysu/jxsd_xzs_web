<template>
  <div class="wrapper">
    <div class="list-detail">
      <school-news :listData="listData" class="news"></school-news>
      <Page class="pagesort" pre-text="上一页" next-text="下一页" end-show="false" :page="curPage" :total-page='totalPage' @pagefn="pagefn"></Page>
    </div>
    <history-log class="history_log"></history-log>
  </div>
</template>
<script>
import schoolNews from "./school-news/school-news"
import historyLog from './historyLog/history-log'
import page from '../list/page/page'
import { getredios , getlistDetail } from '../../api/api'

export default {
  data() {
    return{
      curPage: 1, // 页码
      newsNum: 0, //数量
      listData: [],
      ordering: '-time'
    }
  },
  components:{
    'history-log': historyLog,
    'schoolNews': schoolNews,
    'Page': page,
  },
  props: {

  },
  created () {
    this.getschoolNews ();
  },
  watch: {
    "$route": "getschoolNews"
  },
  computed: {
    totalPage(){
        console.log(this.newsNum/10)
      return  Math.ceil(this.newsNum/10)
    }
  },
  methods: {
    getschoolNews(){
      getredios({
        page: this.curPage, //当前页码
        ordering: this.ordering, //排序类型
        page_size: 10
      }).then((response)=> {
      this.listData = response.data.results
      this.newsNum = response.data.count
      console.log("2222"+this.newsNum)
    })
    .catch(function (error) {
        console.log(error);
      });
    },

    pagefn(value){//点击分页
      this.curPage = value.page;
      this.getschoolNews()
    }
  }
}
</script>
<style  scoped>
  .wrapper{
    width: 100%;
    height: 100%;
  }
  .list-detail{
    width: 70%;
    height: 400px;
    margin: 40px auto 40px;
    position: relative;
    padding: 20px;
    background-color: #fff;
    border-radius: 9px;
  }

  .pagesort{
    float: right;
    display: inline-block;
  }


</style>
