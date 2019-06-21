<template>
    <div>
    <div id="header">
        <div class="hd_bar" id="userinfo-bar">
            <div class="bd">
                <div class="hd_lbar" style="display: block;" id="ECS_MEMBERZONE">
                     <router-link :to="'/app/home/index'"></router-link>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>

</script>

<style scoped>
#header {
  width:100%
}
.hd_bar .bd {
  padding-left:50px;
  margin:20px auto;
  position:relative;
  z-index:100
}
.hd_bar .hd_lbar {
  float:left;
  width:310px;
  overflow:hidden;
  padding-left:6px;
  display:none
}
.hd_bar .hd_lbar a {
  background: url("../../static/images/logo.png") no-repeat;
  display:inline-block;
  width: 300px;
  height:58px;
  padding:20px 12px;
  vertical-align:top
}


</style>
