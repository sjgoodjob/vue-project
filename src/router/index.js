import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/components/Layout.vue'; // Layout 仍然按需加载

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'), // 按需加载 Login 组件
  },
  {
    path: '/user/register',
    name: 'Register',
    component: () => import('@/views/User/Register.vue'), // 按需加载 Register 组件
  },
  {
    path: '/user/forgotpassword',
    name: 'ForgotPassword',
    component: () => import('@/views/User/ForgotPassword.vue'), // 按需加载 Location 组件
  },
  {
    path: '/',
    component: Layout, // Layout 作为父组件
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'), // 按需加载 Home 组件
        meta: { requiresAuth: true }, // 需要身份验证

      },
      {
        path: '/machine/list',
        name: 'MachineList',
        component: () => import('@/views/Machine/List.vue'), // 按需加载 MachineList 组件
        meta: { requiresAuth: true }, // 需要身份验证

      },
      {
        path: '/machine/view',
        name: 'MachineView',
        component: () => import('@/views/Machine/View.vue'), // 按需加载 MachineView 组件
        meta: { requiresAuth: true }, // 需要身份验证

      },
      {
        path: '/event-cloud/list-event-data',
        name: 'ListEventData',
        component: () => import('@/views/EventCloud/ListEventData.vue'), // 按需加载 ListEventData 组件.
        meta: { requiresAuth: true }, // 需要身份验证

      },
      {
        path: '/cloud-setting/create-cloud-setting',
        name: 'CreateCloudSetting',
        component: () => import('@/views/CloudSetting/CreateCloudSetting.vue'), // 按需加载 CreateCloudSetting 组件
        meta: { requiresAuth: true }, // 需要身份验证

      },
      {
        path: '/machine/geolocalization',
        name: 'MapboxMap',
        component: () => import('@/components/MapboxMap.vue'), // 按需加载 MapboxMap 组件
        meta: { requiresAuth: true }, // 需要身份验证

      },
      {
        path: '/location/index',
        name: 'Location',
        component: () => import('@/views/Location/Index.vue'), // 按需加载 Location 组件
        meta: { requiresAuth: true }, // 需要身份验证

      },
      {
        path: '/machine/machine-inventory-location',
        name: 'InventoryLocation',
        component: () => import('@/views/Machine/InventoryLocation.vue'), // 按需加载 Location 组件
        meta: { requiresAuth: true }, // 需要身份验证

      },
      {
        path: '/machine/history',
        name: 'MachineHistory',
        component: () => import('@/views/Machine/History.vue'), // 按需加载 Location 组件
        meta: { requiresAuth: true }, // 需要身份验证

      },
      {
        path: '/user/profile',
        name: 'UserProfile',
        component: () => import('@/views/User/Profile.vue'), // 按需加载 Location 组件
        meta: { requiresAuth: true }, // 需要身份验证

      },
      {
        path: '/documents/upload',
        name: 'DocumentsUpload',
        component: () => import('@/views/Document/Upload.vue'), // 按需加载 Location 组件
        meta: { requiresAuth: true }, // 需要身份验证

      },
     
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 添加导航守卫，保护路由
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authToken'); // 检查本地存储中的 token
  if (to.meta.requiresAuth  && !isAuthenticated) {
    next({ name: 'Login' }); // 如果未登录，跳转到登录页面
  } else {
    next(); // 否则继续访问
  }
});

export default router;
