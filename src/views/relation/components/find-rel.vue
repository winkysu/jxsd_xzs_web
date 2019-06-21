<template>
    <div>
        <el-form label-width="80px" :model="form">
          <el-form-item label="查询人ID">
            <el-input v-model="form.name" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="查询人ID">
            <el-input v-model="form.region" style="width: 220px;"></el-input>
          </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
      <svg width="660" height="300" v-if="dialogVisible"></svg>
    </div>
</template>

<script type="text/ecmascript-6">
  let links;
  let linksText;
  let gs;
  let forceSimulation;
  let colorScale;
  import * as d3 from 'd3'
  import './d3.min.js'
  import { findRel } from '../../../api/api'
  export default {
    data() {
      return {
        dialogVisible:false,
        links:'',
        id: '',
        data:'',
        endData:  '',
        form: {
          name: '',
          region: '',
        }
      };
    },
    props: [],
    methods: {
      onSubmit() {
        this.dialogVisible = true
        console.log('!'+JSON.stringify(this.form));
        findRel(
          {
            userA_id:this.form.name,
            userB_id:this.form.region,
          }
        ).then((response)=> {
          console.log("3333:" + JSON.stringify(response.data));
          //本地存储用户信息
          this.data = response.data
          this.neo4jDataToD3Data(this.data)
          this.draw()
        })
          .catch(function (error) {
            console.log(error);
        });

        console.log('submit!');
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      contains(array, id) {
        var filter = array.filter(function(elem) {
          return elem.id === id;
        });

        return filter.length > 0;
      },
      neo4jDataToD3Data(data) {
        var self = this
        console.log("4444444:" + this.data.results)
        var graph = {
          nodes: [],
          relationships: []
        };

        data.results.forEach(function(result) {
          console.log('11')
          result.data.forEach(function(data) {
            console.log('22')
            data.graph.nodes.forEach(function(node) {
              console.log('33')
              var a = self.contains(graph.nodes, node.id)
              console.log(a)
              if (!a) {
                graph.nodes.push(node);
              }
            });

            data.graph.relationships.forEach(function(relationship) {
              relationship.source = relationship.startNode;
              relationship.target = relationship.endNode;
              graph.relationships.push(relationship);
            });

            data.graph.relationships.sort(function(a, b) {
              if (a.source > b.source) {
                return 1;
              } else if (a.source < b.source) {
                return -1;
              } else {
                if (a.target > b.target) {
                  return 1;
                }

                if (a.target < b.target) {
                  return -1;
                } else {
                  return 0;
                }
              }
            });

            for (var i = 0; i < data.graph.relationships.length; i++) {
              if (i !== 0 && data.graph.relationships[i].source === data.graph.relationships[i-1].source && data.graph.relationships[i].target === data.graph.relationships[i-1].target) {
                data.graph.relationships[i].linknum = data.graph.relationships[i - 1].linknum + 1;
              } else {
                data.graph.relationships[i].linknum = 1;
              }
            }
          });
        });
        console.log(JSON.stringify(graph));
        this.endData = graph
      },
      circleColor (d) {
        if (d.sex === 'M') {
          return 'blue'
        } else {
          return 'pink'
        }
      },
      linkColor (d) {
        if (d.type === 'A') {
          return 'green'
        } else {
          return 'red'
        }
      },
      draw(){
        let marge = { top: 60, bottom: 60, left: 60, right: 60 }
        let svg = d3.select('svg')
        let width = svg.attr('width')
        let height = svg.attr('height')
        let g = svg.append('g')
          .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')')
        // 准备数据
        // 节点集
        let nodes = this.endData.nodes
        // 边集
        let edges = this.endData.relationships
        // 设置一个颜色比例尺
         colorScale = d3.scaleOrdinal()
          .domain(d3.range(nodes.length))
          .range(d3.schemeCategory10)
        // 新建一个力导向图
         forceSimulation = d3.forceSimulation()
          .force('link', d3.forceLink().id((d) => d.id))
          .force('charge', d3.forceManyBody())
          .force('center', d3.forceCenter())
        // 生成节点数据
        forceSimulation.nodes(nodes)
          .on('tick', this.ticked)
        // 生成边数据
        forceSimulation.force('link')
          .links(edges)
          .distance(function (d) { // 每一边的长度
            return d.linknum * 100
          })
        // 设置图形中心位置
        forceSimulation.force('center')
          .x(width / 2)
          .y(height / 2)
        // // 顶点集，边集
        console.log(nodes)
        console.log(edges)
        // 绘制边
        links = g.append('g')
          .selectAll('line')
          .data(edges)
          .enter()
          .append('line')
          .attr('stroke', function (d, i) {
            return colorScale(i)
          })
          .attr('stroke-width', 1)
        // 边上的文字
        linksText = g.append('g')
          .selectAll('text')
          .data(edges)
          .enter()
          .append('text')
          .text(function (d) {
            return d.type
          })
        // 创建分组
         gs = g.selectAll('.circleText')
          .data(nodes)
          .enter()
          .append('g')
          .attr('transform', function (d) {
            let cirX = d.x
            let cirY = d.y
            return 'translate(' + cirX + ',' + cirY + ')'
          })
          .call(d3.drag()
            .on('start', this.started)
            .on('drag', this.dragged)
            .on('end', this.ended)
          )
        // 绘制节点
        gs.append('circle')
          .attr('r', 10)
          .attr('fill', function (d, i) {
            return colorScale(i)
          })
        // 文字
        gs.append('text')
          .attr('x', -10)
          .attr('y', -20)
          .attr('dy', 10)
          .text(function (d) {
            return d.properties.name
          })
      },
      // ticked
       ticked () {
          links
            .attr('x1', function (d) { return d.source.x })
            .attr('y1', function (d) { return d.source.y })
            .attr('x2', function (d) { return d.target.x })
            .attr('y2', function (d) { return d.target.y })
          linksText
            .attr('x', function (d) { return (d.source.x + d.target.x) / 2 })
            .attr('y', function (d) { return (d.source.y + d.target.y) / 2 })
          gs
            .attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')' })
       },
      // drag
        started (d) {
          if (!d3.event.active) {
            forceSimulation.alphaTarget(0.8).restart() // 设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0, 1]
          }
          d.fx = d.x
          d.fy = d.y
        },
       dragged (d) {
          d.fx = d3.event.x
          d.fy = d3.event.y
       },
       ended (d) {
          if (!d3.event.active) {
            forceSimulation.alphaTarget(0)
          }
          d.fx = null
          d.fy = null
       }
    },
    created() {
    },
    mounted() {


    }

  }
</script>
<style  scoped>
  .links line {
    stroke: #000;
    stroke-opacity:1;
  }
  .nodes circle {
    stroke: #fff;
    stroke-width: 1.5px;
  }
</style>
