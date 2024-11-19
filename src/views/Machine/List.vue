<template>
    <el-row>
        <!-- 标题和刷新、导出按钮 -->
        <el-col :span="24">
        <PageHeader
            title="机器清单管理"
            exportButtonText="导出选项"
            @back="handleBack"
            @print="handlePrint"
        />
        <SearchForm
            :fields="searchFields"
            :modelValue="searchForm"
            @search="handleSearch"
            @reset="resetSearch"
            />
        <!-- 表格内容 -->
        <MachineTable
            :tableData="finaltableData"
            :loading="loading"
            :columns="tableColumns"
            :expandedRowKeys="expandedRowKeys"
            :isAllExpanded="isAllExpanded"
            :enableExpand="enableExpand"
            :expandedContent="expandedContent"
            :uniqueKey="uniqueKey"
            @view-details="handleViewDetails"
            @toggle-expand-all="toggleExpandAll"        />

        <!-- 总条目数量和分页控件 -->
        <PaginationFooter
            :totalItems="totalItems"
            :pageSize="pageSize"
            @current-change="handlePageChange"
            />
</el-col>
    </el-row>
    <el-backtop :right="100" :bottom="100" />

</template>
  



  
<script lang="ts" setup>
import { ref,computed,onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import PageHeader from '@/components/PageHeader.vue'
import MachineTable from '@/components/Table.vue'
import PaginationFooter from '@/components/PaginationFooter.vue'
import SearchForm from '@/components/SearchForm.vue'


// 管理展开行的键值
const expandedRowKeys = ref([]);

// 计算所有行是否已展开
const isAllExpanded = computed(() => expandedRowKeys.value.length === finaltableData.value.length);


// 切换展开/折叠所有行
const toggleExpandAll = () => {
  if (isAllExpanded.value) {
    expandedRowKeys.value = []; // 如果全部展开，则清空以折叠所有行
  } else {
    expandedRowKeys.value = finaltableData.value.map((item, index) =>
      uniqueKey.value ? item[uniqueKey.value] : index
    ); // 否则展开所有行
  }
};


// 动态控制是否启用折叠功能
const enableExpand = ref(false);

// 展开内容的数据
const expandedContent = ref({
  'RBYA22BUB01716': { detail1: '这是第一行的详细信息 1', detail2: '这是第一行的详细信息 2' },
  1: { detail1: '这是第二行的详细信息 1', detail2: '这是第二行的详细信息 2' }
});

// 唯一标识字段名称（可以留空，使用行索引）
const uniqueKey = ref('machineSerial');
// 处理返回和打印事件
const handleBack = () => {
  console.log("返回上一页")
}

const handlePrint = () => {
  console.log("打印内容")
}

const handleViewDetails = () => {
  console.log("打印内容")
}

const loading = ref(false)

const tableData = ref([])

const finaltableData = ref([])

const totalItems = ref(0)
const pageSize = 20
const currentPage = ref(1)
const customers = ref({})
const machineModels = ref({})
const machineVersion = ref({})
const testCodes = ref({})


// 表格列定义
const tableColumns = ref([
  { prop: 'name', label: '名称', sortable: true },
  { prop: 'machineSerial', label: '机器序列号', sortable: true },
  { prop: 'machineModelID', label: '机器型号编码' },
  { prop: 'customerID', label: '所有者' },
  { prop: 'versionID', label: '变体' },
  { prop: 'maximumFirmware', label: '机器固件' },
  { prop: 'lastDiterFirmwareUpdate', label: '用户界面固件' },
  { prop: 'registrationDate', label: '注册日期' },
  { prop: 'lastUsed', label: '最后使用' },
  { prop: 'testCodeID', label: '机器的类型' },
  { prop: 'forcedMachineFirmware', label: '强制机器固件' },
  { prop: 'forcedDiterFirmware', label: '强制用户界面固件' },
])

// 搜索表单字段定义
const searchFields = ref([
  { prop: 'name', label: '名称', placeholder: '请输入名称', type: 'text' },
  { prop: 'machineSerial', label: '机器序列号', placeholder: '请输入机器序列号', type: 'text' },
  {
    prop: 'machineModelID',
    label: '机器型号',
    placeholder: '请选择机器型号',
    type: 'select',
    options: [
     
    ],
    attrs: { filterable: true } // 将 filterable 属性直接加入 attrs 中

  },
  {
    prop: 'customerID',
    label: '所有者',
    placeholder: '请选择所有者',
    type: 'select',
    options: [
     
    ],
    attrs: { filterable: true } // 将 filterable 属性直接加入 attrs 中

  },
  {
    prop: 'versionID',
    label: '变体',
    placeholder: '请选择变体',
    type: 'select',
    options: [
     
    ],
    attrs: { filterable: true } // 将 filterable 属性直接加入 attrs 中

  },
  {
    prop: 'testCodeID',
    label: '机器类型',
    placeholder: '请选择变体',
    type: 'select',
    options: [
     
    ],
    attrs: { filterable: true } // 将 filterable 属性直接加入 attrs 中

  },
])

// 搜索表单数据
const searchForm = ref({
  name: '',
  machineSerial: '',
  machineModelID: '',
  customerID: '',
  registrationDate: '',
  testCodeID:''
})



// 执行搜索
const handleSearch = (formData) => {
    currentPage.value = 1
    currentSearchParams.value = { ...formData }; // 保存当前搜索条件
    fetchTableData(formData)
}

// 重置搜索条件
const resetSearch = (formData) => {
    searchForm.value = {
        name: '',
        machineSerial: '',
        machineModelID: '',
        customerID: '',
        registrationDate: '',
        testCodeID:''

    }
    currentSearchParams.value = { ...formData }; // 保存当前搜索条件

    currentPage.value = 1
    fetchTableData(formData)
}
const processedTableData = computed(() =>
    tableData.value.map(item => ({
        ...item,
        customerID: customers[item.customerID]
    }))
)

const currentSearchParams = ref({}); // 保存最新的搜索条件

// 获取表格数据（带分页和搜索条件）
const fetchTableData = async (searchParams= {}) => {
    loading.value = true
    
    try {
        const response = await axios.get('/v1/machine/machine-inventory', {
            params: {
                ...searchParams,
                page: currentPage.value,
                pageSize: pageSize
            }
        })
        tableData.value = response.data.data.items
        totalItems.value = response.data.data.pagination.totalCount
        customers.value = response.data.data.customers
        testCodes.value = response.data.data.testCodes
        machineModels.value = response.data.data.machineModels
        machineVersion.value = response.data.data.machineVersion
        finaltableData.value = tableData.value.map(item => ({
        ...item,
        testCodeID:testCodes.value[item.testCodeID]|| '',
        customerID: customers.value[item.customerID] || '',
        versionID:machineVersion.value[item.versionID]|| '',
        machineModelID:machineModels.value[item.machineModelID]|| ''
        }))

        initializeOptions(response.data.data, [
            { field: 'customerID', data: 'customers' },
            { field: 'machineModelID', data: 'machineModels' },
            { field: 'testCodeID', data: 'testCodes' },
            { field: 'versionID', data: 'machineVersion' },

        ]);

    
    } catch (error) {
        ElMessage.error('获取数据失败')
    } finally {
        loading.value = false
    }
}




// 通用选项初始化函数
const initializeOptions = (data, fields) => {
    fields.forEach(({ field, data: dataKey }) => {
        const options = Object.entries(data[dataKey] || {})
            .filter(([, name]) => name) // 过滤掉空值
            .map(([id, name]) => ({
                label: name,
                value: id,
            }));

        const fieldConfig = searchFields.value.find((f) => f.prop === field);
        if (fieldConfig) {
            fieldConfig.options = options;
        }
    });
};

onMounted(() => {
  fetchTableData() // 组件加载时获取数据
    })

// 处理分页切换
const handlePageChange = (page) => {
    currentPage.value = page
    fetchTableData(currentSearchParams.value); // 分页时传递当前的搜索参数
}



</script>
  
<style scoped>







</style>
  