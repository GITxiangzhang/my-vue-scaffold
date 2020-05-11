import router from './index'
import API from '@/api'
import store from '../store/index'


/**
 * 访问之前校验是否登录以及是否有访问该路由的权限
 */
router.beforeEach(async (to, from, next) => {
    const isLogin = sessionStorage.getItem('JSESSIONID')
    const whiteList = ['login', '403', '404']
    if (!isLogin) {
        if (to.name === 'login') {
            next()
        }else {
            next({ name: 'login' })
        }
    } else {
        const isAuth = _.findIndex(_plainTree(whiteList), v => v === to.name) !== -1
        if (to.name === 'login' || to.name === 'home') {
            next({ name: 'home' })
        } else if (!isAuth) {
            next({ name: '403' })
        } else {
            next()
        }
    }
})

/**
 * 判断是否有访问路由的权限
 */
function _plainTree(whiteList) {
    let _data = []

    const _find = function(data) {
        for (let i = 0; i < data.length; i++) {
            let hasChildren = _.isArray(data[i].childMenuList)
            if (hasChildren && data[i].childMenuList.length > 0) {
                _find(data[i].childMenuList)
            }
            _data.push(data[i])
        }
    }

    _find(store.state.common.user.menuList)//

    return _.concat(_.map(_data, v => v.href), whiteList)
}
