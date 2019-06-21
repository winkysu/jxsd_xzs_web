<template>
  <div class="Pagination">
    <div class="titlebar">
      <i class="el-icon-s-grid"></i>
      <h4>历史记录</h4>
    </div>
    <div class="container_table">
      <div class="tab">
        <div class="search_time">
          <el-date-picker
            v-model="value"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
          <el-button type="primary" @click="searchTime">查询</el-button>
        </div>
        <div class="search_table">
          <el-input v-model="tableDataName" placeholder="请输入类型" style="width:240px"></el-input>
          <el-button type="primary" @click="doFilter">搜索</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="时间"
            align='center'
            sortable
            :filters="[{text: '2019-05-16', value: '2019-05-16'}, {text: '2019-05-17', value: '2019-05-17'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
            width="120">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.action_time }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="action_type"
            label="类型"
            align='center'
            :filters="[{ text: '查询', value: '查询' }, { text: '增加', value: '增加' }, { text: '删除', value: '删除' }]"
            :filter-method="filterHandler"
            width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.action_type }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="IP地区"
            align='center'
            width="200">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="IP"
            align='center'
            width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.ip }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="记录"
            align='center'>
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.message }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <page class="pagesort" pre-text="上一页" next-text="下一页" end-show="false" :page="curPage" :total-page='totalPage' @pagefn="pagefn"></page>
      </div>
    </div>
  </div>
</template>
<script>
  let startTime;
  let endTime;
  let searchTime;
  import { getLog } from '../../../api/api'
  import page from '../../list/page/page'
  export default {
    name:"list",
    data() {
      return {
        ordering: '-action_time',
        curId:'',
        curPage: 1, // 页码
        results: [],
        count: 0 ,
        tableData:[], //数据
        allTableData:[],
        tableDataName: '',
        filterTableDataEnd:'',
        page_size: 5,
        value: ''
      }
    },
    components: {
      page
    },
    computed: {
      totalPage(){
        console.log(this.count/5)
        return  Math.ceil(this.count/5)
      }
    },
    methods: {
      getInfoList() {
        getLog({
          params: {
            page: this.curPage, //当前页码
            schedule_lesson_id: this.curId,
            page_size: 5,
            ordering: this.ordering,
          }
        }).then((response) => {
          this.count = response.data.count
          this.tableData = response.data.results
          getLog({
            params: {
              schedule_lesson_id: this.curId,
              page_size: this.count,
              ordering: this.ordering,
            }
          }).then((response) => {
            this.allTableData = response.data.results
          })
            .catch(function (error) {
              console.log(error);
            });
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      //点击分页
      pagefn(value){
        this.curPage = value.page;
        this.getInfoList(this.curId)
      },
      //搜索
      doFilter() {
        if (this.tableDataName == "") {
          this.$message.warning("查询条件不能为空！");
          return;
        }
        this.tableData = []
        //每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd = []
        this.allTableData.forEach((value, index) => {
          if (value.message) {
            if (value.message.indexOf(this.tableDataName) >= 0) {
              this.filterTableDataEnd.push(value)
            }
          }
        });
        //页面数据改变重新统计数据数量和当前页
        this.curPage = 1
        this.count = this.filterTableDataEnd.length
        //渲染表格,根据值
        this.currentChangePage(this.filterTableDataEnd)
        //页面初始化数据需要判断是否检索过
        this.flag = true
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        //需要判断是否检索
        if (!this.flag) {
          this.currentChangePage(this.tableDataEnd)
        } else {
          this.currentChangePage(this.filterTableDataEnd)
        }
      },
      //组件自带监控当前页码
      currentChangePage(list) {
        let from = (this.curPage - 1) * this.page_size;
        let to = this.curPage * this.page_size;
        this.tableData = [];
        for (; from < to; from++) {
          if (list[from]) {
            this.tableData.push(list[from]);
          }
        }
        console.log('222' +  this.tableData)
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      //筛选时间
      getTimeStamp(val){
        var getTimes=new Date(val),
          getTimes=getTimes.getTime()/1000;
        return getTimes;
      },
      searchTime(){
        var wareId=$('#purchaseSearch').val();
        startTime=this.getTimeStamp(this.value[0]);　　//获取开始时间戳
        console.log("start:"+startTime)
        endTime=this.getTimeStamp(this.value[1]);　　　 //获取结束时间戳
        console.log("end:"+endTime)
        this.searchTimeFun(startTime,endTime);
      },
      searchTimeFun(startTime,endTime){
        this.tableData = []
        //每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd=[]
        this.allTableData.forEach((value, index) => {
          searchTime = this.getTimeStamp(value.action_time)
          console.log("44: " + searchTime)
          if(startTime <= searchTime && searchTime <= endTime){
            console.log("44444:"+endTime)
            this.filterTableDataEnd.push(value)
          }
        });
        //页面数据改变重新统计数据数量和当前页
        this.currentPage=1
        this.total=this.filterTableDataEnd.length
        //渲染表格,根据值
        this.currentChangePage(this.filterTableDataEnd)
        //页面初始化数据需要判断是否检索过
        this.flag=true
      },
    },
    created(){
      this.getInfoList()
    },
    watch: {
      "$route": "getInfoList"
    }
  }
</script>

<style scoped>

  .Pagination{
    width: 70%;
    height:100%;
    margin:20px auto 80px;
    padding: 20px;
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
    font-size: 1.5rem;
    z-index: 3;
    background-color: #fff;
    margin-right: .7rem;
  }
  .titlebar h4 {
    font-size: 1.5rem;
    margin: 0;
    font-weight: normal;
    display: inline-block;
    padding-right: 2%;
    position: relative;
    z-index: 2;
    background-color: #fff;
    color: #0063b9;
  }
  .container_table{
    height: 500px;
    padding-top: 10px;
    font-size: 16px;
  }
  .tab{
    position: relative;
  }
  .search_time{
    float: left;
  }
  .search_table{
    margin-left: 70%;
    margin-bottom: 10px;
  }
  .list {
    margin: 20px;
  }
  .page {
    float: right;
    display: inline-block;
    margin-top: 20px;
  }
</style>
