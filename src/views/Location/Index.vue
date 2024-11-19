<template>
    <div class="container">
      <div class="actions">
        <el-button type="primary" @click="createLocation">创建位置</el-button>
        <el-button @click="toggleAll">{{ isAllExpanded ? '隐藏全部' : '显示全部' }}</el-button>
      </div>
  
      <el-tree
        :data="locations"
        :props="defaultProps"
        node-key="id"
        ref="tree"
        highlight-current
        :default-expand-all="isAllExpanded"
        class="location-tree"
        icon=""
      >
        <template #default="{ node, data }">
          <div class="tree-node" >
            <div class="left-content">
              <el-icon v-if="node.childNodes.length" @click.stop="toggleNode(node)">
                <component :is="node.expanded ? ArrowDown : ArrowRight" />
              </el-icon>
              <span class="location-name">{{ data.name }}</span>
            </div>
            <div class="right-content">
              <span class="location-owner">Owner: {{ data.owner }}</span>
              <div class="button-group">
                <el-button  @click.stop="addLocation(data)">新增</el-button>
                <el-button  type="primary" @click.stop="editLocation(data)">编辑</el-button>
              </div>
            </div>
          </div>
        </template>
      </el-tree>
    </div>
  </template>
  default
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { ArrowDown, ArrowRight } from '@element-plus/icons-vue';

  const isAllExpanded = ref(false); // 控制展开或折叠全部
  const tree = ref(null); // 引用 el-tree 实例
  // 切换节点展开状态
  const toggleNode = (node) => {
    node.expanded = !node.expanded;
  };
  // 示例数据
  const locations = ref([
    {
      id: 1,
      name: 'Factory A',
      owner: '新公司名称',
      children: [
        {
          id: 2,
          name: 'Laurel',
          owner: '新公司名称',
          children: [
            { id: 3, name: 'Room 000', owner: '新公司名称', children: [] },
            { id: 4, name: 'Table B', owner: '新公司名称', children: [] }
          ]
        }
      ]
    },
    {
      id: 5,
      name: 'JTE',
      owner: '新公司名称',
      children: []
    },
    {
      id: 6,
      name: 'Plant JTE',
      owner: 'JTE Dealer',
      children: []
    },
    // 添加更多示例数据...
  ]);
  
  const defaultProps = {
    children: 'children',
    label: 'name',
  };
  
  // 创建位置
  const createLocation = () => {
    ElMessage({
      message: '创建新位置',
      type: 'info',
    });
  };
  
  // 添加子位置
  const addLocation = (location) => () => {
    ElMessageBox.prompt('请输入新位置名称', '新增位置', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
    }).then(({ value }) => {
      const newLocation = {
        id: Date.now(),
        name: value,
        owner: location.owner,
        children: [],
      };
      location.children.push(newLocation);
      ElMessage.success('新增位置成功');
    }).catch(() => {
      ElMessage.info('取消新增');
    });
  };
  
  // 编辑位置
  const editLocation = (location) => () => {
    ElMessageBox.prompt('编辑位置名称', '编辑位置', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      inputValue: location.name,
    }).then(({ value }) => {
      location.name = value;
      ElMessage.success('编辑成功');
    }).catch(() => {
      ElMessage.info('取消编辑');
    });
  };
  
// 递归展开或折叠所有节点
// 递归展开或折叠所有节点
const toggleAll = () => {
  if (!tree.value) return;

  const recursiveToggle = (node, expand) => {
    tree.value.store.getNode(node.id).expanded = expand;
    if (node.children && node.children.length > 0) {
      node.children.forEach(childNode => recursiveToggle(childNode, expand));
    }
  };

  locations.value.forEach(node => {
    recursiveToggle(node, !isAllExpanded.value);
  });

  isAllExpanded.value = !isAllExpanded.value;
};
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  
  .actions {
    margin-bottom: 10px;
  }
  
  .location-tree {
    margin-top: 20px;
  }
  
  .tree-node {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    width:100%;
  }
  
  .tree-node:hover {
  }

  :deep(.el-tree-node__expand-icon){
    visibility: hidden;

  }

  :deep(.el-tree-node__content){
    border: 1px solid rgba(0, 0, 0, .125);
    padding: 20px 0px;

  }
  :deep(.el-tree-node__children){
  }
  
  .left-content {
    display: flex;
    align-items: center;
  }
  
  .location-name {
    font-weight: bold;
    color: #333;
  }
  
  .right-content {
    display: flex;
    align-items: center;
  }
  
  .location-owner {
    color: #909399;
    font-size: 12px;
    margin-right: 10px;
  }
  
  .button-group {
    display: flex;
    gap: 5px;
  }
  </style>
  