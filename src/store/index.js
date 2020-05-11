import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutation';
import common from './modules/common';
import storePersistence from './store-persistence-plugin';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    actions: {},
    mutations,
    modules: {
        common
    },
    plugins: [storePersistence]
});
