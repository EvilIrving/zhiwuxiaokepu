<script setup>
import { Images } from './index'
const { plantList } = defineProps(['plantList'])
const emit = defineEmits(['deletePlant', 'editPlant', 'getSelectRowsData'])


const handleEdit = (row) => {
    emit('editPlant', row)
}
const handleDelete = (row) => {
    emit('deletePlant', row.id)
}


function getRowKey(row) {
    return row.id
}

const handleSelectionChange = (val) => {
    emit('getSelectRowsData', val)
}
</script>

<template>
    <el-table :data="plantList" style="width:100%;" class="h-3/4" :border="true" :stripe="true" highlight-current-row
        :row-key="getRowKey" @selection-change="handleSelectionChange">
        <!-- 序号 中文名 拉丁名 科属 图片1 图片2 二维码 操作(编辑,删除) -->
        <el-table-column type="selection" width="50" :reserve-selection="true" />
        <el-table-column type="index" width="50" />
        <el-table-column property="chineseName" label="中文名" width="200" show-overflow-tooltip />
        <el-table-column property="latinName" label="拉丁名" width="200" show-overflow-tooltip />
        <el-table-column property="family" label="科属" width="120" />
        <el-table-column label="图片1" width="150" align="center">
            <template #default="scope">
                <Images :key="scope.row.image1" :src="scope.row.image1" />
            </template>
        </el-table-column>
        <el-table-column label="图片2" width="150" align="center">
            <template #default="scope">
                <Images :key="scope.row.image2" :src="scope.row.image2" />
            </template>
        </el-table-column>
        <el-table-column label="二维码" width="120" align="center">
            <!-- qrcode -->
            <template #default="scope">
                <Images :key="scope.row.id" :qrcode="scope.row.qrcode" />
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)">
                    编辑
                </el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.row)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>