<template>
  <el-card class="box-card contain">
    <div slot="header" class="clearfix">
      <span class="card_title">成绩图表</span>
      <el-button style="float: right; padding: 3px 70px 3px 15px; color: #0073ff" type="text"  @click="changeB">专业课</el-button>
      <el-button style="float: right; padding: 3px 0; color: #0073ff" type="text "  @click="changeA">所有课程</el-button>
    </div>
    <div>
      <div id="chartmainline" class="chartmainline"  v-show="this.subject"></div>
      <div id="majorLine" style="width:100%; height:300px;" v-show="this.major"> </div>
    </div>
  </el-card>
</template>

<script >
  import echarts from 'echarts'
  //import ScoreChart from './components/ScoreChart'
  import  bus from '../../../static/js/eventBus'
  import { mapGetters } from 'vuex';
  import cookie from '../../../static/js/cookie';
  import { getScores } from '../../../api/api'
  let chartmainline
  export default {
    data () {
      return {
        post_vode: '',
        majorData: '',
        xdata: [],
        subject: true,
        major: false,
        Semester:'2018/3/1 0:00:00'
      }
    },
    components: {
      //ScoreChart
    },
    props: {
      scoreData: {
        type: Array,
        default: function () {
          return [];
        },
      },
    },
    mounted (){
      //this.handleChart()
      setTimeout(() => {
        this.drawLine();
      }, 10),
      bus.$on('changeContent', (data) => {
        console.log(data)
        this.Semester = data
      })
    },
    watch: {
      'scoreData': {
        handler (newVal) {
          this.scoreData = newVal
          let legends = this.scoreData.map(item => ({
            xdata: item.schedule_lesson.lesson.name,
            sdata1: item.score,
            sdata2: item.standard_score
          }))
          //console.log("le:"+legends)
          chartmainline.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            toolbox: {
              x:'900px',
              feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            legend: {
              data: ['标准分', '成绩']
            },
            xAxis: [
              {
                axisLabel: {
                  interval: 0,
                  formatter: function (value) {
                    debugger
                    var ret = "";//拼接加\n返回的类目项
                    var maxLength = 4;//每项显示文字个数
                    var valLength = value.length;//X轴类目项的文字个数
                    var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                    if (rowN > 1)//如果类目项的文字大于3,
                    {
                      for (var i = 0; i < rowN; i++) {
                        var temp = "";//每次截取的字符串
                        var start = i * maxLength;//开始截取的位置
                        var end = start + maxLength;//结束截取的位置
                        //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                        temp = value.substring(start, end) + "\n";
                        ret += temp; //凭借最终的字符串
                      }
                      return ret;
                    }
                    else {
                      return value;
                    }
                  }
                },
                data: legends.map(item => item.xdata)
              }
            ],
            grid: {
              left: '10%',
              bottom: '25%'
            },
            yAxis: [
              {
                type: 'value',
                name: '成绩',
                min: 0,
                max: 100,
                interval: 10,
                splitLine: {
                  show: false
                }
              },
              {
                type: 'value',
                name: '标准分',
                min: -2.5,
                max: 2,
                interval: 0.5,
                splitLine: {
                  show: false
                }
              }
            ],
            series: [
              {
                name: '成绩',
                type: 'bar',
                data: legends.map(item => item.sdata1)
              },
              {
                name: '标准分',
                type: 'line',
                yAxisIndex: 1,
                data: legends.map(item => item.sdata2)
              }
            ]
          })
        },
        deep: true,
        immediate: true,
      },
    },
    computed: {},
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        chartmainline = this.$echarts.init(document.getElementById('chartmainline'))
        //chartmainline.setOption(this.optionline);
        let legends = this.scoreData.map(item => ({
          xdata: item.schedule_lesson.lesson.name,
          sdata1: item.score,
          sdata2: item.standard_score
        }))
        //console.log("le:"+legends)
        chartmainline.setOption({

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data: ['标准分', '成绩']
          },
          xAxis: [
            {
              axisLabel: {
                interval: 0,
                formatter: function (value) {
                  debugger
                  var ret = "";//拼接加\n返回的类目项
                  var maxLength = 4;//每项显示文字个数
                  var valLength = value.length;//X轴类目项的文字个数
                  var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                  if (rowN > 1)//如果类目项的文字大于3,
                  {
                    for (var i = 0; i < rowN; i++) {
                      var temp = "";//每次截取的字符串
                      var start = i * maxLength;//开始截取的位置
                      var end = start + maxLength;//结束截取的位置
                      //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                      temp = value.substring(start, end) + "\n";
                      ret += temp; //凭借最终的字符串
                    }
                    return ret;
                  }
                  else {
                    return value;
                  }
                }
              },
              data: legends.map(item => item.xdata)
            }
          ],
          grid: {
            left: '10%',
            bottom: '25%'
          },
          yAxis: [
            {
              type: 'value',
              name: '成绩',
              min: 0,
              max: 100,
              interval: 10,
              splitLine: {show: false}
            },
            {
              type: 'value',
              name: '标准分',
              min: -2.5,
              max: 2,
              interval: 0.5,
              splitLine: {show: false}
            }
          ],
          series: [
            {
              name: '成绩',
              type: 'bar',
              barWidth:30,
              color: '#0073ff',
              data: legends.map(item => item.sdata1)
            },
            {
              name: '标准分',
              type: 'line',
              color: '#f88d96',
              yAxisIndex: 1,
              data: legends.map(item => item.sdata2)
            }
          ]
        })
      },
      changeB(){
        getScores({
          semester: this.Semester,
          if_major: 2
        }).then((response) => {
          console.log("ccccc:" + JSON.stringify(response.data.results))
          this.majorData = response.data.results
          let legends = this.majorData.map(item => ({
            xdata: item.schedule_lesson.lesson.name,
            sdata1: item.score,
            sdata2: item.standard_score
          }))
          console.log("le:" + legends)
          chartmainline.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            toolbox: {
              feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            legend: {
              data: ['标准分', '成绩']
            },
            xAxis: [
              {
                axisLabel: {
                  interval: 0,
                  formatter: function (value) {
                    debugger
                    var ret = "";//拼接加\n返回的类目项
                    var maxLength = 4;//每项显示文字个数
                    var valLength = value.length;//X轴类目项的文字个数
                    var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                    if (rowN > 1)//如果类目项的文字大于3,
                    {
                      for (var i = 0; i < rowN; i++) {
                        var temp = "";//每次截取的字符串
                        var start = i * maxLength;//开始截取的位置
                        var end = start + maxLength;//结束截取的位置
                        //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                        temp = value.substring(start, end) + "\n";
                        ret += temp; //凭借最终的字符串
                      }
                      return ret;
                    }
                    else {
                      return value;
                    }
                  }
                },
                data: legends.map(item => item.xdata)
              }
            ],
            grid: {
              left: '10%',
              bottom: '25%'
            },
            yAxis: [
              {
                type: 'value',
                name: '成绩',
                min: 0,
                max: 100,
                interval: 10,
                splitLine: {show: false}
              },
              {
                type: 'value',
                name: '标准分',
                min: -2.5,
                max: 2,
                interval: 0.5,
                splitLine: {show: false}
              }
            ],
            series: [
              {
                name: '成绩',
                type: 'bar',
                data: legends.map(item => item.sdata1)
              },
              {
                name: '标准分',
                type: 'line',
                yAxisIndex: 1,
                data: legends.map(item => item.sdata2)
              }
            ]
          })
          //console.log("222s"+JSON.stringify(legends))
          //console.log("222s"+JSON.stringify(xAxis.data))
        }).catch(function (error) {
          console.log(error);
        });

      },
      changeA(){
        getScores({
          semester: this.Semester,
        }).then((response) => {
          console.log("sc:" + JSON.stringify(response.data.results))
          this.majorData = response.data.results
          let legends = this.majorData.map(item => ({
            xdata: item.schedule_lesson.lesson.name,
            sdata1: item.score,
            sdata2: item.standard_score
          }))
          console.log("le:" + legends)
          chartmainline.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            toolbox: {
              feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            legend: {
              data: ['标准分', '成绩']
            },
            xAxis: [
              {
                axisLabel: {
                  interval: 0,
                  formatter: function (value) {
                    debugger
                    var ret = "";//拼接加\n返回的类目项
                    var maxLength = 4;//每项显示文字个数
                    var valLength = value.length;//X轴类目项的文字个数
                    var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                    if (rowN > 1)//如果类目项的文字大于3,
                    {
                      for (var i = 0; i < rowN; i++) {
                        var temp = "";//每次截取的字符串
                        var start = i * maxLength;//开始截取的位置
                        var end = start + maxLength;//结束截取的位置
                        //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                        temp = value.substring(start, end) + "\n";
                        ret += temp; //凭借最终的字符串
                      }
                      return ret;
                    }
                    else {
                      return value;
                    }
                  }
                },
                data: legends.map(item => item.xdata)
              }
            ],
            grid: {
              left: '10%',
              bottom: '25%'
            },
            yAxis: [
              {
                type: 'value',
                name: '成绩',
                min: 0,
                max: 100,
                interval: 10,
                splitLine: {show: false}
              },
              {
                type: 'value',
                name: '标准分',
                min: -2.5,
                max: 2,
                interval: 1,
                splitLine: {show: false}
              }
            ],
            series: [
              {
                name: '成绩',
                type: 'bar',
                data: legends.map(item => item.sdata1)
              },
              {
                name: '标准分',
                type: 'line',
                yAxisIndex: 1,
                data: legends.map(item => item.sdata2)
              }
            ]
          })
        }).catch(function (error) {
          console.log(error);
        });
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
  .text {
    font-size: 14px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .contain{
    background-color: #fff;
  }
  .chartmainline{
    border-radius: 15px;
    width:100%;
    margin:auto;
    height:300px;
  }
</style>
