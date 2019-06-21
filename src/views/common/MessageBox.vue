<template>
    <div class="modal-backdrop">
      <div class="modal">
         <header class="modal-header">
           <slot name="header">
             This is the title
           </slot>
           <button type="button" class="btn-close" @click="close">X</button>
         </header>
         <section class="modal-body">
           <slot name="body">
             the default body
           </slot>
         </section>
         <footer class="modal-footer">
           <slot name="footer">
             <el-button type="primary" round @click="close">Close</el-button>
           </slot>
         </footer>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'modal',
        props: [],
        methods: {
            close(){
                this.$emit('close')
            }
        }
    }
</script>
<style scoped>
  .modal-backdrop{
    z-index: 100;
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    width: 400px;
    height: auto;
    background: #ffffff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }
  .modal-header,
  .modal-footer{
    padding: 15px;
    display: flex;
  }
  .modal-header{
    border-bottom: 1px solid #eee;
    color: #02a9f5;
    justify-content: space-between;
  }
  .modal-footer{
    border-top: 1px solid #eee;
    justify-content: flex-end;
  }
  .modal-body{
    position: relative;
    padding: 20px 10px;
  }
  .btn-close{
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #02a9f5;
    background: transparent;
  }
</style>
