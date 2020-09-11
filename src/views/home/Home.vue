<template>
  <div id="home"> 
      <nav-bar class="home-nav">
        <div slot="center">购物街</div>
      </nav-bar>

      <scroll class="content">
        <home-swiper :banners="banners"/>
        <recommend-view :recommends="recommends"/>
        <feature-view></feature-view>
        <tab-control class="tab-control" :titles="['流行','新款','精选']"   @tabClick="tabClick" />
        <goods-list :goods="showGoods"/>
      </scroll>
  </div>

</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/HomerecommendViews'
  import FeatureView from './childComps/FeatureView'


  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/mscroll/Scroll.vue'

  import {getHomeMultidata,
    getHomeGoods
    } from 'network/home.js'


  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType:'pop'
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created(){
      this.getHomeMultidata()
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods:{
      //事件监听相关方法
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },

      //网络请求相关方法
      getHomeMultidata(){
        getHomeMultidata().then(
          res =>{
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          }
        )
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      }
    }
  }
</script>

<style scoped>
  /* scoped 是作用域*/
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav{
  /* background-color:#ff8198; */
    background-color:var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 8;
  
  }
  .tab-control{
    position: sticky;
    top: 44px;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
