import axios from 'axios'
import {getToken} from "@/utils/token";

// 配置请求实例
const request = axios.create({
    baseURL: 'http://example.com',
    timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use((config)=> {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response)=> {
    console.log(response)
    return response.data
}, (error)=> {
    console.log(error)
    return Promise.reject(error)
})

export { request }
