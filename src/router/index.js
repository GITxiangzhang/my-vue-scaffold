import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/common/Home'
import Login from '@/components/page/login/index'
import Error403 from '@/components/page/error/403'
import Error404 from '@/components/page/error/404'


Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 面包屑自定义设置 add 新路由之后 要到 tags.vue文件添加配置以确保 面包屑显示正常
const router = new Router({
    routes: [
        {
            path: '/',
            component: Home,
            name: 'home',
            //redirect: '/businessHome',
            meta: { title: '' },
            children: []
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/403',
            name: '403',
            component: Error403
        },
        {
            path: '*',
            name: '404',
            component: Error404
        }
    ]
})

export default router
