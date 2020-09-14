<template>

    <swiper class="swiper1">        
        <swiper-item v-for="item in topImages" class="swiper-item">
            <img :src="item" alt="">
        </swiper-item>       
    </swiper>

</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper"
export default {
  name:'',
  components:{
      Swiper,SwiperItem
  },
  props:{
      topImages:{
          type:Array,
      default(){
          return []
      }
      }
  },
  data(){
   return {

   }
  }
}
</script>

<style scoped>
.swiper1{
    height: 300px;
    /* overflow: hidden; */
    z-index: 11;
}
.swiper-item{
    height: 300px;
}
</style>
