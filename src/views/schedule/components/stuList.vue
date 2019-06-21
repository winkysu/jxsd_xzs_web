<template>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>课程列表</span>
        </div>
        <div>
          <el-table
            :data="results"
            style="width: 100%">
            <el-table-column
              label="课程ID"
              width="110">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.schedule_lesson.id }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="课程名"
              width="360">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.schedule_lesson.lesson.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini"  @click="showList(scope.row.schedule_lesson.id)">学生名单</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-dialog title="学生名单" :visible.sync="dialogTableVisible">
        <el-table
          :data="students"
          border
          style="width: 100%"
          row-class-name="elTable">
          <el-table-column
            label="学生ID"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.student.id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.student.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="所属班级"
            width="390">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.student.cla.name }}</span>
            </template>
          </el-table-column>
        </el-table>
        <page class="pagesort" pre-text="上一页" next-text="下一页" end-show="false" :page="curPage" :total-page='totalPage' @pagefn="pagefn"></page>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import {  StudentList } from '../../../api/api'
import modal from '../../common/MessageBox'
import page from '../../list/page/page'
export default {
  data(){
      return{
        curId:'',
        curPage: 1, // 页码
        results: [],
        count: 0 ,
        students: '',
        isModalVisible: false,
        dialogTableVisible: false
      }
  },
  props: {
    stuList: {
      default: function() {
        return [];
      }
    }
  },
  components: {
    modal,
    page
  },
  watch: {
  'stuList': {
    handler (newVal) {
      this.results= []
      this.stuList = newVal
      var arr = [];    //arr里面存放用来判断是否一样的name的值
      for(var i=0; i<this.stuList.length; i++) {
        if (arr.indexOf(this.stuList[i].schedule_lesson.lesson.name) == -1) {    //  -1代表没有找到
          arr.push(this.stuList[i].schedule_lesson.lesson.name);   //如果没有找到就把这个name放到arr里面，以便下次循环时用
          this.results.push(this.stuList[i]);
        }
      }
    },
    deep: true,
    immediate: true,
  },
  'students':{
    handler (newVal) {
      this.students = newVal
    }
  },
  "$route": "showList"

  },
  computed: {
    totalPage(){
      console.log(this.count/10)
      return  Math.ceil(this.count/10)
    }
  },
  methods:{
      //查看名单
    showList(id){
      this.curId = id
      console.log("3226" + id);
      StudentList({
        page: this.curPage, //当前页码
        schedule_lesson_id: this.curId,
        page_size: 10
      }).then((response)=> {
        console.log("sc:"+JSON.stringify(response.data.results))
        this.count = response.data.count
        this.students = response.data.results
      }).catch(function (error) {
        console.log(error);
      });
      this.showModal();
    },
      //弹框
    closeModal(){
        this.dialogTableVisible = false
    },
    showModal(){
      this.dialogTableVisible = true
    },
    pagefn(value){//点击分页
      this.curPage = value.page;
      this.showList(this.curId)
    }
  },
  created(){
  }
}
</script>
<style scoped>
  .pagesort{
    display: inline-block;
    text-align: right;
    width: 90%;
    margin-left: 20px;
  }
  .elTable td , .elTable th{
    height: 15px;
    padding: 2px 0;
  }
  .cell{max-height: 30px !important;overflow: auto !important;}

</style>
<style>
</style>
