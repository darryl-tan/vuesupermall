<template>
  <div id="home"> 
      <nav-bar class="home-nav">
        <div slot="center">购物街</div>       
          
      </nav-bar>
      <tab-control class="tab-control" :titles="['流行','新款','精选']"   @tabClick="tabClick"      ref="tabControl" v-show="isTabFixed"/>
      <scroll 
      class="content" 
      ref="scroll" 
      :probe-type="3" 
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
      >
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <recommend-view :recommends="recommends"/>
        <feature-view></feature-view>
        <tab-control  :titles="['流行','新款','精选']"   @tabClick="tabClick" 
        ref="tabControl"      
        />
        <goods-list :goods="showGoods"/>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
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
  import BackTop from 'components/content/backTop/BackTop.vue'

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
      Scroll,
      BackTop
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
        currentType:'pop',
        isShowBackTop:false,
        taboffsetTop:0,
        isTabFixed:false,
        saveY:0
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
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      // this.$refs.scroll.refresh() //刷新，否则不能滚动
    },
    deactivated(){
      this.saveY = this.$refs.scroll.scroll.y
    },
    mounted(){
            
    },
    methods:{
      loadMore(){
        // console.log('上拉加载更多')
        this.getHomeGoods(this.currentType)
        // this.$refs.scroll.scroll.refresh()
      },
      contentScroll(position){
        // 判断backtop是否显示
        this.isShowBackTop = (-position.y) > 1000
        //判断tabcontrol 是否吸顶
        this.isTabFixed = (-position.y) > this.taboffsetTop
      },
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
      backClick(){
        // click:true,
        // console.log('back')
        this.$refs.scroll.scrollTo(0,0,500)
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
          this.$refs.scroll.finishPullUp()
        })
      }
      ,swiperImageLoad(){
        this.taboffsetTop = this.$refs.tabControl.$el.offsetTop
        // console.log(this.taboffsetTop)
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
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 8; */
  
  }
  .tab-control{
    /* position: sticky;
    top: 44px; */
    position: relative;
    z-index: 19;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  /* .fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */
</style>
