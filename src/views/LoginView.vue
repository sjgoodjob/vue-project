<template>
  <div class="login-page">
    <!-- 背景图层 -->
    <div class="background-image"></div>

    <!-- 登录表单区域 -->
    <div class="login-container">
      <img src="@/assets/jte.svg" alt="JTE Cloud Logo" class="logo" />
      <h2 class="title">佳士 云服务</h2>
      <p class="subtitle">登录开始您的会话</p>

      <el-form :model="form" ref="formRef" class="login-form">
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="邮箱地址" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" :placeholder=" t('password') " show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" class="login-button">登录</el-button>
        </el-form-item>
      </el-form>

      <div class="links">
        <router-link to="/user/register">注册新会员</router-link> | <router-link to="/user/forgotpassword">忘记密码</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'vue-router'; // 导入 useRouter

import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const router = useRouter(); // 使用 useRouter 获取路由实例

const form = ref({
  email: '',
  password: '',
  deviceUUID:''
})

  



const handleLogin = () => {
  const formData = new FormData()
  formData.append('deviceUUID', uuidv4())
  formData.append('email', form.value.email)
  formData.append('password', form.value.password)
  if (form.value.email && form.value.password) {
    // 发送登录请求
   axios.post('/v1/user/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .then(response => {
      if (response.data.code === 1) {
        // 登录成功，保存 token 和用户信息
        localStorage.setItem('authToken', response.data.data.userAuthToken)
        
        ElMessage.success('登录成功')
        // 跳转到首页或其他页面
        router.push('/machine/view'); // 使用 Vue Router 跳转
      } else {
        ElMessage.error(response.data.message || '登录失败')
      }
    })
    .catch(error => {
      if (error.response) {
        // 服务器响应了一个状态码 (如 500)
        const errorMessage = error.response.data.message || '登录请求失败，请稍后重试';
        ElMessage.error(errorMessage); // 显示具体的错误信息
      } else {
        // 其他网络错误
        ElMessage.error('网络错误，请稍后重试');
      }
    })
  } else {
    ElMessage.error('请输入邮箱和密码')
  }
}
</script>

<style scoped>
/* 背景图片 */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img_login.webp'); /* 将此路径替换为你的背景图路径 */
  background-size: cover;
  background-position: center;
  z-index: -1;
}

/* 登录页面布局 */
.login-page {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: flex-end; /* 水平居右 */
  height: 100vh;
  width: 100vw;
  padding-right: 10%;
}

.login-container {
  width: 300px;
  border-radius: 8px;
  text-align: center;
  z-index: 1;
}

.logo {
  width: 260px;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.login-form .el-input {
  width: 100%;
  margin-bottom: 15px;
}

.login-button {
  width: 100%;
  background-color: #007bff;
  color: white;
}

.links {
  margin-top: 10px;
  font-size: 12px;
}

.links a {
  color: #007bff;
  text-decoration: none;
}
</style>
