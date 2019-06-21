<template>
  <div class="text item">
    <el-tabs v-model="activeName" class="card"  type="border-card" @tab-click="handleClick">
      <el-tab-pane label="搜索人物" name="first">
        <person> </person>
      </el-tab-pane>
      <el-tab-pane label="搜索学院" name="second">
        <academy> </academy>
      </el-tab-pane>
      <el-tab-pane label="搜索班级" name="third">
        <classes></classes>
      </el-tab-pane>
      <el-tab-pane label="搜索部门" name="fourth">
        <dec></dec>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import person from './component/Person'
import academy from './component/Academy'
import classes from './component/Class'
import Dec from './component/Department'

  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    components:{
      person,
      academy,
      classes,
      Dec
    }
  };
</script>
<style scoped>
  .box-card{
    width: 80%;
    margin: 40px auto;
    border-radius: 15px;
  }
  .card{
    width: 80% ;
    margin: 40px auto;
    border-radius: 15px;
  }
</style>
