export default {
    syncState2Local(state, obj) {
        this.replaceState(Object.assign(state, obj));
    }
};
