<template>
<div class="cart-list">
    <scroll class="content" ref="scroll">
        <cart-list-item 
        v-for="(item,index) in cartList" 
        :item-info="item" 
        :key="index"
        />
    </scroll>
</div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Scroll from 'components/common/mscroll/Scroll.vue'
    import CartListItem from './CartListItem'

    export default {
      name:'CartList',
      components:{
          Scroll,
          CartListItem
      },
      computed:{
        ...mapGetters(['cartList'])                
      },
      activated(){
          this.$refs.scroll.refresh()
      },
      data(){
       return {

       }
      }
    }
</script>

<style scoped>
    .cart-list{
        height: calc(100% - 44px -49px -45px);
    }
    .content{
        height: 100vh;
        overflow: hidden;
    }
</style>
