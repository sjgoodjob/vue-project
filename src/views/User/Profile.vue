<template>
    <PageHeader title="信息页面" />
    <el-row :gutter="20" class="el-row">
      <!-- 用户信息卡片 -->
      <el-col :span="12">
        <el-card class="box-card">
          <h3 class="card-title">用户信息</h3>
          <el-form label-width="150px" class="el-form" :model="userForm" label-position="left" :rules="rules" ref="userFormRef">
            <el-form-item label="名称" prop="name" class="form-item">
              <div v-if="!isEditingUser">{{ userForm.name }}</div>
              <el-input v-else v-model="userForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="电子邮件" prop="email" class="form-item">
              <div v-if="!isEditingUser">{{ userForm.email }}</div>
              <el-input v-else v-model="userForm.email" placeholder="请输入电子邮件"></el-input>
            </el-form-item>
            <el-form-item label="移动电话号码" prop="mobile" class="form-item">
              <div v-if="!isEditingUser">{{ userForm.mobile || '未填写' }}</div>
              <el-input v-else v-model="userForm.mobile" placeholder="请输入电话号码"></el-input>
            </el-form-item>
            <el-form-item label="注册时间">
              <div>{{ userForm.registrationTime }}</div>
            </el-form-item>
            <el-form-item>
             
            </el-form-item>
          </el-form>
          <el-button v-if="isEditingUser" @click="cancelUserEdit" type="primary" plain>取消</el-button>
              <el-button v-if="isEditingUser" @click="onSubmit" type="primary"  style="width:250px">保存</el-button>
              <el-button v-else @click="editUserInfo" type="primary" plain>编辑</el-button>
        </el-card>
      </el-col>
  
      <!-- 公司信息卡片 -->
      <el-col :span="12">
        <el-card class="box-card">
          <h3 class="card-title">公司信息</h3>
          <el-form label-width="80px" class="el-form" label-position="left">
            <el-form-item label="公司名称">
              <div v-if="!isEditingCompany">{{ companyInfo.name }}</div>
              <el-input v-else v-model="companyInfo.name" placeholder="请输入公司名称"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <div v-if="!isEditingCompany">{{ companyInfo.address }}</div>
              <el-input v-else v-model="companyInfo.address" placeholder="请输入地址"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
              <div v-if="!isEditingCompany">{{ companyInfo.phone }}</div>
              <el-input v-else v-model="companyInfo.phone" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="电子邮件">
              <div v-if="!isEditingCompany">{{ companyInfo.email }}</div>
              <el-input v-else v-model="companyInfo.email" placeholder="请输入电子邮件"></el-input>
            </el-form-item>
            <el-form-item>
             
            </el-form-item>
          </el-form>
          <el-button v-if="isEditingCompany" @click="cancelCompanyEdit" type="primary" plain>取消</el-button>
              <el-button v-if="isEditingCompany" @click="saveCompanyInfo" type="primary" style="width:250px">保存</el-button>
          <el-button v-else @click="editCompanyInfo" type="primary" plain>编辑</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="box-card" >
    <h3 class="card-title">我的机器</h3>
    <el-divider></el-divider>
    <el-row :gutter="20" justify="center">
      <el-col v-for="(machine, index) in machines" :key="index" :span="3" class="machine-card">
        <el-card shadow="hover" class="machine-item">
          <img :src="machine.image" alt="machine image" class="machine-image" />
          <div class="machine-info">
            <h4 class="machine-id">{{ machine.id }}</h4>
            <p class="machine-name">{{ machine.name }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import PageHeader from '@/components/PageHeader.vue';
  import axios from 'axios'; // 引入 axios
  import { ElMessage } from 'element-plus';

  const isEditingUser = ref(false);
  const isEditingCompany = ref(false);
  const originalUserFormData = ref<UserForm | null>(null); // 初始化为 null

  const machines = ref([
  { id: 'AAXA23BEB01682', name: 'EVOLVE 300', image: 'https://cloud.jasic.com.cn/images/Machines/AA/display.png' },
  { id: 'ABXA23BJB01688', name: 'EVOLVE 400', image: 'https://cloud.jasic.com.cn/images/Machines/AA/display.png' },
  { id: 'ABXA23BQB01695', name: 'EVOLVE 400', image: 'https://cloud.jasic.com.cn/images/Machines/AA/display.png' },
  { id: 'ACXA22ATB01697', name: 'EVOLVE 500', image: 'https://cloud.jasic.com.cn/images/Machines/AA/display.png' },
  { id: 'ACXA22ATB02698', name: 'EVOLVE 500', image: 'https://cloud.jasic.com.cn/images/Machines/AA/display.png' },
  { id: 'ACXA22ATB05701', name: 'EVOLVE 500', image: 'https://cloud.jasic.com.cn/images/Machines/AA/display.png' },
  { id: 'ACXA23BLB01691', name: 'EVOLVE 500', image: 'https://cloud.jasic.com.cn/images/Machines/AA/display.png' },
  { id: 'RAAA21ACB24676', name: 'EVOLVE 200', image: 'https://cloud.jasic.com.cn/images/Machines/AA/display.png' },
  { id: 'AAXA23BEB01682', name: 'EVOLVE 300', image: 'https://cloud.jasic.com.cn/images/Machines/AA/display.png' },
  { id: 'ABXA23BJB01688', name: 'EVOLVE 400', image: 'https://cloud.jasic.com.cn/images/Machines/AA/display.png' },
  { id: 'ABXA23BQB01695', name: 'EVOLVE 400', image: 'https://cloud.jasic.com.cn/images/Machines/AA/display.png' },
  { id: 'ACXA22ATB01697', name: 'EVOLVE 500', image: 'https://cloud.jasic.com.cn/images/Machines/AA/display.png' },
  { id: 'ACXA22ATB02698', name: 'EVOLVE 500', image: 'https://cloud.jasic.com.cn/images/Machines/AA/display.png' },
  { id: 'ACXA22ATB05701', name: 'EVOLVE 500', image: 'https://cloud.jasic.com.cn/images/Machines/AA/display.png' },
  { id: 'ACXA23BLB01691', name: 'EVOLVE 500', image: 'https://cloud.jasic.com.cn/images/Machines/AA/display.png' },
  { id: 'RAAA21ACB24676', name: 'EVOLVE 200', image: 'https://cloud.jasic.com.cn/images/Machines/AA/display.png' },
]);

interface UserForm {
  name: string;
  email: string;
  mobile: string;
  registrationTime: string;
}
const userForm = ref<UserForm>({
  name: 'jasic-lab-test',
  email: 'hanruihong@jasic.com.cn',
  mobile: '',
  registrationTime: '2022-01-17 11:02:38',
});
  
  const companyInfo = ref({
    name: 'JASIC',
    address: 'No. 3, Qinglan 1st Road, Pingshan New District, Shenzhen, China',
    phone: '+8615919994516',
    email: 'hanruihong@jasic.com.cn',
  });
  
  const editUserInfo = () => {
    isEditingUser.value = true;
    originalUserFormData.value = JSON.parse(JSON.stringify(userForm.value));

  };
  
  const cancelUserEdit = () => {
    userForm.value = JSON.parse(JSON.stringify(originalUserFormData.value));
    console.log(originalUserFormData.value)

    isEditingUser.value = false;
    // 在取消时恢复用户信息原始数据
  };

  const onSubmit = () => {
  userFormRef.value.validate((valid) => {
    if (valid) {
      saveUserInfo();
    } else {
      ElMessage.error('请检查输入项的格式');
    }
  });
};
  
  const saveUserInfo = async () => {
  try {
    const { registrationTime, ...dataToSave } = userForm.value;

    const response = await axios.post('/api/saveUserInfo', dataToSave);
    console.log('User info saved:', response.data);
    isEditingUser.value = false;
    // 处理保存成功后的逻辑，比如提示用户
  } catch (error) {
    console.error('Error saving user info:', error);
    // 处理错误，比如向用户显示错误提示
  }
};
  
  const editCompanyInfo = () => {
    isEditingCompany.value = true;
  };
  
  const cancelCompanyEdit = () => {
    isEditingCompany.value = false;
    // 在取消时恢复公司信息原始数据
    // companyInfo.value = { ...originalCompanyInfoData }; // 恢复初始数据
  };
  
  const userFormRef = ref(null);

    const rules = ref({
    name: [
        { required: true, message: '名称不能为空', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '电子邮件不能为空', trigger: 'blur' },
        { type: 'email', message: '电子邮件格式不正确', trigger: ['blur', 'change'] }
    ],
    mobile: [
        { required: true, message: '电话号码不能为空', trigger: 'blur' },
        { pattern: /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10,13}$/, message: '电话号码格式不正确', trigger: ['blur', 'change'] }
    ]
    });
  const saveCompanyInfo = async () => {
  try {
    
    const response = await axios.post('/api/saveCompanyInfo', companyInfo.value);
    console.log('Company info saved:', response.data);
    isEditingCompany.value = false;
    // 处理保存成功后的逻辑，比如提示用户
  } catch (error) {
    console.error('Error saving company info:', error);
    // 处理错误，比如向用户显示错误提示
  }
};
  </script>
  
  <style scoped>
  .box-card {
    border-radius: 4px;
    margin-left: 20px;
    margin-bottom: 20px;
    border: 2px solid #1b5fa7;
    border-top: 4px solid #1b5fa7;
  }
  :deep(.el-form-item__label){
    font-weight: bold;
  }
  :deep(.el-form-item__content div){
    width: 100%;
    text-align: right;
  }
  .card-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }



.card-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.machine-card {
  text-align: center;
  margin-top: 15px;
}

.machine-item {
  padding: 10px;
  text-align: center;
}

.machine-image {
  width: 100%;
  height: auto;
  max-width: 120px;
  margin: 0 auto 10px;
}

.machine-info {
  margin-top: 10px;
}

.machine-item:hover {
  box-shadow: 0px 4px 20px rgba(0, 123, 255, 0.3);
  border: 1px solid #409eff;
}
.machine-id {
  font-size: 14px;
  font-weight: bold;
  color: #409eff;
}

.machine-name {
  font-size: 12px;
  color: #909399;
}

.el-form{
      border: 1px solid #DDD;
      border-radius: 4px;
      padding: 10px 20px;
      margin-bottom: 10px;


}
  </style>
  