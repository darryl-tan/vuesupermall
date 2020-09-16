import Vue from 'vue'

export default {
    addCart(state, payLoad) {

        //另一种方法
        let oldProduct = state.cartList.find(item =>
            item.iid === payLoad.iid
        )
        if (oldProduct) {
            oldProduct.count += 1
        } else {
            payLoad.count = 1
            state.cartList.push(payLoad)
        }
        payLoad.checked = true

    },
    // [ADD_TO_CART](state, payLoad) {
    //     payLoad.checked = true
    //     state.cartList.push(payLoad)
    // }


}