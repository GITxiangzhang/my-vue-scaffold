import axios from 'axios';
import router from '@/router';
import { Message } from 'element-ui';

const service = axios.create({
    /* // process.env.NODE_ENV === 'development' 来判断是否开发环境
     baseURL: process.env.NODE_ENV === 'development'?'http://localhost:8080/api/':'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
     */
    timeout: 1000 * 3,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
});

service.interceptors.request.use(
    config => {
        if (sessionStorage.getItem('JSESSIONID')) {
            //jwt授权设置请求头
            config.headers.Authorization = sessionStorage.getItem('JSESSIONID');
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        //最后统一处理
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    sessionStorage.removeItem('JSESSIONID');
                    router.replace({ name: 'login' });
                    break;
                case 400:
                    Message.error('bad request！');
                    break;
                case 403:
                    Message.error('unauthorized!');
                    break;
                case 500:
                    Message.error('servers error！');
                    break;
            }
        }
    }
);

export default service;
