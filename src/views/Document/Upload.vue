<template>
  <el-card class="upload-card">
    <!-- 标题栏 -->
    <div class="upload-header">
      <span>上传新文件</span>
    </div>

    <!-- 表单内容 -->
    <el-form :model="form" ref="formRef" label-width="300px" class="upload-form" label-position="left"  v-loading="loading">
      <el-form-item label="文件名">
        <el-input v-model="form.name" placeholder="请输入文件名"></el-input>
      </el-form-item>

      <el-form-item label="文件类型">
        <el-select v-model="form['document-type']" placeholder="请选择文件类型">
          <el-option label="用户指南" value="User Guide"></el-option>
          <el-option label="说明书" value="Instructions"></el-option>
          <el-option label="手册" value="Brochure"></el-option>
          <el-option label="规格" value="Specifications"></el-option>
          <el-option label="目录" value="Catalog"></el-option>
          <el-option label="附加组件" value="Addons"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="组件" v-if="form['document-type'] === 'Addons'">
        <el-select v-model="form.addon" placeholder="请选择组件">
          <el-option v-for="option in addonOptions" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.description" placeholder="请输入描述"></el-input>
      </el-form-item>

      <el-form-item label="适用于机器型号">
        <el-select v-model="form['machine-model']" placeholder="请选择机器型号">
          <el-option v-for="option in machineModelOptions" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="文档语言">
        <el-select v-model="form.language" placeholder="请选择语言">
          <el-option label="英语" value="en-US"></el-option>
          <el-option label="中文" value="zh-CN"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="选择机器规格">
        <el-select v-model="form.machineVersions" multiple placeholder="请选择机器规格">
          <el-option v-for="option in machineVariantOptions" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="仅适用于个人用户资料">
        <el-select v-model="form['user-profile']" multiple placeholder="请选择用户资料">
          <el-option v-for="option in userProfileOptions" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="选择一个文件">
        <el-upload
          ref="uploadRef"
          :file-list="form.fileList"
          list-type="text"
          :auto-upload="false"
          accept=".pdf"
          :limit="1"
          @change="handleFileChange"
        >
          <el-button type="primary">选择文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传 PDF 文件，且大小不超过 10MB</div>
        </el-upload>
      </el-form-item>
   
      <el-form-item>
        <el-button type="primary" @click="submitForm" >上传</el-button>
      </el-form-item>
            
    </el-form>

  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';

// 上传进度相关
const loading = ref(false)

const handleFileChange = (file, fileList) => {
  // 验证文件大小
  if (file.size / 1024 / 1024 > 100) {
    ElMessage.error('文件大小不能超过 100MB');
    form.value.fileList = fileList.filter((f) => f.uid !== file.uid); // 移除不符合条件的文件
    return;
  }


  form.value.fileList = [file];


};
// 表单数据
const form = ref({
  name: '', // 文件名
  'document-type': '', // 文件类型
  addon: '', // 组件（仅当文件类型为 Addons 时需要）
  description: '', // 描述
  'machine-model': '', // 适用于机器型号
  language: '', // 文档语言
  machineVersions: [], // 选择机器规格
  'user-profile': [], // 仅适用于个人用户资料
  fileList: [] // 上传的文件列表
});

// 组件选项
const addonOptions = [
  { label: '禁用web访问', value: '6' },
  { label: '锁定电压降低装置打开', value: '7' },
  { label: '脉冲SG2 1.0', value: '8' }
];
const machineModelOptions = [
  { label: '所有', value: '' },
  { label: 'EVOLVE 200', value: 'RA' },
  { label: 'EVOLVE 200 PLUS', value: 'RB' },
  { label: 'EVOLVE 300', value: 'AA' }
];
const machineVariantOptions = [
  { label: 'Default', value: 'Default' },
  { label: 'JTE', value: 'JTE' },
  { label: 'Variant 1', value: 'Variant 1' },
  { label: 'Variant 2', value: 'Variant 2' }
];
const userProfileOptions = [
  { label: '管理者', value: 'Supervisor' },
  { label: '服务', value: 'Service' },
  { label: '经销商', value: 'Dealer' },
  { label: '客户', value: 'Customer' }
];

// 文件选择回调
const handleBeforeUpload = (file) => {

  if (file.size / 1024 / 1024 > 100) {
    ElMessage.error('文件大小不能超过100MB');
    return false;
  }
  form.value.fileList.push(file);
  return false;
};


// 提交表单
const submitForm = async () => {
  if (!form.value.name || !form.value['document-type'] || form.value.fileList.length === 0) {
    ElMessage.error('请填写完整信息并选择文件');
    return;
  }
  loading.value = true; // 状态显示完成

  const formData = new FormData();
  formData.append('name', form.value.name);
  formData.append('document-type', form.value['document-type']);
  if (form.value.addon) formData.append('addon', form.value.addon);
  formData.append('description', form.value.description);
  formData.append('machine-model', form.value['machine-model']);
  formData.append('language', form.value.language);
  form.value.machineVersions.forEach((version) => formData.append('machineVersions[]', version));
  form.value['user-profile'].forEach((profile) => formData.append('user-profile[]', profile));
  formData.append('DocumentUpload[documentFile]', form.value.fileList[0].raw);


  try {
    const response = await axios.post('/v1/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    if (response.data.status === 'success') {
      loading.value = false; // 状态显示完成

      ElMessage.success('文件上传成功');
      form.value = {
        name: '',
        'document-type': '',
        addon: '',
        description: '',
        'machine-model': '',
        language: '',
        machineVersions: [],
        'user-profile': [],
        fileList: []
      };
    } else {
      ElMessage.error(response.data.message || '上传失败');
    }
  } catch (error) {
    ElMessage.error('上传时发生错误，请稍后重试');
    console.error(error);
  }
};
</script>
<style scoped>
:deep(.el-form-item__label) {
  font-weight: bold;
}

.upload-card {
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 20px;
}
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  max-width: 600px;
}
.upload-header {
  background-color: #1e5aa9;
  color: white;
  padding: 16px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

:deep(.el-card__body) {
  padding: 0px;
}

.upload-form {
  margin-top: 40px;
  width: 50%;
  margin-left: 50px;
}

.upload-form .el-form-item {
  margin-bottom: 20px;
}

.upload-demo {
  width: 100%;
}

.el-upload__tip {
  font-size: 12px;
  color: #999;
}
</style>