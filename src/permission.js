import router from './router'
import { Loading } from 'element-ui'
import { getToken } from './utils/auth'


let loadingService = null;
router.beforeEach((to, from, next) => {
    let hasToken = getToken()

    loadingService = Loading.service()
    if (to.meta.auth) {
        if (hasToken == 'null' || hasToken == null) {
            next('/login?redirect=' + to.path)
            loadingService.close()
        } else {
            next()
        }
    }else{
        next()
    }
    loadingService.close()
})


router.afterEach(() => {
    // 这里路由组件没有加载
    loadingService.close()
})