<template>
  <el-container>
    <el-aside class="leftSide" style="width: 200px; overflow: hidden" >
      <div class="leftSide_title">
        <i class="el-icon-s-grid"></i>
        <span>学期列表</span>
      </div>
      <!--左侧菜单组件-->
      <el-menu
        default-active="0"
        class="el-menu-vertical-demo leftside_hd"
        background-color="#f1f4fa"
        text-color="#3C3F41"
        active-text-color="black">
        <nav-menu :navMenus="leftMenus" @changeContent="changeMenu"></nav-menu>
      </el-menu>
    </el-aside>
    <el-main >
      <el-card class="box-card score-update"
               :body-style="{ padding: '4px' }">
        <p>
          <el-tooltip class="item" effect="dark" content="更新成绩" placement="top-start">
            <el-button class="score-btn" @click="updateScore">更新成绩</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="更新最新学期成绩" placement="top-start">
            <el-button class="score-btn" @click="updateNewScore">更新最新学期成绩</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="查看最新成绩" placement="top-start">
            <el-button class="score-btn score-btn-last" @click="checkNewScore">查看最新成绩</el-button>
          </el-tooltip>
        </p>
      </el-card>
      <score-detail :scoreData="scoreData" :semester="semester" class="score-detail"></score-detail>
      <div class="lesson_detail">
        <score-table :scoreData="scoreData" :semester="semester" class="score-table"></score-table>
        <div class="credit_sem">
          <credit :credit_sem="credit_sem" :semester="semester" ></credit>
          <credit-all :credit_all="allCredit.credit"></credit-all>
        </div>
      </div>
    </el-main>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span v-if="mes">更新成功</span>
      <span v-else>更新失败</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </el-container>
</template>

<script>
import NavMenu from './navSlide/nav-slide'
import ScoreDetail from './score-detail/score-detail'
import credit from './score-detail/credit-semster'
import CreditAll from './score-detail/credit-all'
import ScoreTable from './score-detail/score-tab'
import { mapGetters } from 'vuex';
import cookie from '../../static/js/cookie';
import { getScores , scoreSemester , getSemester, checkNewScores , updateNewScores ,updateScores} from '../../api/api'

export default{
  data(){
    return{
      mes: false,
      dialogVisible : false,
      credit_sem: 0,
      scoreData: [ ],
      leftMenus:'',
      semester:'2018/3/1 0:00:00',
      allCredit:{
        count:0,
        sem:'',
        data:[ ],
        credit: 0
      }
    }
  },
  components:{
    NavMenu,
    ScoreDetail,
    credit,
    CreditAll,
    ScoreTable
  },
  computed: {
    ...mapGetters({
      goods_list: 'goods_list',
      userInfo:'userInfo'
    })
  },
  methods:{
    scoreSemester(){
      var that = this;
      scoreSemester(
        {
          student_id : cookie.getCookie('username')
        }
      ).then((response)=> {
        console.log(response.data);
        this.leftMenus = response.data
      }).catch(function (error) {
          console.log(error);
        });
      },
    getScore(){
        var total = 0;
      getScores({
        semester:this.semester
      }).then((response)=> {
        this.scoreData = response.data.results
        for(var i=0 ; i <this.scoreData.length ; i++){
            total = total + this.scoreData[i].schedule_lesson.lesson.credit
        }
        this.credit_sem = total
        //console.log("222s"+JSON.stringify(legends))
        //console.log("222s"+JSON.stringify(xAxis.data))
      }).catch(function (error) {
        console.log(error);
      });
    },
    changeMenu (id) {
      this.semester = id; //重新获取
      console.log("se: " + this.semester)
      this.getScore();
    },
    //查看总学分
    getTotalCredit(){
      var all = 0
      getScores({}).then((response)=> {
        this.allCredit.count = response.data.count
        //console.log("all2:" + this.allCredit.count)
        getScores({
          page_size : this.allCredit.count
        }).then((response)=> {
          this.allCredit.data = response.data.results
          //console.log("all111:" + this.allCredit.data.length)
          for(var i=0 ; i < this.allCredit.data.length ; i++){
            all = all + this.allCredit.data[i].schedule_lesson.lesson.credit
          }
          this.allCredit.credit = all
          //console.log("all" + this.allCredit.credit)
        }).catch(function (error) {
          console.log(error);
        });

      }).catch(function (error) {
        console.log(error);
      });

    },
    //查看学期成绩
    checkNewScore(){
      this.mes=false
      checkNewScores().then((response)=> {
        this.mes=true
        console.log(response.data);
        this.scoreData = response.data.results
      }).catch(function (error) {
        console.log(error);
      });
      this.dialogVisible = true;
    },
    //更新当前学期成绩
    updateNewScore(){
      this.mes=false
      updateNewScores().then((response)=> {
        this.mes=true
        console.log(response.data);
      }).catch(function (error) {
        console.log(error);
      });
      this.dialogVisible = true;
    },
    //更新成绩
    updateScore(){
      this.mes=false
      updateScores().then((response)=> {
        this.mes=true
        console.log(response.data);
      }).catch(function (error) {
        console.log(error);
      });
      this.dialogVisible = true;
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }

  },
  created(){
    this.scoreSemester()
    this.getScore()
    this.getTotalCredit()
  }
}
</script>

<style scoped>

  .el-icon-s-grid{
    color: #0063b9;
    font-size: 1.5rem;
    z-index: 3;
    margin-right: .3rem;
  }
  .leftSide_title{
    font-size: 22px;
    margin-left: 10px;
    font-weight: normal;
    display: inline-block;
    padding-right: 2%;
    position: relative;
    z-index: 2;
    color: #0063b9;
  }
  .el-main{
    background: none;
  }
  ul{
    width: 200px;
  }
  .leftSide{
    width: 200px;
    margin: 30px;
  }
  .score-detail{
    margin-top: 15px ;
    margin-right: 60px ;
    border-radius: 10px;
    padding-right: 10px;
  }
  .credit_sem{
    float: left;
    width: 300px;
  }
  .score-table{
    width: 70%;
    float: left;
  }
  .lesson_detail{
    margin-top: 40px;
    margin-bottom: 60px;
  }
  .score-update{
    margin-top: 15px ;
    margin-right: 60px ;
    border-radius: 10px;
    background-color: #fff;
    text-align: right;
    margin-bottom: 20px;

  }
  .score-btn{
    border: none;
    background:none;
    color: #0073ff;

  }
  .score-btn-last{
    margin-right: 70px;
  }
</style>
