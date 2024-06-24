<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const locale = zhCn
const { total, pageSize, currentPage, pages } = defineProps(['total', 'pageSize', 'currentPage','pages'])

const emit = defineEmits(['handlePageChange', 'handlePageSizeChange'])
const handleCurrentChange = (page) => {
    emit('handlePageChange', page)
}
const handleSizeChange = (size) => {
    emit('handlePageSizeChange', size)
}
</script>

<template>
    <div class="mt-10 flex justify-end mr-10">
        <el-config-provider :locale="locale">
            <el-pagination :current-page="currentPage" :page-size="pageSize" :page-count="pages"
                :page-sizes="[10, 20, 30, 50]" :background="true" layout="total, sizes, prev, pager, next, jumper"
                :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-config-provider>
    </div>
</template>