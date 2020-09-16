<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button class="check-button" />
            <p>全选</p>
        </div>
        <div class="price">合计{{totalPrice}}</div>
        <div class="calcuate">
            去计算:{{checkLength}}
        </div>
    </div>
    
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
export default {
  name:'CarBottomBar',
  components:{
      CheckButton
  },
  computed:{
      totalPrice(){
          return '￥' + this.$store.state.cartList.filter(
              item =>{
                  return item.checked
              }
          ).reduce((preValue,item)=>{
              return preValue + item.price * item.count
          },0)
      },
      checkLength(){
          return this.$store.state.cartList.filter(item => item.checked).length
      }

  },
  data(){
   return {

   }
  },
}
</script>

<style scoped>
.bottom-bar{
    display: flex;
    height: 40px;
    width: 100%;
    /* width: 100vh; */
    background-color: #eee;
    position: absolute;
    bottom: 48px;
    line-height: 40px;
    /* z-index: 1; */
}
.check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    
}
.check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
}
.price{
    margin-left: 60px;
}
.calcuate{
    margin-left: 28px;
    color: white;
    width: 90px;
    background-color: orange;
    text-align: center;
}

</style>
