import Vue from 'vue'
import VueRouter from 'vue-router'



const Home = () =>
    import ('../views/home/Home.vue')
const Category = () =>
    import ('../views/category/Category.vue')
const Cart = () =>
    import ('../views/cart/Cart.vue')
const Profile = () =>
    import ('../views/profile/Profile.vue')

//安装插件  1
Vue.use(VueRouter)
    //配置routes 对应的映射关系 5
const routes = [{
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/profile',
        component: Profile
    }
]


//创建router 2 
const router = new VueRouter({
    routes, //抽出去 4
    mode: 'history'
})

//导出 3
export default router