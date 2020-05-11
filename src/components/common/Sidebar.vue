<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="getCollapse" background-color="#333"
             text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.childMenuList&&item.childMenuList.length>0">
          <el-submenu :index="item.href" :key="item.href">
            <template slot="title">
              <div class="top-nav" @click="goTo(item.href)"><i :class="item.icon"></i>
                <span class="nav-title" slot="title">{{$t(item.menuCode)}}</span>
              </div>
            </template>
            <template v-for="subItem in item.childMenuList">
              <el-submenu v-if="subItem.childMenuList&&subItem.childMenuList.length>0"
                          :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ $t(subItem.menuCode) }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.childMenuList" :key="i"
                              :index="threeItem.href">
                  {{ $t(subItem.menuCode) }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item :title="$t(subItem.menuCode)" v-else :index="subItem.href" :key="subItem.href">
                {{ $t(subItem.menuCode) }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.href" :key="item.href">
            <div class="nav-no-subs">
              <i :class="item.icon"></i><span class="nav-title" slot="title">{{$t(item.menuCode)}}</span>
            </div>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
    import bus from '../common/bus';
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                items: [
                      {
                          parentCode: '',
                          menuCode: 'home000',
                          menuName: 'Home',
                          menuType: 'site',
                          href: 'businessHome',
                          sort: 0,
                          icon: 'fa fa-home',
                          childMenuList: []
                      }, {
                          parentCode: '',
                          menuCode: 'system000',
                          menuName: 'System Admin',
                          menuType: 'system',
                          href: 'system',
                          sort: 1,
                          icon: 'fa fa-wrench',
                          childMenuList: [{
                              parentCode: 'system000',
                              menuCode: 'system001',
                              menuName: 'KPMG User Management',
                              menuType: 'system',
                              href: 'user',
                              sort: 1,
                              icon: '',
                              childMenuList: []
                          }, {
                              parentCode: 'system000',
                              menuCode: 'system002',
                              menuName: 'System Admin Management',
                              menuType: 'system',
                              href: 'sysAdmin',
                              sort: 2,
                              icon: '',
                              childMenuList: []
                          }, {
                              parentCode: 'system000',
                              menuCode: 'system003',
                              menuName: 'Site Management',
                              menuType: 'system',
                              href: 'site',
                              sort: 3,
                              icon: '',
                              childMenuList: []
                          }, {
                              parentCode: 'system000',
                              menuCode: 'system004',
                              menuName: 'Master Data Management',
                              menuType: 'system',
                              href: 'masterData',
                              sort: 4,
                              icon: '',
                              childMenuList: []
                          }, {
                              parentCode: 'system000',
                              menuCode: 'system005',
                              menuName: 'Audit Trail',
                              menuType: 'system',
                              href: 'auditTrail',
                              sort: 5,
                              icon: '',
                              childMenuList: []
                          }]
                      }, {
                          parentCode: '',
                          menuCode: 'site000',
                          menuName: 'Site Settings',
                          menuType: 'site',
                          href: 'settingHome',
                          sort: 2,
                          icon: 'fa fa-cog',
                          childMenuList: [{
                              parentCode: 'site000',
                              menuCode: 'site001',
                              menuName: 'General',
                              menuType: 'site',
                              href: 'general',
                              sort: 1,
                              icon: '',
                              childMenuList: []
                          }, {
                              parentCode: 'site000',
                              menuCode: 'site002',
                              menuName: 'Client Roles',
                              menuType: 'site',
                              href: 'clientRoles',
                              sort: 2,
                              icon: '',
                              childMenuList: []
                          }, {
                              parentCode: 'site000',
                              menuCode: 'site003',
                              menuName: 'Client Users',
                              menuType: 'site',
                              href: 'clientUsers',
                              sort: 3,
                              icon: '',
                              childMenuList: []
                          }, {
                              parentCode: 'site000',
                              menuCode: 'site004',
                              menuName: 'KPMG User Roles',
                              menuType: 'site',
                              href: 'kpUserRole',
                              sort: 4,
                              icon: '',
                              childMenuList: []
                          }, {
                              parentCode: 'site000',
                              menuCode: 'site005',
                              menuName: 'KPMG Team Members',
                              menuType: 'site',
                              href: 'kpmgTeamMember',
                              sort: 5,
                              icon: '',
                              childMenuList: []
                          }, {
                              parentCode: 'site000',
                              menuCode: 'site006',
                              menuName: 'Close Out And Roll Forward To Next Year',
                              menuType: 'site',
                              href: 'toNextYear',
                              sort: 6,
                              icon: '',
                              childMenuList: []
                          }]
                      }, {
                          parentCode: '',
                          menuCode: 'client000',
                          menuName: 'Client Home',
                          menuType: 'client',
                          href: 'client',
                          sort: 3,
                          icon: 'fa fa-align-justify',
                          childMenuList: [{
                              parentCode: 'client000',
                              menuCode: 'client001',
                              menuName: 'Information Submission',
                              menuType: 'client',
                              href: 'pbc',
                              sort: 1,
                              icon: '',
                              childMenuList: []
                          }, {
                              parentCode: 'client000',
                              menuCode: 'client002',
                              menuName: 'Statutory Accounts Status',
                              menuType: 'client',
                              href: 'accounts',
                              sort: 2,
                              icon: '',
                              childMenuList: []
                          }, {
                              parentCode: 'client000',
                              menuCode: 'client003',
                              menuName: 'Matter Logs',
                              menuType: 'client',
                              href: 'matterLogs',
                              sort: 3,
                              icon: '',
                              childMenuList: []
                          }, {
                              parentCode: 'client000',
                              menuCode: 'client004',
                              menuName: 'Insights',
                              menuType: 'client',
                              href: 'insights',
                              sort: 4,
                              icon: '',
                              childMenuList: []
                          }]
                      }
                ]
            }
        },
        computed: {
            ...mapGetters('common', {
                getUser: 'getUser',
                getCollapse: 'getCollapse',
                getSite: 'getSite'
            }),
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        methods: {
            goTo(path) {
                this.$router.push({path: '/' + path})
            }
        },
        mounted() {
            /*if (!this.getSite.isSiteAdmin) {
                let menuList = [].concat(this.getUser.menuList)
                menuList.forEach((i, n) => {
                    if (i.menuCode == 'site000') {
                        menuList.splice(n, 1)
                    }
                })
                this.items = menuList
            } else {
                this.items = this.getUser.menuList
            }*/
            console.log(this.getUser.menuList)
        }
    }
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0px;
    width: 50px;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar-el-menu {
    width: 51px;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 170px;
  }

  .sidebar > ul {
    height: 100%;
  }

  .el-tooltip {
    padding: 0 13px !important;
  }

  .top-nav {
    padding: 0 15px;
  }

  .top-nav i {
    font-size: 18px;
  }

  .nav-title {
    padding-left: 8px;
  }

  .nav-no-subs {
    width: 50px;
    margin-left: -4px;
  }

  .nav-no-subs i {
    font-size: 18px;
  }
</style>
