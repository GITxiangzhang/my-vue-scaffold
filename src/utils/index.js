import CryptoJS from 'crypto-js'
import {MessageBox, Loading} from 'element-ui'
import * as _ from 'lodash'
import Vue from 'vue'

const CryptoJSA = require('crypto-js');
const asmcrypto = require('./asmcrypto.all.es5.mjs')


export function getArrayRound() {
    let arr = [];
    for (let i = 0; i < 12; i++) {
        const randomNum6 = Math.round(Math.random() * 128)
        arr.push(randomNum6)
    }
    return arr
}

/**
 * 基于 AES /AES-GCM的加密算法
 * @param {*} content 需要加密的字符串
 * @returns
 */
function stringToUint8Array(str) {
    var arr = [];
    for (var i = 0, j = str.length; i < j; ++i) {
        arr.push(str.charCodeAt(i));
    }

    var tmpUint8Array = new Uint8Array(arr);
    return tmpUint8Array
}

function encryptForGCM(word, Secret) {
    const key = stringToUint8Array(Secret)
    const text_btoa = window.btoa(word)
    const text = asmcrypto.base64_to_bytes(text_btoa)
    const arrayRound = getArrayRound()
    const nonce = new Uint8Array(arrayRound)
    const encText = asmcrypto.AES_GCM.encrypt(text, key, nonce)
    const cipherNonce = asmcrypto.bytes_to_base64(nonce)
    const cipherText = asmcrypto.bytes_to_base64(encText)
    const pwd = {
        cipherText: cipherText,
        cipherNonce: cipherNonce
    }
    return window.btoa(JSON.stringify(pwd))
}

/**
 *判断某一个dom节点是不是另一个dom节点的 子节点
 *
 * @param {Element|stirng} toBeChecked DOM 类型的实例或者有效的 css selector
 * @param {*} node dom 节点
 * @returns {boolean}
 * @example isChildrenOf(,document.body,document.body)
 *          isChildrenOf(document.body,"#id1")
 *          isChildrenOf(document.body,".className1")
 */
function isChildrenOf(node, toBeChecked) {
    let parentNodeArr = []

    if (toBeChecked instanceof Element) {
        parentNodeArr = [toBeChecked]
    } else if (typeof toBeChecked === 'string') {
        parentNodeArr = Array.from(document.querySelectorAll(toBeChecked))
    } else {
        parentNodeArr = toBeChecked
    }

    return parentNodeArr.some(v => v.contains(node))
}

/**
 *获取某个dom节点的样式信息
 *
 * @param {*} dom
 * @param {string|Array} attr
 */
function styleOf(dom, attr) {
    let attrs = []
    if (typeof attr === 'string') {
        attrs = [attr]
    } else if (attr instanceof Array) {
        attrs = attr
    }

    return attrs.reduce((prev, curr) => {
        return {
            ...prev,
            [curr]: document.defaultView.getComputedStyle(dom, null)[curr]
        }
    }, {})

    // if (dom.currentStyle) {
    //   return attrs.reduce((prev, curr) => {
    //     return {
    //       ...prev,
    //       [curr]: dom.currentStyle[curr]
    //     };
    //   }, {});
    // } else {
    //   return attrs.reduce((prev, curr) => {
    //     return {
    //       ...prev,
    //       [curr]: document.defaultView.getComputedStyle(dom, null)[curr]
    //     };
    //   }, {});
    // }
}

/**
 *
 * 封装一系列的对dom的操作
 */
const domUtils = (function () {
    return {
        isChildrenOf,
        styleOf
    }
})()

/**
 * 基于 AES /ECB/Pkcs5padding的加密算法
 * @param {*} content 需要加密的字符串
 * @returns
 */
function encrypt(content, Secret) {
    console.log(CryptoJSA)
    let key = CryptoJSA.enc.Utf8.parse(Secret),
        srcs = CryptoJSA.enc.Utf8.parse(content)
    var iv = CryptoJSA.enc.Latin1.parse(Secret);
    var encryptResult = CryptoJSA.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJSA.mode.CBC,
        padding: CryptoJSA.pad.Pkcs7
    })
    return encryptResult.toString()
}

/**
 * 基于 AES /ECB/Pkcs5padding的解密算法
 * @param {*} content 需要解密的字符串
 * @returns
 */
