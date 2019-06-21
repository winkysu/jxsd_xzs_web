<template>
    <div>
      <el-container style="height: 900px; border: 1px solid #eee">
        <el-aside class="el-nav" width="220px">
          <mail-nav></mail-nav>
        </el-aside>

        <el-container class="container">
          <el-header style="text-align: right; font-size: 12px; padding: 0; margin: 20px;">
            <tool-bar></tool-bar>
          </el-header>

          <el-main>

          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script type="text/ecmascript-6">
import MailNav from './compononets/mail-nav'
import MailDetail from './compononets/mail-detail'
import ToolBar from './compononets/mail-toolbar'

export default {
  name: 'mail',
  props: [],
  components: {
    MailNav,
    MailDetail,
    ToolBar
  }

}
</script>
<style scoped>

  .el-header {
    background-color: #B3C0D1;
    color: #333;
  }

  .el-aside {
    color: #333;
  }
  .el-nav{
    margin-top: 20px;
    background: none;
  }
</style>
