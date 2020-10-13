import axios from 'axios';
import { getToken } from '../utils/auth'
import { Loading } from 'element-ui'

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    baseURL: 'http://120.25.24.28/api/',
    timeout: 50000,
    // withCredentials:true
});
service.interceptors.request.use(
    config => {
        let hasToken = getToken()
        if(hasToken){
            config.headers['X-YLPT-Client'] = hasToken
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
        if (response.data.code == 200) {
            return response.data;
        } else {
            Promise.reject();
        }
        return response
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
