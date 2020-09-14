<template>
<div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" />
      <detail-param-info :param-info="paramInfo" />
      <detail-comment-info :comment-info="commentInfo" />
      <goods-list :goods="recommends" />
    </scroll>
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
    recommends:[]
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
    GoodsList    
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
    
    })
    //请求推荐数据
    getRecommend().then(res =>{
      // console.log(res)
      this.recommends = res.data.list
    })
  
  }
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
