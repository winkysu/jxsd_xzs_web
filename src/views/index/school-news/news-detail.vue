<template>
    <div class="container">
      <div v-html="newsContent.body" class="newsContent"></div>
    </div>
</template>

<script type="text/ecmascript-6">
import { getredios , getlistDetail } from '../../../api/api'
export default {
  props: [],
  data(){
      return{
        newsId: '',
        newsContent: ''
      }
  },
  methods: {
    getNewsDetail(){
      this.newsId = this.$route.params.id;
      console.log("111" + JSON.stringify(this.newsId))
      var newsid = parseInt(this.newsId)
      //console.log("222" + newsid)
      getlistDetail(this.newsId).then((response)=> {
        //console.log("333" +newsid)
        //console.log("2222"+JSON.stringify(response.data))
        this.newsContent = response.data
      })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  created(){
      this.getNewsDetail();
  }

}
</script>
<style scoped>
  .container{
    width: 80%;
    margin:20px auto;
    padding-bottom: 70px;
    background-color: #fffffF;
    border-radius: 10px;
  }
  .newsTitle{
    margin: auto;
    text-align: center;
  }
  .newsContent{
    width: 80%;
    margin: 0 auto;
    padding-top: 40px;
  }
</style>
