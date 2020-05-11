import Vue from 'vue';
import App from './app.vue';
import router from './router';
import './router/router-navigation-guard';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import {lcn} from './lang/zh';
import {len} from './lang/en';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';

import store from '@/store/index';

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small',
    i18n: (key, value) => i18n.t(key, value)
});
const i18n = new VueI18n({
    locale: 'en',
    messages: {
        zh: {...lcn, ...zhLocale},
        en: {...len, ...enLocale}
    }
});
window.vm = new Vue({
    i18n
})
new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app');
