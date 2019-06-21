<template>
    <div>
      <el-tabs type="border-card" v-model="activeName"  @tab-click="handleClick">
        <el-tab-pane label="普通邮件" name="first" class="el-tabs__item ">
          <mail-detail></mail-detail>
        </el-tab-pane>
        <el-tab-pane label="群邮件" name="second" >
          <group-detail></group-detail>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import MailDetail from './mail-detail'
import GroupDetail from './mail-detail-group.vue'

export default {
  data() {
    return {
      activeName: 'first'
    };
  },
  components: {
    MailDetail,
    GroupDetail
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style scoped>

</style>
