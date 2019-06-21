<template>
  <div class="navMenu">
    <label v-for="navMenu in navMenus">
      <!--只有一级菜单-->
      <el-menu-item @click="changeId(navMenu.post_code)" v-if="navMenu.childs==null"
                    :key="navMenu.post_code" :data="navMenu" :index="navMenu.verbose_name" :route="navMenu.post_code"
      >
        <!--标题-->
        <span slot="title">
          <a >{{navMenu.verbose_name}}</a>
        </span>
      </el-menu-item>
      <!--有多级菜单-->
      <el-submenu v-if="navMenu.childs"
                  :key="navMenu.schedule_lesson__semester" :data="navMenu" :index="navMenu.schedule_lesson__semester">
        <template slot="title">
          <span> {{navMenu.schedule_lesson__semester}}</span>
        </template>
        <!--递归组件，把遍历的值传回子组件，完成递归调用-->
        <nav-menu :navMenus="navMenu.childs"></nav-menu>
      </el-submenu>
    </label>
  </div>
</template>

<script>
import  bus from '../../../static/js/eventBus'
export default {
  name: 'NavMenu', //使用递归组件必须要有
  props: ['navMenus'], // 传入子组件的数据
  data() {
    return {}
  },
  methods: {
    changeId(id){
      bus.$emit("changeContent" , id)
      this.$emit("changeContent" , id)
    }
  }
}
</script>

<style scoped>
  li{
    width: 200px;
    font-weight: bold;
    margin-bottom: 8px;
    white-space: nowrap;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .title{
    width: 200px;
  }
  a:hover{
    color: #2d2d2d;
  }
</style>
