<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card_title">所获总学分</span>
      </div>
      <div class="num">
        {{this.credit_all}}
      </div>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      credit_all: {
        default: function () {
          return [];
        },
      },
    },
    watch: {
      'credit_all': {
        handler (newVal) {
          console.log("cre" + this.credit_sem)
          this.credit_all = newVal

        }
      }
    }
  }
</script>
<style scoped>
  .card_title{
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 4px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    margin-left: 15px;
    margin-top: 15px;
    width: 300px;
    height: 200px;
    border-radius: 15px;
  }
  .num{
    color: #0073ff;
    font-size: 52px;
    height: 90px;
    line-height: 90px;
    text-align: center;
  }
</style>
