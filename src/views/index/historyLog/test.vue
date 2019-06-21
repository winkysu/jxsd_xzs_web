<template>
  <div class="Pagination">
    <div class="titlebar">
      <i class="el-icon-s-grid"></i>
      <h4>历史记录</h4>
    </div>
    <div class="container_table">
      <div class="tab">
        <div class="search_table">
          <el-input v-model="tableDataName" placeholder="请输入类型" style="width:240px"></el-input>
          <el-button type="primary" @click="doFilter">搜索</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            align='center'
            sortable
            width="70">
          </el-table-column>
          <el-table-column
            label="时间"
            align='center'
            width="120">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.action_time }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="action_type"
            label="类型"
            align='center'
            width="80">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.action_type }}</span>
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
        filterTableDataEnd: []
      }
    },
    methods: {
      featchData(){

      },
      getInfoList() {
        getLog({
          params:{ }
        }).then((response)=> {
          console.log("2222"+JSON.stringify(response.data.results))
        this.allTableData = response.data.results
        this.setPaginations()

      })
      .catch(function (error) {
          console.log(error);
        });
      },
      setPaginations(){
        this.paginations.total = this.allTableData.length; //数据的数量
        this.paginations.page_index = 1; //默认显示第一页
        this.paginations.page_size = 5; //每页显示多少数据

        //显示数据
        this.tableData = this.allTableData.filter((item,index) => {
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
        // 跳转页数
        //获取当前页
        let index = this.paginations.page_size * (page -1);
        //获取总数
        let allData = this.paginations.page_size * page;

        let tablist=[];
        for(let i = index;i<allData;i++) {
          if (this.allTableData[i]) {
            tablist.push(this.allTableData[i])
          }
          this.tableData = tablist
        }
      },
      doFilter() {
        if (this.tableDataName == "") {
          this.$message.warning("查询条件不能为空！");
          return;
        }
        this.tableData = []
        //每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd=[]
        this.allTableData.forEach((value, index) => {
          if(value.action_type){
          console.log('222'+value.action_type)
          console.log('222'+typeof value.action_type)
          if(value.action_type.indexOf(this.tableDataName)>=0){
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
    },

    created(){
      this.getInfoList()
    }
  }
</script>

<style scoped>

  .Pagination{
    width: 70%;
    height:100%;
    margin:20px auto 40px;
    padding: 20px;
    background-color: #fff;
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
    padding-top: 10px;
    font-size: 16px;
  }
  .tab{
    position: relative;
  }
  .search_table{
    padding-left: 70%;
    margin-bottom: 10px;
  }
  .list {
    margin: 20px;
  }
  .page {
    float: right;
    margin-top: 20px;
  }
</style>