function decrypt(encrypt) {
    return CryptoJSA.AES.decrypt(encrypt, CryptoJSA.enc.Utf8.parse('C6B022A98A2C46C8'), {
        mode: CryptoJSA.mode.CBC,
        padding: CryptoJSA.pad.NoPadding
    }).toString(CryptoJSA.enc.Utf8)
}

const AES = {
    encrypt,
    decrypt
}

function isIE() {
    return navigator.userAgent.indexOf('MSIE') != -1 || !!document.documentMode == true
}

/**
 * 生成uuid
 */
var getUUID = (function () {
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136

    var lut = []

    for (var i = 0; i < 256; i++) {
        lut[i] = (i < 16 ? '0' : '') + i.toString(16)
    }

    return function generateUUID() {
        var d0 = (Math.random() * 0xffffffff) | 0
        var d1 = (Math.random() * 0xffffffff) | 0
        var d2 = (Math.random() * 0xffffffff) | 0
        var d3 = (Math.random() * 0xffffffff) | 0
        var uuid =
            lut[d0 & 0xff] +
            lut[(d0 >> 8) & 0xff] +
            lut[(d0 >> 16) & 0xff] +
            lut[(d0 >> 24) & 0xff] +
            '-' +
            lut[d1 & 0xff] +
            lut[(d1 >> 8) & 0xff] +
            '-' +
            lut[((d1 >> 16) & 0x0f) | 0x40] +
            lut[(d1 >> 24) & 0xff] +
            '-' +
            lut[(d2 & 0x3f) | 0x80] +
            lut[(d2 >> 8) & 0xff] +
            '-' +
            lut[(d2 >> 16) & 0xff] +
            lut[(d2 >> 24) & 0xff] +
            lut[d3 & 0xff] +
            lut[(d3 >> 8) & 0xff] +
            lut[(d3 >> 16) & 0xff] +
            lut[(d3 >> 24) & 0xff]

        // .toUpperCase() here flattens concatenated strings to save heap memory space.
        return uuid.toUpperCase()
    }
})()

function deleteConfirm() {
    const t = Vue.prototype.$t.bind(window.vm)
    return MessageBox.confirm(t('msg_delete_sure'), t('COMMON_DELETE'), {
        showConfirmButton: true,
        confirmButtonText: t('btn_confirm'),
        confirmButtonClass: 'wl-green',

        showCancelButton: true,
        cancelButtonText: t('comment_reSet'),
        cancelButtonClass: 'wl-grey',

        closeOnClickModal: false,
        dangerouslyUseHTMLString: true
    })
}

function addConfirm() {
    const t = Vue.prototype.$t.bind(window.vm)

    return MessageBox.confirm(t('msg_submit_sure'), t('COMMON_ADD'), {
        showConfirmButton: true,
        confirmButtonText: t('btn_confirm'),
        confirmButtonClass: 'wl-green',

        showCancelButton: true,
        cancelButtonText: t('comment_reSet'),
        cancelButtonClass: 'wl-grey',

        closeOnClickModal: false,
        dangerouslyUseHTMLString: true
    })
}

function loading() {
    const config = {
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    }
    const downConfig = {
        lock: false,
        text: 'Downloading',
        spinner: 'fa fa-spinner fa-pulse fa-3x fa-fw',
        background: 'rgba(0, 0, 0, 0.7)'
    }
    const uploadConfig = {
        lock: false,
        text: 'Uploading',
        spinner: 'fa fa-spinner fa-pulse fa-3x fa-fw',
        background: 'rgba(0, 0, 0, 0.7)'
    }
    let service = ''
    return {
        load: () => {
            service = Loading.service(config)
        },
        download: () => {
            service = Loading.service(downConfig)
        },
        upload: () => {
            service = Loading.service(uploadConfig)
        },
        close: () => service.close()
    }
}

function delay(seconds) {
    return new Promise(function (resolve) {
        setTimeout(() => resolve(), seconds)
    })
}

/**
 * 通用的日期格式化方法
 * @export
 * @param {*} date -Date类型的实例
 * @param {string} [fmt='yyyy-MM-dd hh:mm:ss']
 * @returns 格式化之后的字符串形式
 */
