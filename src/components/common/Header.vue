<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn"
         @click="collapseChage">
      <i v-if="!getCollapse"
         class="el-icon-s-fold"></i>
      <i v-else
         class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">
      <img src="../../assets/img/kp-logo.png" />
      <label>{{$t('COMMON_PROJECT_NAME')}}</label>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen"
             @click="handleFullScreen">
          <el-tooltip effect="dark"
                      :content="fullscreen?$t('full_no_screen'):$t('full_screen')"
                      placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../../assets/img/img.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name"
                     trigger="click"
                     @command="handleCommand">
          <span class="el-dropdown-link">
            <div class="user-title">
              <p class="name">{{user.userName}}</p>
              <p class="position">{{user.title}}</p>
            </div>
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided
                              command="i18nchange">{{$t('i18n_btn')}}
            </el-dropdown-item>
            <el-dropdown-item v-if="getUser.userType=='2'"
                              divided
                              command="resetPassWord">
              {{$t('btn_resetPassword')}}
            </el-dropdown-item>
            <!-- <el-dropdown-item v-if="getUser.userType=='2'" divided command="resetUserName">
                                        {{$t('btn_resetUserName')}}
                                    </el-dropdown-item> -->
            <el-dropdown-item divided
                              v-if="getUser.userType=='2'"
                              command="loginout">{{$t('login_out')}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import bus from '../common/bus'
import API from '@/api'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            user: '',
            fullscreen: false
        }
    },
    inject:['reload'],
    methods: {
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                API.common
                    .logout({ param: this.user.userAccount })
                    .then(res => {
                        if (res.code == '1') {
                            sessionStorage.removeItem('JSESSIONID')
                            this.$store.commit('common/setUser', {})
                            this.$store.commit('common/setSite', {})
                            this.$store.commit('common/setEntity', {})
                            this.$router.push('/login')
                        } else {
                            this.$message.error(this.$t(res.code))
                        }
                    })
                    .catch(err => {})
                    .finally(() => {})
            }
            if (command == 'i18nchange') {
                let locale = this.$i18n.locale
                locale === 'zh' ? (this.$i18n.locale = 'en') : (this.$i18n.locale = 'zh')
                sessionStorage.setItem('lang', this.$i18n.locale)
                API.common.changeLanguage({param:this.$i18n.locale}).then(res=>{
                    if(res.code=='1'){
                        this.reload()
                    }
                })
            }
            if (command == 'resetPassWord') {
                this.$router.push('/changePassword')
            }
            if (command == 'resetUserName') {
                this.$router.push('/changeUserName')
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.$store.commit('common/setCollapse', !this.getCollapse)
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen()
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen()
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen()
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen()
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen()
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen()
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen()
                }
            }
            this.fullscreen = !this.fullscreen
        }
    },
    computed: {
        ...mapGetters('common', {
            getUser: 'getUser',
            getCollapse: 'getCollapse'
        })
    },
    mounted() {
        this.user = this.getUser
        /*   if (document.body.clientWidth < 1500) {
                    this.collapseChage();
                }*/
    }
}
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 65px;
    font-size: 22px;
    color: #333;
    background-color: #fff;
}

.collapse-btn {
    float: left;
    padding: 0 14px;
    cursor: pointer;
    line-height: 70px;
    background-color: rgba(161, 114, 169, 1);
}

.header .logo {
    float: left;
    /*width: 250px;*/
    line-height: 70px;
}

.logo img {
    width: 82px;
    height: 34px;
    margin: 16px 0 0 25px;
}

.logo label {
    display: inline-block;
    font-family: 'KPMG Light', 'KPMG';
    padding: 0 20px;
    font-weight: 300;
    font-style: normal;
    font-size: 36px;
    color: #470a68;
}

.header-right {
    float: right;
    padding-right: 50px;
}

.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}

.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}

.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}

.user-title {
    display: inline-block;
}

.user-title .name {
    font-size: 15px;
    color: #1e4c72;
}

.user-title .position {
    font-size: 14px;
    color: #acacac;
}

.btn-bell .el-icon-bell {
    color: #fff;
}

.user-name {
    margin-left: 10px;
}

.user-avator {
    margin-left: 20px;
}

.user-avator img {
    display: block;
    width: 29px;
    height: 30px;
    border-radius: 50%;
}

.el-dropdown-link {
    color: #333;
    cursor: pointer;
}

.el-dropdown-link i {
    vertical-align: super;
}

.el-dropdown-menu__item {
    text-align: center;
}
</style>
