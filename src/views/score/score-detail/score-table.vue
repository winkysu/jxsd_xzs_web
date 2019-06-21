<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>成绩数据</span>
      </div>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%">
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
            prop="schedule_lesson.lesson.name">
          </el-table-column>
          <el-table-column
            label="成绩"
            prop="score">
          </el-table-column>
          <el-table-column
            label="标准分"
            prop="standard_score">
          </el-table-column>
          <el-table-column
            label="学分"
            prop="schedule_lesson.lesson.credit">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <Page class="pagesort" pre-text="上一页" next-text="下一页" end-show="false"
              :page="curPage" :total-page='totalPage' @pagefn="pagefn">

        </Page>
        <el-dialog title="课程详情" :visible.sync="dialogTableVisible">
          <el-table :data="gridData">
            <el-table-column property="date" label="日期" width="150"></el-table-column>
            <el-table-column property="name" label="姓名" width="200"></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column>
          </el-table>
        </el-dialog>
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

      },
    },
    created () {
      this.getScore ();
    }
  }
</script>
<style>
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




            <template slot-scope="scope">
              <el-dialog title="课程详情" :visible.sync="dialogTableVisible">
                 <div class="lesson_info">
                   <p>课程ID: <span>{{scope.row.schedule_lesson.lesson.id}}</span></p>
                   <p>课程名: <span>{{scope.row.schedule_lesson.lesson.name}}</span></p>
                   <p>课程学分: <span>{{scope.row.schedule_lesson.lesson.credit}}</span></p>
                   <p>任课老师: <span>{{scope.row.schedule_lesson.teacher.name}}</span></p>
                   <p>先导课程: <span>{{scope.row.schedule_lesson.lesson.before_learning_text}}</span></p>
                   <p>课程介绍: <span>{{scope.row.schedule_lesson.lesson.profile}}</span></p>
                 </div>
              </el-dialog>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">详情
              </el-button>
            </template>



                          <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
                            <div class="lesson_info">
                              <p>课程ID: <span>{{this.content.schedule_lesson.lesson.id}}</span></p>
                              <p>课程名: <span>{{this.content.schedule_lesson.lesson.name}}</span></p>
                              <p>课程学分: <span>{{this.content.schedule_lesson.lesson.credit}}</span></p>
                              <p>任课老师: <span>{{this.content.schedule_lesson.teacher.name}}</span></p>
                              <p>先导课程: <span>{{this.content.schedule_lesson.lesson.before_learning_text}}</span></p>
                              <p>课程介绍: <span>{{this.content.schedule_lesson.lesson.profile}}</span></p>
                          </div>
                          </el-dialog>

