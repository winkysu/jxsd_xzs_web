<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card_title">成绩数据</span>
      </div>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
          size="mini">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="课程名称">
                  <span>{{ props.row.schedule_lesson.lesson.name }}</span>
                </el-form-item>
                <el-form-item label="清华等级">
                  <span>{{ props.row.qinghua_data.grade }}</span>
                </el-form-item>
                <el-form-item label="清华绩点">
                  <span>{{ props.row.qinghua_data.grade_point }}</span>
                </el-form-item>
                <el-form-item label="清华评定">
                  <span>{{ props.row.qinghua_data.evaluation }}</span>
                </el-form-item>
                <el-form-item label="清华分数">
                  <span>{{ props.row.qinghua_data.credit_score }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="课程名"
            prop="schedule_lesson.lesson.name"
            width="240">
          </el-table-column>
          <el-table-column
            label="成绩"
            prop="score"
            align="center"
            width="60">
          </el-table-column>
          <el-table-column
            label="补考"
            prop="rescore"
            align="center"
            width="60">
          </el-table-column>
          <el-table-column
            label="标准分"
            prop="standard_score"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            label="学分"
            prop="schedule_lesson.lesson.credit"
            align="center"
            width="60">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="课程详情" :visible.sync="dialogTableVisible">
          <div class="lesson_info">
            <p>课程ID: <span>{{this.contain.id}}</span></p>
            <p>课程名: <span>{{this.contain.name}}</span></p>
            <p>课程学分: <span>{{this.contain.credit}}</span></p>
            <p>任课老师: <span>{{this.tec.name}}</span></p>
            <p>先导课程: <span>{{this.contain.before_learning_text}}</span></p>
            <p>课程介绍: <span>{{this.contain.profile}}</span></p>
          </div>
        </el-dialog>

        <Page class="pagesort" pre-text="上一页" next-text="下一页" end-show="false"
              :page="curPage" :total-page='totalPage' @pagefn="pagefn">
        </Page>
      </div>
    </el-card>
  </div>
</template>

<script>
  import cookie from '../../../static/js/cookie';
  import { getScores } from '../../../api/api'
  import page from '../../list/page/page'
  export default {
    data() {
      return {
        contain : '',
        tec:'',
        dialogTableVisible: false,
        curPage: 1, // 页码
        tableData: [ ],
        count : 0 ,
      }
    },
    props: {
      scoreData: {
        type: Array,
        default: function () {
          return [];
        },
      },
      semester: {
        default: function () {
          return [];
        },
      },
    },
    components:{
      'Page': page,
    },
    computed: {
      totalPage(){
        console.log(this.count/5)
        return  Math.ceil(this.count/5)
      }
    },
    watch: {
      'tableData': {
        handler (newVal) {
          this.tableData = newVal
        },
        deep: true,
        immediate: true,
      },
      'semester':{
        handler (newVal) {
          this.semester = newVal
          this.getScore ();

        }
      },
      "$route": "getScore"
    },
    methods: {
      getScore(){
        getScores({
          semester:this.semester,
          page: this.curPage, //当前页码
          page_size: 5
        }).then((response)=> {
          this.tableData = response.data.results
          this.count = response.data.count
        }).catch(function (error) {
          console.log(error);
        });
      },
      pagefn(value){//点击分页
        this.curPage = value.page;
        this.getScore()
      },
      handleEdit(index, row) {
        this.contain = row.schedule_lesson.lesson
        this.tec = row.schedule_lesson.teacher
        this.dialogTableVisible = true
        console.log(index, this.row);
      },
    },
    created () {
      this.getScore ();
    }
  }
</script>
<style scoped>
  .card_title{
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 4px;
  }
  .box-card{
    height: 420px;
    width: 800px;
    border-radius: 15px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
