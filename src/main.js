import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import i18n from './i18n'; // 引入 i18n 配置
import router from './router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { mockXHR } from "@/mock/index";
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

const app = createApp(App);

// 设置 Axios 的请求拦截器
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken'); // 从 localStorage 获取 token
    console.log(token);
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // 添加到请求头中
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 设置 Axios 的响应拦截器
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        // 处理 Token 过期的情况
        ElMessage.error('您的会话已过期，请重新登录。');
        localStorage.removeItem('authToken'); // 清除过期的 token
        router.push('/login'); // 跳转到登录页面
    }
    return Promise.reject(error);
});

// 注册 Element Plus 的图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// 在开发环境中启用 mock
if (import.meta.env.MODE === "development") {
     //mockXHR(); // 如果需要的话，取消注释
}
app.config.globalProperties.$axios = axios

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(i18n);
app.mount('#app');
