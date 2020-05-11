<template>
  <div class="tags"
       v-if="showTags">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-if="getUser.userType=='1'"
                          :to="{ name: 'businessHome' }"><i class="fa fa-home"
           aria-hidden="true"></i>
        {{$t('home')}}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in routes"
                          :key="index"
                          :to="{ name:item }">{{$t(getRouteByName(item).meta.title)}}</el-breadcrumb-item>
    </el-breadcrumb>

  </div>
</template>

<script>
import bus from './bus';
import { mapGetters } from 'vuex';
//自定义面包屑配置，根据项目情况可以重写
export default {
    data() {
        return {
            tagsList: [],
            routerMatch: {
                client: ['client'],
            }
        };
    },
    methods: {
        getRouteByName(name) {
            let _data = this.$router.options.routes,
                matched = {};
            const _find = function(data) {
                for (let i = 0; i < data.length; i++) {
                    let hasChildren = _.isArray(data[i].children);
                    if (data[i].name === name) {
                        matched = data[i];
                        return;
                    } else {
                        if (hasChildren && data[i].children.length > 0) {
                            _find(data[i].children);
                        }
                    }
                }
            };
            _find(_data);

            return matched;
        },
        isActive(path) {
            return path === this.$route.fullPath;
        },
        // 关闭单个标签
        closeTags(index) {
            const delItem = this.tagsList.splice(index, 1)[0];
            const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
            if (item) {
                delItem.path === this.$route.fullPath && this.$router.push(item.path);
            } else {
                this.$router.push('/');
            }
        },
        // 关闭全部标签
        closeAll() {
            this.tagsList = [];
            this.$router.push('/');
        },
        // 关闭其他标签
        closeOther(index) {
            this.tagsList.splice(index + 1, this.tagsList.length - index - 1);
            /*  const curItem = this.tagsList.filter(item => {
                      return item.index <= this.$route.fullPath;
                  })
                  this.tagsList = curItem;*/
        },
        // 设置标签
        setTags(route) {
            const isExist = this.tagsList.some(item => {
                return item.path === route.fullPath;
            });
            if (!isExist) {
                if (this.tagsList.length >= 8) {
                    this.tagsList.shift();
                }
                this.tagsList.push({
                    title: route.meta.title,
                    path: route.fullPath,
                    name: route.matched[1].components.default.name
                });
            }
            bus.$emit('tags', this.tagsList);
        },
        handleTags(command) {
            command === 'other' ? this.closeOther() : this.closeAll();
        }
    },
    computed: {
        showTags() {
            return this.tagsList.length > 0;
        },
        routes() {
            return this.routerMatch[this.$route.name];
        },
        ...mapGetters('common', {
            getUser: 'getUser'
        })
    },
    watch: {
        $route(newValue, oldValue) {
            this.setTags(newValue);
        }
    },
    created() {
        this.setTags(this.$route);
        // 监听关闭当前页面的标签页
        bus.$on('close_current_tags', () => {
            for (let i = 0, len = this.tagsList.length; i < len; i++) {
                const item = this.tagsList[i];
                if (item.path === this.$route.fullPath) {
                    if (i < len - 1) {
                        this.$router.push(this.tagsList[i + 1].path);
                    } else if (i > 0) {
                        this.$router.push(this.tagsList[i - 1].path);
                    } else {
                        this.$router.push('/');
                    }
                    this.tagsList.splice(i, 1);
                    break;
                }
            }
        });
    }
};
</script>


<style>
.tags {
    z-index: 99;
    position: relative;
    height: 25px;
    overflow: hidden;
    background: #fff;
    padding: 5px 0 0 25px;
    box-shadow: 0px 3px 2px rgba(215, 215, 215, 0.349019607843137);
    -webkit-box-shadow: 0px 3px 2px rgba(215, 215, 215, 0.349019607843137);
    border-top: 1px solid rgba(240, 240, 240, 1);
}

.tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 7px 0 0 40px;
}

.breadcrumb {
    display: inline-block;
    font-size: 12px;
}

.tags-li:not(.active):hover {
    background: #f8f8f8;
}

.tags-li.active {
    color: #fff;
}

.tags-li-title {
    float: left;
    max-width: 130px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
}

.tags-li.active .tags-li-title {
    color: #333;
}

.tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
}
</style>
