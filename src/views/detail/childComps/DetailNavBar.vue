<template>
<div>
    <nav-bar>
        <div slot="left" class="back" @click="backClick">
            <img src="~assets/img/common/back.svg" alt="">
        </div>
      <div slot="center" class="title" >
          <div v-for="(item,index) in titles" 
          class="title-items"
          :class="{active :index === currentIndex}"
          @click="titleClick(index)">
              {{item}}
          </div>          
      </div>
    </nav-bar>
    
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  name:'',
  data(){
   return {
       titles:['商品','参数','评论','推荐'],
       currentIndex:0
   }
  },  
  components:{
    NavBar
  },
  methods:{
      titleClick(index){
          this.currentIndex =index
      },
      backClick(){
          this.$router.back()
      }
  }
}
</script>

<style scoped>
 .title{
     display: flex;
 }
 .title-items{
     flex: 1;
     font-size: 13px;
 }
 .active{
     color: var(--color-high-text);
 }
 .back img{
     margin-top: 10px;
     margin-left: 15px;
 }
</style>
