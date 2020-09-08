<template>
  <div id="home"> 
      <nav-bar class="home-nav">
        <div slot="center">购物街</div>
      </nav-bar>
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>

  </div>

</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/HomerecommendViews'

  import {getHomeMultidata} from 'network/home.js'


  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView
    },
    data(){
      return{
        banners:[],
        recommends:[]
      }
    },
    created(){
      getHomeMultidata().then(
        res =>{
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        }
      )
    }
  }
</script>

<style scoped>
.home-nav{
  /* background-color:#ff8198; */
  background-color:var(--color-tint);
  color: white;
}
</style>
