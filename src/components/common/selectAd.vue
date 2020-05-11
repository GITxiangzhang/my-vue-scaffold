<template>
  <div class="wl-ad-list">
    <el-select :value="myValue"
               filterable
               :multiple="multi"
               remote
               :collapse-tags="collapseTags"
               reserve-keyword
               clearable
               @change="onValueChange"
               @clear="onClear"
               :placeholder="$t('TABLE_HEADER_EMAIL_StaffName')"
               :remote-method="callStack"
               :class="size=='mini'?'wl-ad-select mini':'wl-ad-select small'"
               :loading="loading">
      <el-option v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>

    <el-button v-if="showAdd"
               class="wl-green"
               @click="addAccount"
               :disabled="disabled">{{$t('COMMON_ADD')}}
    </el-button>

  </div>
</template>
<script>
import API from '@/api'
import * as _ from 'lodash'

//从its拿KP内部用户select 组件，不需要可删除
export default {
    data() {
        return {
            options: [],
            initOptions: [],
            myValue: this.value,
            loading: false,
            multi: _.isArray(this.value)
        }
    },
    methods: {
        async remoteMethod(query) {
            try {
                const { code, data, errDetails } = await this.api({ searchContent: query })
                if (code !== '1') throw new Error(errDetails)
                return Promise.resolve(data.records)
            } catch (e) {
                return Promise.reject([])
                console.error(e)
            }
        },
        async callStack(args, type) {
            if (args === '') return

            this.loading = true

            if (typeof args === 'string') {
                args = [args]
            }

            const combineArr = arr => _.reduce(arr, (prev, curr) => _.concat(prev, curr), [])

            const filterNullData = arr => _.filter(arr, v => v)

            const mapFilter = _.curry((filter, arr) => _.map(arr, this.filter))

            const rs = await Promise.all(_.map(args, v => this.remoteMethod(v)))
            const dataProducer = _.flow(
                combineArr,
                filterNullData,
                mapFilter(this.filter)
            )

            if (type == 'init') {
                this.initOptions = dataProducer(rs)
                this.options = dataProducer(rs)
            } else {
                const chosenOps = this.mergeOPtions()
                this.options = _.uniqBy(_.concat([], dataProducer(rs), chosenOps), 'value')
            }

            this.loading = false
        },
        addAccount() {
            const chosen = this.getOptionValue()
            this.onAdd(chosen)
        },
        mergeOPtions(args) {
            const chosenOption = _.map(this.myValue, v => {
                return _.find(this.options, v1 => v1.value === v)
            })
            return this.multi ? chosenOption : []
        },
        clear() {
            this.myValue = this.multi ? [] : ''
        },
        onValueChange(v) {
            this.myValue = v
            this.onChanage(v)
        },
        onClear() {
            this.options = []
        },
        distinct(a, b) {
            let oldArr = a.concat(b)
            let allArr = []
            for (let i = 0; i < oldArr.length; i++) {
                let flag = true
                for (let j = 0; j < allArr.length; j++) {
                    if (oldArr[i].staffNo == allArr[j].staffNo) {
                        flag = false
                    }
                }
                if (flag) {
                    allArr.push(oldArr[i])
                }
            }
            return allArr
        },
        getOptionValue() {
            const _ids = this.multi ? this.myValue : [this.myValue]
            const options = this.distinct(this.options, this.initOptions)
            const chosen = _.filter(options, v => {
                const id = _.findIndex(_ids, v1 => v1 === v.value)
                return id !== -1
            })
            return chosen
        }
    },
    mounted() {
        if (this.value) {
            this.callStack(this.value, 'init')
        }
    },
    props: {
        onAdd: {
            type: Function,
            default: () => {}
        },
        api: {
            type: Function,
            default: () => {}
        },
        filter: {
            type: Function,
            default: v => v
        },
        showAdd: {
            type: Boolean,
            default: true
        },
        onChanage: {
            type: Function,
            default: () => {}
        },
        value: {
            type: [String, Array]
        },
        collapseTags: {
            type: Boolean,
            default: true
        },
        size: {
            type: String,
            default: 'mini'
        }
    },
    computed: {
        disabled: function() {
            return _.isEmpty(this.myValue)
        }
    },
    watch: {
        value(v) {
            this.myValue = v
        },
        myValue(v) {
            this.$emit('input', v)
        }
    }
}
</script>
<style scoped>
.wl-ad-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    margin-right: 120px;
}

.mini {
    width: 200px;
}

.small {
    width: 300px;
}

.wl-green {
    position: absolute;
    right: -48px;
    height: 32px;
    top: 0;
}

.wl-ad-select {
    width: 100%;
}
</style>
