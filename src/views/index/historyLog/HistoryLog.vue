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
          :default-sort = "{prop: 'date', order: 'ascending'}"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            align='center'
            width="70">
            <template slot-scope="scope">
              <span>{{ paginations.page_size * (page -1) + 1 + scope.$index  }}</span>
            </template>
          </el-table-column>
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
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paginations.page_index"
          :page-sizes="paginations.page_sizes"
          :page-size="paginations.page_size"
          :layout="paginations.layout"
          :total="paginations.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import { getLog } from '../../../api/api'
  export default {
    name:"list",
    data() {
      return {
        tableData:[], //数据
        paginations:{
          page_index:1, //当前页
          total:0, //总数
          page_size:5, //一页显示多少
          page_sizes:[5,10,15,20], //每页显示多少条
          layout:'total, sizes, prev, pager, next, jumper'
        },
        allTableData:[],
        tableDataName:'',
        filterTableDataEnd: [],
        page:1,
        indexPage:1,
        value: ''
      }
    },
    methods: {
      getInfoList() {
          getLog({
            params:{ page: this.page}
          }).then((response)=> {
            this.paginations.total = response.data.count; //数据的数量
            this.allTableData = response.data.results
            this.setPaginations()
          })
            .catch(function (error) {
              console.log("cur:" + this.cur)
              console.log(error);
            });
      },

      setPaginations(){
        //向前 1 / 5 / 9
        this.paginations.page_index = 4 * this.page - 3
        this.paginations.page_size = 5; //每页显示多少数据

        //显示数据
        this.tableData = this.allTableData.filter((item,index) => {
            //console.log("123:index" + index)
          return index < this.paginations.page_size;
        })
      },

      handleSizeChange(page_size) {
        this.paginations.page_index = 1; //第一页
        this.paginations.page_size = page_size; //每页先显示多少数据
        this.tableData = this.allTableData.filter((item,index) => {
          return index < page_size
        })
      },

      handleCurrentChange(page){
          var index = 0
          var indexs = [0 , 5 , 10 ,15]
          //this.indexPage = page

        // 向前跳转页数
        if(page==1 || page%5==0){
          //this.indexPage = page
          console.log("indexpage:"+this.page)
          this.$route.query.page = parseInt(page/5)+1
          this.page = this.$route.query.page
          console.log("22page:"+this.page)
        }
        //获取当前页第一条数据
        if(page %4 == 0){
          this.$route.query.page = parseInt(page/4)
          this.page = this.$route.query.page
          index = indexs[3]
        }else {
            index = indexs[page%4-1]
        }
        //let index = this.paginations.page_size * (page -1);
        console.log("当前数据条:"+index)
        //获取总数
        //let allData = this.paginations.page_size * page;
        console.log("当前数据条:"+this.paginations.page_size)

        let tablist=[];
        for(let i = index;i<index+5;i++) {
          if (this.allTableData[i]) {
            tablist.push(this.allTableData[i])
          }
          this.tableData = tablist
        }
      },

      //搜索
      doFilter() {
        if (this.tableDataName == "") {
          this.$message.warning("查询条件不能为空！");
          return;
        }
        this.tableData = []
        //每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd=[]
        this.allTableData.forEach((value, index) => {
          if(value.message){
              console.log('222'+value.message)
            console.log('222'+typeof value.message)
            if(value.message.indexOf(this.tableDataName)>=0){
              this.filterTableDataEnd.push(value)
            }
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
      currentChangePage(list) {
        let from = (this.currentPage - 1) * this.paginations.page_size;
        let to = this.currentPage * this.paginations.page_size;
        console.log("0000" + this.pagesize )
        console.log("0000" +to )
        this.tableData = [];
        for (; from < to; from++) {
          console.log("11111")
          if (list[from]) {
            this.tableData.push(list[from]);
          }
        }
      },
      //筛选时间
      getTimeStamp(val){
        var getTimes=new Date(val),
          getTimes=getTimes.getTime()/1000;
        return getTimes;
      },

      searchTime(){
        var wareId=$('#purchaseSearch').val();
        var startTime=this.getTimeStamp(this.value[0]);　　//获取开始时间戳
        console.log("start:"+startTime)
        var endTime=this.getTimeStamp(this.value[1]);　　　 //获取结束时间戳
        console.log("end:"+endTime)
        this.searchTimeFun(startTime,endTime);
      },
      // 时间段查询采购部门
      searchTimeFun(startTime,endTime){     //wareId采购部门ID,wareIdStr采购部门字段,startTime查询开始时间,endTime开始结束时间,makeTimeStr匹配的时间字段
        this.tableData = []
        //每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd=[]
        this.allTableData.forEach((value, index) => {
            var searchTime = this.getTimeStamp(value.action_time)
          if(searchTime){
            if(startTime < searchTime && searchTime < endTime){
              this.filterTableDataEnd.push(value)
            }
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
      //
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
  },
    created(){
      this.getInfoList()
    },
    watch: {
      // 监听路由变化，随时获取新的列表信息
      page(val, oldVal){//普通的watch监听
        this.getInfoList()
        console.log("pages22: "+val, oldVal);
      },
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

  /*
  .titlebar::after {
    content: '';
    background-color: #d8d8d8;
    width: 100%;
    height: 1px;
    position: absolute;
    top: 55%;
    left: 0;
  }
  */
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
