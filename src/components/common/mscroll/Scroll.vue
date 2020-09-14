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
      props:{
          probeType:{
              type:Number,
              default:0
          },
          pullUpLoad:{
              type:Boolean,
              default:false
          }
      },
      methods:{
          scrollTo(x,y,time=300){
              this.scroll.scrollTo(x,y,time)
          },
          finishPullUp(){
              this.scroll.finishPullUp()
          }

      },
      mounted(){
        //   this.scroll = new BScroll(document.querySelector('.wrapper',{}))
        //query 不确定是拿到那个class，所以不用。
        //创建 BSscroll 对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad,

            mouseWheel: true,
            mouseWheel: true,//开启鼠标滚轮
            disableMouse: false,//启用鼠标拖动
            disableTouch: false//启用手指触摸    
        })
        this.scroll.on('scroll',(position)=>{
            // console.log(position)
            this.$emit('scroll',position)
        })
        this.scroll.scrollTo(0,0)
        //监听上拉
        this.scroll.on('pullingUp',()=>{
            // console.log('上拉加载更多')
            this.$emit('pullingUp')
        })
      }
    }
</script>

<style scoped>

</style>
