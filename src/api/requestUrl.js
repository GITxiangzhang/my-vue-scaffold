/**
 * 请求地址统一处理／组装
 * @param {*} actionName action方法名称
 */
export default function(actionName) {
    return (process.env.NODE_ENV !== 'development' ? '' : '') + actionName;
}
