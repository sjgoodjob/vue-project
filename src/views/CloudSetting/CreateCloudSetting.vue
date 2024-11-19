<template>
    <PageHeader
            title="创建新应用"
        />
    <el-form :model="form" ref="formRef" label-width="100px" :rules="rules" class="custom-form" label-position="top">
      <el-row :gutter="20">
        <!-- 三列布局 -->
        <el-col :span="8">
          <el-form-item label="机器型号" prop="machineType1">
            <el-select v-model="form.machineType1" placeholder="请选择机器型号">
              <el-option label="型号 1" value="model1" />
              <el-option label="型号 2" value="model2" />
              <!-- 添加更多选项 -->
            </el-select>
          </el-form-item>
        </el-col>
  
        <el-col :span="8">
          <el-form-item label="机器型号" prop="machineType2">
            <el-select v-model="form.machineType2" placeholder="请选择机器型号">
              <el-option label="型号 1" value="model1" />
              <el-option label="型号 2" value="model2" />
              <!-- 添加更多选项 -->
            </el-select>
          </el-form-item>
        </el-col>
  
        <el-col :span="8">
          <el-form-item label="分类" prop="category">
            <el-select v-model="form.category" placeholder="请选择分类">
              <el-option label="分类 A" value="categoryA" />
              <el-option label="分类 B" value="categoryB" />
              <!-- 添加更多选项 -->
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
  
      <!-- 独立一列布局 -->
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="简短的介绍" prop="introduction">
            <el-input
              type="textarea"
              v-model="form.introduction"
              placeholder="请输入简短介绍"
              :rows="3"
            />
          </el-form-item>
          <el-form-item label="描述" prop="description" class="editor">
            <QuillEditor v-model:content="form.description" toolbar="full"  />
        </el-form-item>
        </el-col>
      </el-row>
        <el-row :gutter="20">
        <el-col :span="12">
            <el-form-item label="技术规格">

                <el-upload
                    class="upload-demo"
                    drag
                    multiple
                    :file-list="form.techFiles"
                            list-type="picture"


                >
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                    </div>
                    <template #tip>
                    <div class="el-upload__tip">
                        jpg/png files with a size less than 500kb
                    </div>
                    </template>
                </el-upload>
        </el-form-item>
    </el-col>
  
        <el-col :span="12">
        <!-- 图片上传 -->
        <el-form-item label="图片">
            <el-upload
                class="upload-demo"
                drag
                multiple
                :file-list="form.imageFiles"
            >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
                </div>
                <template #tip>
                <div class="el-upload__tip">
                    jpg/png files with a size less than 500kb
                </div>
                </template>
            </el-upload>
        </el-form-item>
    </el-col>
    </el-row>
      <!-- 描述和提交按钮 -->
    
      <el-row :gutter="20">
      <!-- 左边布局 -->
      <el-col :span="12">
        <!-- 上部两列 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="可见的">
              <el-select v-model="form.visible" placeholder="选择可见性">
                <el-option label="Yes" value="yes" />
                <el-option label="No" value="no" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="购买">
              <el-select v-model="form.purchase" placeholder="选择购买状态">
                <el-option label="Yes" value="yes" />
                <el-option label="No" value="no" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 下部全宽 -->
        <div class="module-container">
            <div class="module-header">要启用的参数</div>
            <div class="inline-container">
            <el-select v-model="form.parameter" placeholder="选择参数" class="select-with-button">
                <el-option v-for="option in parameters" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
            <el-button  color="#0C845D" @click="addParameter" class="add-button">添加</el-button>
            </div>
        </div>

        <div class="module-container">
            <div class="module-header">要启用的选项</div>
            <div class="inline-container">
            <el-select v-model="form.parameter" placeholder="选择参数" class="select-with-button">
                <el-option v-for="option in parameters" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
            <el-button  color="#0C845D" @click="addParameter" class="add-button">添加</el-button>
            </div>
        </div>

        <div class="module-container">
            <div class="module-header">要启用的焊接程序</div>
            <div class="inline-container">
            <el-select v-model="form.parameter" placeholder="选择参数" class="select-with-button">
                <el-option v-for="option in parameters" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
            <el-button  color="#0C845D" @click="addParameter" class="add-button">添加</el-button>
            </div>
        </div>
      </el-col>

      <!-- 右边布局 -->
      <el-col :span="12">
        <!-- 上部两列 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="可更改">
              <el-select v-model="form.editable" placeholder="选择可更改性">
                <el-option label="Yes" value="yes" />
                <el-option label="No" value="no" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="默认激活">
              <el-select v-model="form.defaultActive" placeholder="选择激活状态">
                <el-option label="Yes" value="yes" />
                <el-option label="No" value="no" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 下部全宽 -->
        <div class="module-container">
          <div class="module-header">要禁用的参数</div>
          <div class="inline-container">

          <el-select v-model="form.disabledParameter" placeholder="选择参数">
            <el-option v-for="option in parameters" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
          <el-button  color="#0C845D" @click="addDisabledParameter" class="add-button">添加</el-button>
          </div>
        </div>
      </el-col>
    </el-row>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { ref,onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  import PageHeader from '@/components/PageHeader.vue'

  const handleUploadSuccess = (response, file, fileList) => {
  console.log('文件上传成功', file.name)
}

const addParameter = () => {
  console.log(`添加参数：${form.value.parameter}`)
}

const parameters = [
  { label: '参数1', value: 'param1' },
  { label: '参数2', value: 'param2' },
  // 添加更多参数选项
]

const addDisabledParameter = () => {
  console.log(`添加禁用参数：${form.value.disabledParameter}`)
}
  const form = ref({
    techFiles: [],
    imageFiles: [],
    machineType1: '',
    machineType2: '',
    category: '',
    introduction: '',
    description: '',
    visible: 'no',
    purchase: 'no',
    editable: 'no',
    defaultActive: 'no',
  })
  const modules = ref([
  {
    title: '要启用的参数',
    selectedOption: null,
    options: [
      { label: '选项1', value: 'option1' },
      { label: '选项2', value: 'option2' },
    ],
  },
  {
    title: '要启用的选项',
    selectedOption: null,
    options: [
      { label: '选项1', value: 'option1' },
      { label: '选项2', value: 'option2' },
    ],
  },
  {
    title: '要启用的程序',
    selectedOption: null,
    options: [
      { label: '程序1', value: 'program1' },
      { label: '程序2', value: 'program2' },
    ],
  },
  {
    title: '要禁用的参数',
    selectedOption: null,
    options: [
      { label: '选项1', value: 'option1' },
      { label: '选项2', value: 'option2' },
    ],
  },
  {
    title: '要禁用的选项',
    selectedOption: null,
    options: [
      { label: '选项1', value: 'option1' },
      { label: '选项2', value: 'option2' },
    ],
  },
  {
    title: '要禁用的程序',
    selectedOption: null,
    options: [
      { label: '程序1', value: 'program1' },
      { label: '程序2', value: 'program2' },
    ],
  },
])

const addOption = (module) => {
  console.log(`添加 ${module.selectedOption} 到 ${module.title}`)
}
  const rules = {
    machineType1: [{ required: true, message: '请选择机器型号', trigger: 'change' }],
    machineType2: [{ required: true, message: '请选择机器型号', trigger: 'change' }],
    category: [{ required: true, message: '请选择分类', trigger: 'change' }],
    introduction: [{ required: true, message: '请输入简短介绍', trigger: 'blur' }],
    description: [{ required: true, message: '请输入描述', trigger: 'blur' }]
  }
  
  const formRef = ref()
  const editorOptions = {
    height: '300px' // 设置编辑器高度

  }
  
  const setQuillHeight = () => {
  const editorContainer = document.querySelector('.quill-editor .ql-container')
  if (editorContainer) {
    editorContainer.style.height = '300px'
  }
}

onMounted(() => {
  setQuillHeight()
})


  const submitForm = () => {
    formRef.value.validate((valid: boolean) => {
      if (valid) {
        ElMessage.success('表单提交成功')
        // 在此处处理表单数据
      } else {
        ElMessage.error('请填写完整信息')
      }
    })
  }
  
  const resetForm = () => {
    formRef.value.resetFields()
  }
  </script>
  
  <style scoped>
  .custom-form {
    max-width: 100%; /* 控制表单的总宽度 */
    margin: 0 auto;
    padding:0px 10px;
  }
  :deep(.editor .el-form-item__content){
    display:flex;
    flex-direction:column;
    flex-wrap:nowrap;
    align-items:stretch !important;
    height:250px;
  }

  .upload-demo{
    width:100%
  }

  .module-row {
  margin-top: 20px;
}

.module-container {
  border: 1px solid #ccc;
  padding-bottom: 16px;
  border-radius: 8px;
  margin-top:15px;
  padding-top:0px;

}

.module-header {
  background-color: #1b5fa7;
  color: white;
  padding: 8px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;

}

/* 新增的样式，用于实现按钮和选择框同一行 */
.inline-container {
  display: flex;
  gap: 10px; /* 控制按钮和选择框之间的间距 */
  align-items: center; /* 垂直居中对齐 */
  margin:0px 10px;
}

.select-with-button {
  flex: 1; /* 使选择框占据剩余空间 */
}

.add-button {
  white-space: nowrap; /* 防止按钮内容换行 */
}
  </style>
  