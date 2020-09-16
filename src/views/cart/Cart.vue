<template>
<div class="cart"> 
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表-->
    <cart-list></cart-list>
    <!-- 底部汇总-->
    <car-bottom-bar/>
</div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar'
  import CartList from './childComps/CartList.vue'
  import CarBottomBar from './childComps/CarBottomBar.vue'
  import { mapGetters } from 'vuex'


  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CarBottomBar
    },
    computed:{
      ...mapGetters(['cartLength',
      ])
    }
  }
</script>

<style scoped>
.nav-bar{
  background-color:var(--color-tint);
  color:#fff;
  font-weight: 700;
}
.cart{
  height: 100vh;
}
</style>
