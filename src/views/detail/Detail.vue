<template>
<div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll 
    class="content" 
    ref="scroll" 
    @scroll="contentScroll" 
    :probe-type="3">

      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" />
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
</div>
</template>

<script>
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail.js"
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import Scroll from 'components/common/mscroll/Scroll.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList.vue'
import DetailBottomBar from './childComps/DetailBottomBar'
import BackTop from 'components/content/backTop/BackTop.vue'
import {BACK_POSITION} from "../../commonjs/const"

export default {
  name:'Detail',
  data(){
   return {
     iid:null,
    //  res:null
    topImages:[],
    goods:{},
    shop:{},
    detailInfo:{},
    paramInfo:{},
    commentInfo:{},
    recommends:[],
    currentIndex:0,
    isShowBackTop:false,
    // themeTopYs:[0,1000,2000,3000]
   }
  },

  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop    
  },

  created(){
    //保存传入的iid
    this.iid = this.$route.params.iid
    //根据iid 请求详细数据
    getDetail(this.iid).then(res=>{
      // console.log(res)
      const data = res.result
      //获取轮播图数据
      this.topImages = data.itemInfo.topImages
      // console.log(this.topImages)
    // 获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // console.log(this.goods)
      //创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      //商品详情
      this.detailInfo = data.detailInfo
      //商品参数
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
      this.$nextTick(()=>{
            this.themeTopYs=[]
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            console.log(this.themeTopYs)
      })
    
    })
    //请求推荐数据
    getRecommend().then(res =>{
      // console.log(res)
      this.recommends = res.data.list
    })
  
  },

  updated(){

  },
  methods:{
    titleClick(index){
    // console.log(index)
    this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
    },

    contentScroll(position){
      // console.log(position)
      // 获取y
      const positionY = -position.y
      //和主题中的值对比
      let length = this.themeTopYs.length
      for(let i =0;i< length;i++){
        // console.log(i)
        // if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
        //   console.log(i)
        // }
        if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || ( i === length -1 && positionY >= this.themeTopYs[i]))){
          // console.log(i)
          this.currentIndex = i
          // console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      //是否显示回到顶部
      this.isShowBackTop = (-position.y) > 1000
    },
    
    backClick(){

        this.$refs.scroll.scrollTo(0,0,500)
      },
    addToCart(){
      // console.log('1')
      // 获取商品
      const product ={}
      product.img = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice
      product.iid = this.iid
      // console.log(product.img)
      // console.log(product.title)
      // console.log(product.desc)
      // console.log(product.price)
      // console.log(product.iid)
   
      //商品加入到购物车
      this.$store.commit('addCart',product)
      
    }
  },

    
 
}
  
  
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 12;
  background-color: #fff;
  height: 100vh;
}
.content{
  height: calc(100% - 44px);
}
.detail-nav{
  position: relative;
  background-color: #fff;
  z-index: 9;
}
</style>
