<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>课程信息</span>
      </div>
      <div>
        <div id="coursesTable" class="coursesTable"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import cookie from '../../../static/js/cookie';
import {  scedculeSemester , getSchedule } from '../../../api/api'
import $ from 'jquery'
import Timetables from 'timetables';
import './style.css'
  let Timetable;
  var courseList = []
  var highlightWeek = new Date().getDay();
  var week = window.innerWidth > 360 ? ['周一', '周二', '周三', '周四', '周五','周六', '周日'] :
    ['一', '二', '三', '四', '五', '六', '日']
  var day = new Date().getDay()
  var courseType = [
    [{index: '1', name: '8:00'}, 1],
    [{index: '2', name: '9:40'}, 1],
    [{index: '3', name: '10:30'}, 1],
    [{index: '4', name: '11:20'}, 1],
    [{index: '5', name: '14:00'}, 1],
    [{index: '6', name: '15:40'}, 1],
    [{index: '7', name: '19:00'}, 1]
  ]

  export default {
    name: 'Timetable',
    data() {
      return{
        results:[ ],
      }
    },
    computed: {
      ...mapGetters({
        goods_list: 'goods_list',
        userInfo: 'userInfo'
      })
    },
    props: {
      ScheduleList: {
        type: Array,
        default: function() {
          return [];
        }
      }
    },
    mounted () {
        setTimeout(()=>{
          this.handleTable()
        } , 1000)
    },
    methods:{

      handleTable(){
         Timetable = new Timetables({
          el: '#coursesTable',
          timetables: this.ScheduleList,
          week: week,
          timetableType: courseType,
          highlightWeek: highlightWeek,
          styles: {
            leftHandWidth: 35,
            Gheight: 85
          },
          /* gridOnClick: function (e) {
             if (e.name !== '') {
                 var txt = e.name + '  ' + '第' + e.index + '节课, 课长' + e.length + '节'
               //$('#co_mes').html(e.name + '  ' + ' <br> '+ '第' + e.index + '节课, 课长' + e.length + '节')
             }
              alert(txt)
           },*/
         })
      }
    },
    watch: {
      'ScheduleList': {
        handler (newVal) {
          this.ScheduleList = newVal
          Timetable.setOption({
            timetables: this.ScheduleList,
            week: week,
            timetableType: courseType,
            highlightWeek: highlightWeek,
            styles: {
              leftHandWidth: 35,
              Gheight: 85
            },
            gridOnClick: function (e) {

            }
          })
        },
        deep: true,
        immediate: true,
      }
    },
    created(){

    }
  }
</script>

<style scoped>
  .box-card{
    border-radius: 15px;
  }
  .container{
    margin: 10px auto;
  }
  .titlebar h4 {
    font-size: 1.7rem;
    margin: 0;
    font-weight: normal;
    display: inline-block;
    padding-right: 2%;
    position: relative;
    z-index: -1;
    background-color: #fff;
    color: #0063b9;
  }
  .coursesTable{
    width: 70%;
    margin: 10px auto;
    z-index: 1;
  }

</style>
