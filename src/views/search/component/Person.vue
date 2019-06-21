<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" label-width="120px" class="sForm">
      <el-form-item label="用户ID(选填):" >
        <el-input v-model="form.id" placeholder="学号（eg:2016267030XX)" style="width: 220px;"></el-input>
      </el-form-item>
      <el-form-item label="用户名(选填)">
        <el-input v-model="form.name" ></el-input>
      </el-form-item>
      <el-form-item label="年级ID(选填):">
        <el-input v-model="form.grade" placeholder="eg:16 / 17 / 18" style="width: 220px;"></el-input>
      </el-form-item>
      <el-form-item label="班级ID(选填)">
        <el-input v-model="form.classes"></el-input>
      </el-form-item>

      <el-form-item label="性别(选填)" >
        <el-select v-model="form.gender" placeholder="男/女">
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="female"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职位(选填)" >
        <el-select v-model="form.type" placeholder="学生/老师">
          <el-option label="学生" value="true"></el-option>
          <el-option label="老师" value="false"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item style="margin-left: 40px" >
        <el-button type="primary" @click="onSubmit">立即搜索</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

    <el-card class="box-card" v-show="dialogVisible">
      <div slot="header" class="clearfix">
        <span>查询结果</span>
      </div>
      <div   class="text item">
        <el-table
          :data="person"
          style="width: 100%">
          <el-table-column
            label="学号"
            width="200">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.username }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            width="200">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="班级"
            width="360">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.student.cla.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="关注状态"
            width="360">
            <template slot-scope="scope">
              <span style="margin-left: 10px">已关注</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

  </div>
</template>

<script>
import { getPerson } from '../../../api/api'
export default {
  data() {
    return {
      dialogVisible:false,
      person:[],
      form: {
        id:'',                  //用户id
        name: '',               //用户名
        region: '',
        grade:'',               //年级
        academy: '',            //学院
        classes: '',            //班级
        gender: '',             //性别
        type: '',               //职位
        resource: '',
      }
    }
  },
  methods: {
    onSubmit() {
      this.dialogVisible = true
      console.log('!'+JSON.stringify(this.form));
      getPerson(
        {
          username:this.form.id,
          name : this.form.name,
          gender : this.form.gender,
          is_student : this.form.type,
          student__cla__grade : this.grade,
          student__cla__id: this.form.class
        }
      ).then((response)=> {
        console.log("3333:" + JSON.stringify(response.data));
        //本地存储用户信息
        this.person = response.data
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
