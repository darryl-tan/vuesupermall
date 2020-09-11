<template>

  <div class="wrapper"> 
      <ul class="content">
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
    <li>裂变</li>
      </ul>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Category",
    data(){
      return{
        scroll : null
      }
    },
    mounted(){
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
        probeType:3,
        pullUpLoad:true
      })
      this.scroll.on('scroll',(position)=>{
        console.log(position)
      })
      this.scroll.on('scroll',()=>{
        console.log('上拉加载更多')
      })
    }
  }
</script>

<style scoped>
  .wrapper{
    height: 150px;
    background-color: pink;
    overflow: hidden;
  }
</style>
