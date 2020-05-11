<template>
  <router-view v-if="isRouterAlive"></router-view>
</template>
<script>
    export default {
        provide() {
            return {
                reload: this.reload
            }
        },
        data() {
            return {
                isRouterAlive: true
            }
        },
        methods: {
            reload() {
                this.isRouterAlive = false
                this.$nextTick(function () {
                    this.isRouterAlive = true
                })
            }
        },
        mounted: function () {
            const lang = sessionStorage.getItem('lang');
            if (lang) {
                this.$i18n.locale = lang;
            }
        }
    };
</script>
<style>
  @import './assets/css/main.css';
  @import './assets/css/color-dark.css'; /*深色主题*/
  /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>
