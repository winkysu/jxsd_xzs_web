<template>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>关系查询</span>
        </div>
        <div class="text item">
          <find-rel></find-rel>
        </div>
      </el-card>
    </div>
</template>

<script type="text/ecmascript-6">
  import FindRel from './components/find-rel'
    export default {
      props: [],
      components: {
        FindRel
      }
    }
</script>
<style scoped>
  .box-card{
    width: 80%;
    margin: 40px auto;
    border-radius: 15px;
  }
</style>
