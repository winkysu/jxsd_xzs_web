<template>
    <div  class="security_content">
      <member-menu></member-menu>
      <router-view></router-view>
    </div>
</template>
<script>
import memberMenu from './member-menu';
    export default {
        data () {
            return {

            };
        },
        props: {

        },
        components: {
            'member-menu': memberMenu,
            // 'receive': receive
        },
        created () {

        },
        watch: {

        },
        computed: {

        },
        methods: {
            toIndex () { //回到首页
                this.$router.push({name: 'index'});
            }
        }
    }
</script>
<style scoped>

  .security_content{
    overflow: hidden;
    width: 980px;
    height: 100%;
    margin: 40px auto 100px;
    border: 1px solid #e1e2e5;
    box-shadow: 0 2px 4px rgba(0,0,0,.14);
    background: #fafafa;
    border-radius: 4px;
  }

</style>
