<template>
  <div>
    <el-form ref="form"  :model="form" label-width="80px" class="sForm">
      <el-form-item label="部门ID">
        <el-input v-model="form.id" style="width: 220px;"></el-input>
      </el-form-item>
      <el-form-item label="部门名称">
        <el-input v-model="form.name" style="width: 220px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即搜索</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

    <el-card class="box-card" v-show="dialogVisible">
      <div slot="header" class="clearfix">
        <span>查询结果</span>
      </div>
      <div v-for="item in academy" :key="item" class="text item">
        {{item.id }}    {{item.name}}
      </div>
    </el-card>

  </div>
</template>

<script>
import { getDep } from '../../../api/api'
export default {
  data() {
    return {
      dialogVisible:false,
      academy:'',
      form: {
        id: '',
        name: '',  //用户名
      }
    }
  },
  methods: {
    onSubmit() {
      this.dialogVisible = true
      console.log('!'+JSON.stringify(this.form));
      getDep(
        {
          id:this.form.id,
          name : this.form.name,
        }
      ).then((response)=> {
        console.log("3333:" + JSON.stringify(response.data));
        //本地存储用户信息
        this.academy = response.data
      })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  }
</script>
<style scoped>
  .sForm{
    width: 70%;
    margin-top: 20px;
  }
</style>
