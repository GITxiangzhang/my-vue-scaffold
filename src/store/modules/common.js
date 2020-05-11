const state = {
    collapse: true,
    userInfo: {},
};
const getters = {
    getUserInfo: state => state.userInfo,
    getCollapse: state => state.collapse

};
const mutations = {
    setuserInfo: (state, payLoad) => (state.userInfo = Object.assign({}, payLoad)),
    setCollapse: (state, payLoad) => (state.collapse = payLoad)
};
const actions = {};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
