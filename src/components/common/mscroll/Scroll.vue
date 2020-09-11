<template>
<!-- ref 一般绑定给子组件 -->
    <div class="wrapper"  ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
      name:'Scroll',
      data(){
       return {
           scroll:null
       }
      },
      mounted(){
        //   this.scroll = new BScroll(document.querySelector('.wrapper',{}))
        //query 不确定是拿到那个class，所以不用。
        
        this.scroll = new BScroll(this.$refs.wrapper,{
            click:true,
            mouseWheel: true,
             mouseWheel: true,//开启鼠标滚轮
              disableMouse: false,//启用鼠标拖动
              disableTouch: false//启用手指触摸    
        })
      }
    }
</script>

<style scoped>

</style>
