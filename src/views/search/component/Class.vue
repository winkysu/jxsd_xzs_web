<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="班级ID">
        <el-input v-model="form.id" style="width: 220px;"></el-input>
      </el-form-item>
      <el-form-item label="年级">
        <el-input v-model="form.grade" style="width: 220px;"></el-input>
      </el-form-item>
      <el-form-item label="学院ID">
        <el-input v-model="form.acd" style="width: 220px;"></el-input>
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
      <div v-for="item in academy"  class="text item">
           {{item.name}}
      </div>
    </el-card>

  </div>

</template>
<script>
  import { getCla } from '../../../api/api'
  export default {
    data() {
      return {
        dialogVisible:false,
        academy:'',
        form: {
          id: '',
          grade: '',  //用户名
          acd:''
        }
      }
    },
    methods: {
      onSubmit() {
        this.dialogVisible = true
        console.log('!'+JSON.stringify(this.form));
        getCla(
          {
            id:this.form.id,
            grade:this.form.grade,
            college_id : this.form.acd
          }
        ).then((response)=> {
          console.log("3333:" + JSON.stringify(response.data));
          //本地存储用户信息
          this.academy = response.data.results
        })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>
