import request from '../request';
import requestUrl from '../requestUrl';
import requestParam from '../requestParam';

/**
 * 用户登陆 post Demo
 * @param {*} s
 */
export const login = params => {
    return request({
        url: requestUrl('/kcc/client/user/login'),
        method: 'post',
        data: requestParam(params)
    });
};


/**
 * get Demo
 * @param {*} s
 */
export const authUser = params => {
    return request({
        url: requestUrl('/kcc/user/auth'),
        method: 'get',
        params: requestParam(params, 'get'),
    });
};


/**
 * 文件下载（response 返回文件流）
 * @param {*} s
 */
export const downLoadDemo = params => {
    return request({
        url: requestUrl('/kcc/client/clientStatAccState/export'),
        method: 'post',
        data: requestParam(params),
        responseType: 'blob'
    })
}

/**
 * 文件上传
 * @param {*} s
 */
export const uploadDemo = params => {
    return request({
        url: requestUrl('/kcc/client/pbcGroup/uploadPbcFiles'),
        method: 'post',
        data: params,
        timeout: 900000,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};


export function queryLabelList(params) {
    return request({
        url: requestUrl("/kaico/v1/label/dictionary/list"),
        method: "post",
        data: requestParam(params)
    });
}
