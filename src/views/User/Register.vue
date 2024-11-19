<template>
    <div class="register-page">
      <!-- 背景图层 -->
      <div style="height: 150px; width: 500px">
      <img src="@/assets/logo_evolve.svg" alt="Evolve Logo" class="logo" />
      </div>
      <!-- 注册表单区域 -->
      <div class="register-container">
         <h2 class="title">用户注册</h2>

        <el-form :model="form" ref="formRef" class="register-form" :rules="rules" label-position="top" label-width="120px">
          <el-form-item label="账户邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱地址" />
          </el-form-item>
          
          <el-form-item label="电子邮件" prop="confirmEmail">
            <el-input v-model="form.confirmEmail" placeholder="确认邮箱地址" />
          </el-form-item>
  
          <el-form-item label="公司名称" prop="company">
            <el-input v-model="form.company" placeholder="请输入公司名称" />
          </el-form-item>
  
          <el-form-item label="国家" prop="country">
            <el-select v-model="form.country" placeholder="请选择国家">
              <el-option label="中国" value="China"></el-option>
              <el-option label="美国" value="USA"></el-option>
              <!-- 添加其他国家选项 -->
            </el-select>
          </el-form-item>
  
          <el-form-item label="省/州/省份" prop="province">
            <el-select v-model="form.province" placeholder="请选择省份">
              <el-option label="湖北" value="Hubei"></el-option>
              <el-option label="北京" value="Beijing"></el-option>
              <!-- 添加其他省份选项 -->
            </el-select>
          </el-form-item>
  
          <el-form-item label="城市/区" prop="city">
            <el-input v-model="form.city" placeholder="请输入城市名称" />
          </el-form-item>
  
          <el-form-item label="地址" prop="address">
            <el-input v-model="form.address" placeholder="请输入地址" />
          </el-form-item>
  
          <el-form-item label="邮政编码" prop="postalCode">
            <el-input v-model="form.postalCode" placeholder="请输入邮政编码" />
          </el-form-item>
  
          <el-form-item label="统一社会信用代码/纳税人识别号" prop="taxId">
            <el-input v-model="form.taxId" placeholder="请输入统一社会信用代码" />
          </el-form-item>
  
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号码" />
          </el-form-item>
  
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入密码" show-password />
          </el-form-item>
  
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="form.confirmPassword" placeholder="确认密码" show-password />
          </el-form-item>
  
          <el-form-item>
            <el-button type="primary" @click="handleRegister" class="register-button">提交</el-button>
          </el-form-item>
  
          <div class="links">
            <a href="#">平台条款与政策</a> | <a href="#">返回登录页面</a>
          </div>
        </el-form>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  
  const form = ref({
    email: '',
    confirmEmail: '',
    company: '',
    country: '',
    province: '',
    city: '',
    address: '',
    postalCode: '',
    taxId: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  
  const rules = {
    email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
    confirmEmail: [{ required: true, message: '请确认邮箱', trigger: 'blur' }],
    company: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
    country: [{ required: true, message: '请选择国家', trigger: 'change' }],
    province: [{ required: true, message: '请选择省份', trigger: 'change' }],
    city: [{ required: true, message: '请输入城市', trigger: 'blur' }],
    address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
    postalCode: [{ required: true, message: '请输入邮政编码', trigger: 'blur' }],
    taxId: [{ required: true, message: '请输入统一社会信用代码', trigger: 'blur' }],
    phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    confirmPassword: [{ required: true, message: '请确认密码', trigger: 'blur' }]
  }
  
  const handleRegister = () => {
    ElMessage.success('注册成功')
    // 在此处添加注册逻辑，例如调用API
  }
  </script>
  
  <style scoped>
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #000;
    font-family: Arial, sans-serif;
  }
  
  /* 背景图层 */

  
  /* 注册页面布局 */
  .register-page {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    box-sizing: border-box;
    padding: 20px 0px;
    background-color: #000;
    flex-wrap: wrap;
    flex-direction: column
  }
  
  .register-container {
    width: 900px;
    padding: 30px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
    text-align: left;
    z-index: 1;
  }
  
  .title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }
  .register-form {
    width: 80%;
    margin:0px auto;
    padding:20px;
    box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
  }

  .register-form .el-input, .register-form .el-select {
    width: 100%;
  }
  
  .register-button {
    width: 100%;
    background-color: #007bff;
    color: white;
    margin-top: 15px;
  }
  
  .links {
    margin-top: 20px;
    font-size: 12px;
    text-align: center;
  }
  
  .links a {
    color: #007bff;
    text-decoration: none;
  }
  </style>
  