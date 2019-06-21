<template>
  <el-container>
    <el-aside class="leftSide" style="width: 200px; overflow: hidden">
      <div class="leftSide_title">
        <i class="el-icon-s-grid"></i>
        <span>学期列表</span>
      </div>
      <!--左侧菜单组件-->
      <el-menu
        default-active="0"
        class="el-menu-vertical-demo leftside_hd"
        background-color="#f1f4fa"
        text-color="#3C3F41"
        active-text-color="black">
        <nav-menu :navMenus="leftMenus" @changeContent="changeMenu"></nav-menu>
      </el-menu>
    </el-aside>
    <el-main class="schedule-List">
      <course-tables :ScheduleList="ScheduleList" class="schedule-Detail"></course-tables>
      <list  :stuList="results"></list>
    </el-main>
 </el-container>
</template>

<script>
import { mapGetters } from 'vuex';
import cookie from '../../static/js/cookie';
import {  scedculeSemester , getSchedule } from '../../api/api'
import NavMenu from '../score/navSlide/nav-slide'
import CourseTables from './components/TimeTable'
import List from './components/stuList'

export default {
  data() {
      return{
        results:[ ],
        ScheduleList:[ ],
        tablelist1:[ ],
        tablelist2:[ ],
        tablelist3:[ ],
        tablelist4:[ ],
        tablelist5:[ ],
        tablelist6:[ ],
        tablelist7:[ ],
        leftMenus:'',
        semester:'2019/3/1 0:00:00',
        stuList:''
      }
  },
  components:{
    NavMenu,
    CourseTables,
    List
  },
  computed: {
   ...mapGetters({
      goods_list: 'goods_list',
      userInfo: 'userInfo'
    })
  },
  methods:{
    scedculeSemester(){
      var that = this;
      scedculeSemester(
        {
          student_id : cookie.getCookie('username')
        }
      ).then((response)=> {
        console.log(response.data);
        //本地存储用户信息
        this.leftMenus = response.data
      })
        .catch(function (error) {
          console.log(error);
        });
    },
    getSchedule(){
      getSchedule(
        {
          student_id : cookie.getCookie('username'),
          semester: this.semester
        }
      ).then((response)=> {
        this.results = response.data.results
        this.stuList = this.results
        this.getTableList()

      })
        .catch(function (error) {
          console.log(error);
        });
    },
    getTableList(){
      this.tablelist1 = [ ]
      this.tablelist2 = [ ]
      this.tablelist3 = [ ]
      this.tablelist4 = [ ]
      this.tablelist5 = [ ]
      this.tablelist6 = [ ]
      this.tablelist7 = [ ]
      this.ScheduleList=[ ]
      var arr = [];
      this.results.forEach((value , index)=>{
        if(value.counter == 1){
          if(value.schedule_lesson.lesson.name){
            this.tablelist1[0]=(value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist1,0,'')
          }
        }else
        if(value.counter == 8){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist1,1,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist1,1,'')
          }
        }else
        if(value.counter == 15){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist1,2,value.schedule_lesson.lesson.name)
            console.log("4" + this.tablelist1)
          }else {
            this.$set(this.tablelist1,2,'')
            console.log("4" + this.tablelist1)
          }
        }else
        if(value.counter == 22){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist1,3,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist1,3,'')
          }
        }else
        if(value.counter == 29){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist1,4,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist1,4,'')
          }
        }else
        if(value.counter == 36){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist1,5,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist1,5,'')
          }
        }else
        if(value.counter == 43){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist1,6,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist1,6,'')
          }
        }
        //arr1.push(c)
        if(value.counter == 2){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist2,0,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist2,0,'')
          }
        }else
        if(value.counter == 9){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist2,1,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist2,1,'')
          }
        }else
        if(value.counter == 16){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist2,2,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist2,2,'')
          }
        }else
        if(value.counter == 23){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist2,3,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist2,3,'')
          }
        }else
        if(value.counter == 30){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist2,4,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist2,4,'')
          }
        }else
        if(value.counter == 37){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist2,5,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist2,5,'')
          }
        }else
        if(value.counter == 44){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist2,6,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist2,6,'')
          }
        }


        if(value.counter == 3){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist3,0,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist3,0,'')
          }
        }else
        if(value.counter == 10){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist3,1,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist3,1,'')
          }
        }else
        if(value.counter == 17){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist3,2,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist3,2,'')
          }
        }else
        if(value.counter == 24){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist3,3,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist3,3,'')
          }
        }else
        if(value.counter == 31){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist3,4,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist3,4,'')
          }
        }else
        if(value.counter == 38){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist3,5,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist3,5,'')
          }
        }else
        if(value.counter == 45){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist3,6,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist3,6,'')
          }
        }





        if(value.counter == 4){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist4,0,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist4,0,'')
          }
        }else
        if(value.counter == 11){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist4,1,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist4,1,'')
          }
        }else
        if(value.counter == 18){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist4,2,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist4,2,'')
          }
        }else
        if(value.counter == 25){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist4,3,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist4,3,'')
          }
        }else
        if(value.counter == 32){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist4,4,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist4,4,'')
          }
        }else
        if(value.counter == 39){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist4,5,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist4,5,'')
          }
        }else
        if(value.counter == 46){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist4,6,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist4,6,'')
          }
        }



        if(value.counter == 5){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist5,0,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist5,0,'')
          }
        }else
        if(value.counter == 12){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist5,1,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist5,1,'')
          }
        }else
        if(value.counter == 19){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist5,2,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist5,2,'')
          }
        }else
        if(value.counter == 26){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist5,3,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist5,3,'')
          }
        }else
        if(value.counter == 33){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist5,4,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist5,4,'')
          }
        }else
        if(value.counter == 40){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist5,5,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist5,5,'')
          }
        }else
        if(value.counter == 47){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist5,6,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist5,6,'')
          }
        }




        if(value.counter == 6){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist6,0,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist6,0,'')
          }
        }else
        if(value.counter == 13){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist6,1,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist6,1,'')
          }
        }else
        if(value.counter == 20){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist6,2,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist6,2,'')
          }
        }else
        if(value.counter == 27){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist6,3,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist6,3,'')
          }
        }else
        if(value.counter == 34){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist6,4,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist6,4,'')
          }
        }else
        if(value.counter == 41){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist6,5,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist6,5,'')
          }
        }else
        if(value.counter == 48){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist6,6,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist6,6,'')
          }
        }


        if(value.counter == 7){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist7,0,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist7,0,'')
          }
        }else
        if(value.counter == 14){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist7,1,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist7,1,'')
          }
        }else
        if(value.counter == 21){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist7,2,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist7,2,'')
          }
        }else
        if(value.counter == 28){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist7,3,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist7,3,'')
          }
        }else
        if(value.counter == 35){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist7,4,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist7,4,'')
          }
        }else
        if(value.counter == 42){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist7,5,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist7,5,'')
          }
        }else
        if(value.counter == 49){
          if(value.schedule_lesson.lesson.name){
            this.$set(this.tablelist7,6,value.schedule_lesson.lesson.name)
          }else {
            this.$set(this.tablelist7,6,'')
          }
        }
      })
      for(var i =0 ; i <7 ; i++ ){
        if(!this.tablelist1[i]){
          this.tablelist1[i] = ''
        }
        if(!this.tablelist2[i]){
          this.tablelist2[i] = ''
        }
        if(!this.tablelist3[i]){
          this.tablelist3[i] = ''
        }
        if(!this.tablelist4[i]){
          this.tablelist4[i] = ''
        }
        if(!this.tablelist5[i]){
          this.tablelist5[i] = ''
        }
        if(!this.tablelist6[i]){
          this.tablelist6[i] = ''
        }
        if(!this.tablelist7[i]){
          this.tablelist7[i] = ''
        }
      }
      this.ScheduleList.push(this.tablelist1)
      this.ScheduleList.push(this.tablelist2)
      this.ScheduleList.push(this.tablelist3)
      this.ScheduleList.push(this.tablelist4)
      this.ScheduleList.push(this.tablelist5)
      this.ScheduleList.push(this.tablelist6)
      this.ScheduleList.push(this.tablelist7)
    },
    changeMenu (id) {
      this.semester = id; //重新获取
      console.log("se: " + this.semester)
      this.getSchedule();
    },
  },
  created(){
    this.scedculeSemester()
    this.getSchedule()
  }
}
</script>
<style scoped>
  .container{
    margin: 30px auto;
  }
  .el-icon-s-grid{
    color: #0063b9;
    font-size: 1.5rem;
    z-index: 3;
    margin-right: .3rem;
  }
  .leftSide_title{
    font-size: 22px;
    margin-left: 10px;
    font-weight: normal;
    display: inline-block;
    padding-right: 2%;
    position: relative;
    z-index: 2;
    color: #0063b9;
  }
  ul{
    width: 200px;
  }
  .leftSide{
    width: 200px;
    margin: 30px;
  }
  .schedule-List{
    margin-right: 100px;
    border-radius: 10px;
    padding-right: 10px;
  }
  .schedule-Detail{

  }
</style>
