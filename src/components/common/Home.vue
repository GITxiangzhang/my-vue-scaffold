<template>
    <div>
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':getCollapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <!--<keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>-->
                    <router-view></router-view>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
            <v-bottom></v-bottom>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from './bus';
    import vBottom from './Bottom.vue';
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                tagsList: []
            }
        },
        computed: {
            ...mapGetters('common', {
                getUser: 'getUser',
                getCollapse: 'getCollapse'
            })
        },
        components: {
            vHead, vSidebar, vTags, vBottom
        },
        /*created() {
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for (let i = 0, len = msg.length; i < len; i++) {
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        }*/
    }
</script>
<style>
    .content-box {
        position: absolute;
        left: 170px;
        right: 0;
        top: 70px;
        bottom: 0;
        padding-bottom: 30px;
        -webkit-transition: left .3s ease-in-out;
        transition: left .3s ease-in-out;
        background: #f0f0f0;
    }

    .content-collapse {
        left: 50px;
    }
</style>
