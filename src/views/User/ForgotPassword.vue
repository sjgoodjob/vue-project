<template>
    <div class="forgot-password-container">
      <div class="forgot-password-content">
        <img src="@/assets/jte.svg" alt="JTECloud Logo" class="logo" />
        <h2 class="title">佳士云服务</h2>
        <h3 class="subtitle">忘记密码？</h3>
        <p class="description">请输入您账户注册的电子邮件地址，输入验证码以接收重置密码电子邮件：</p>
  
        <el-form :model="form" :rules="rules" ref="formRef" class="form">
          <el-form-item prop="email">
            <el-input v-model="form.email" placeholder="电子邮件地址" />
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input v-model="form.captcha" placeholder="验证码">
              <template #prepend>
                <img :src="captchaImage" alt="验证码" class="captcha-image" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" style="width: 100%;" color="#1B5FA7">发送重置电子邮件</el-button>
          </el-form-item>
          <el-link @click="goBack" class="back-link">返回登录页面</el-link>
        </el-form>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import { useRouter } from 'vue-router';

  const form = ref({
    email: '',
    captcha: ''
  });
  const router = useRouter();

  const captchaImage = 'https://cloud.jasic.com.cn/site/captcha?v=67358620c785e6.26430743'; // 替换为实际验证码图片路径
  
  const rules = ref({
    email: [
      { required: true, message: '请输入电子邮件地址', trigger: 'blur' },
      { type: 'email', message: '电子邮件格式不正确', trigger: 'blur' }
    ],
    captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
  });
  
  const formRef = ref(null);
  
  const onSubmit = () => {
    formRef.value.validate((valid) => {
      if (valid) {
        // 在这里调用API发送重置密码的请求
        ElMessage.success('重置密码电子邮件已发送');
      } else {
        ElMessage.error('请填写所有必填字段');
      }
    });
  };
  
  const goBack = () => {
    // 返回登录页面的逻辑
    router.back();


  };
  </script>
  
  <style scoped>
  .forgot-password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #000;
    background-image: url('@/assets/forgotpassword.jpg'); /* 替换为实际背景图片路径 */
    background-size: cover;
    background-position: center;
    width: 100vw;
    background-repeat: no-repeat;
  }
  
  .forgot-password-content {
    padding: 40px;
    border-radius: 8px;
    width: 450px;
    text-align: center;
    color: #fff;
  }
  
  .logo {
    width: 200px;
    margin-bottom: 20px;
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: left;

  }
  
  .subtitle {
    font-size: 18px;
    margin-bottom: 10px;
    text-align: left;
  }
  
  .description {
    font-size: 14px;
    margin-bottom: 20px;
    text-align: left;

  }
  
  .form {
    text-align: left;
  }
  
  .captcha-image {
    width: 80px;
    height: 40px;
    cursor: pointer;
  }
  
  .back-link {
    color: #409eff;
    display: block;
    text-align: center;
    margin-top: 20px;
  }
  </style>
  