function dateFormat(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    if (!(date instanceof Date)) throw new Error('invalid date format')
    let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
    }
    return fmt
}

/**
 *树形结构中的插入节点方法
 * @param {Array} originData 数组对象
 * @param {*} insertContent 插入的对象
 * @param {string} [position=''] 被插入对象的id
 * @example
 *  data=[{id:99,name:'1'}]
 *
 * insertNode(data,123,99)
 *
 *==>out data=[{id:99,name:'1',children:[123]}]
 */
function insertNode(originData, insertContent, position = '') {
    const _data = _.cloneDeep(originData)

    const _insert = function (data) {
        for (let i = 0; i < data.length; i++) {
            let hasChildren = _.isArray(data[i].children)
            if (data[i].id === position) {
                if (!hasChildren) {
                    data[i].children = []
                }
                data[i].children.push(insertContent)
                return
            } else {
                if (hasChildren && data[i].children.length > 0) {
                    _insert(data[i].children)
                }
            }
        }
    }

    if (position === '') {
        _data.push(insertContent)
    } else {
        _insert(_data)
    }

    return _data
}

/**
 *更新一个节点的状态
 *
 * @param {*} originData
 * @param {*} updateContent
 * @param {*} position
 * @returns
 */
function updateNode(originData, updateContent, position) {
    const _data = _.cloneDeep(originData)

    const _update = function (data) {
        for (let i = 0; i < data.length; i++) {
            let hasChildren = _.isArray(data[i].children)
            if (data[i].id === position) {
                data[i] = Object.assign(data[i], updateContent)
                return
            } else {
                if (hasChildren && data[i].children.length > 0) {
                    _update(data[i].children)
                }
            }
        }
    }

    return _data
}

const browserUtils = (function () {
    // Browser environment sniffing
    const inBrowser = typeof window !== 'undefined'
    const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
    const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
    const UA = inBrowser && window.navigator.userAgent.toLowerCase()
    return {
        isIE: UA && /msie|trident/.test(UA),
        isIE9: UA && UA.indexOf('msie 9.0') > 0,
        isEdge: UA && UA.indexOf('edge/') > 0,
        isAndroid: (UA && UA.indexOf('android') > 0) || weexPlatform === 'android',
        isIOS: (UA && /iphone|ipad|ipod|ios/.test(UA)) || weexPlatform === 'ios',
        isChrome: UA && /chrome\/\d+/.test(UA) && !(UA && UA.indexOf('edge/') > 0),
        isPhantomJS: UA && /phantomjs/.test(UA),
        isFF: UA && UA.match(/firefox\/(\d+)/)
    }
})()

function parseUri(str) {
    // parseUri 1.2.2
    // (c) Steven Levithan <stevenlevithan.com>
    // MIT License
    // http://blog.stevenlevithan.com/archives/parseuri
    const parseOptions = {
        strictMode: true,
        key: [
            'source',
            'protocol',
            'authority',
            'userInfo',
            'user',
            'password',
            'host',
            'port',
            'relative',
            'path',
            'directory',
            'file',
            'query',
            'anchor'
        ],
        q: {
            name: 'queryKey',
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser: {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
    }

    let o = parseOptions
    let m = o.parser[o.strictMode ? 'strict' : 'loose'].exec(str)
    let uri = {}
    let i = 14

    while (i--) uri[o.key[i]] = m[i] || ''

    uri[o.q.name] = {}
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2
    })

    return uri
}

const UserInput = {
    reg: /^[^\\\/\:\*\?\<\>\|\”\“\"\,\，]+$/, //普通输入,不含逗号
    reg1: /^[^\\\/\:\*\?\<\>\|\”\“\"]+$/, //普通输入,能输入逗号
    reg2: /^[a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)]+$/ //密码
}

function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));

    if (arr != null) return unescape(arr[2]);

    return null;
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    console.log('cookie' + cval)
    if (cval != null) {
        // 这里删除操作其实是将expires过期时间设置为当前时间，使cookie立即过期
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}

export {
    domUtils,
    AES,
    isIE,
    deleteConfirm,
    loading,
    addConfirm,
    dateFormat,
    delay,
    encryptForGCM,
    insertNode,
    updateNode,
    browserUtils,
    getUUID,
    UserInput,
    delCookie
}
