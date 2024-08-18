<script setup>
import { ref } from 'vue'
const emit = defineEmits(['queryByName', 'resetParams', 'newPlant', 'download'])
const { exportText } = defineProps(['exportText'])
const name = ref('')
function searchBy() {
    emit('queryByName', name.value)
}
function reset() {
    emit('resetParams')
}
function add() {
    emit('newPlant', true)
}
function download() {
    emit('download', true)
}
</script>

<template>
    <section class="search-bar flex justify-between items-center mb-10 mt-6">
        <div class="flex gap-4">
            <span class="leading-loose align-middle">中文名搜索</span>
            <el-input v-model="name" style="width: 240px" placeholder="支持模糊搜索" @keyup.enter="searchBy">
                <template #prefix>
                    <el-icon class="el-input__icon">
                        <search />
                    </el-icon>
                </template>
            </el-input>


            <div class="btns">
                <el-button type="primary" @click="searchBy">搜索</el-button>
                <el-button type="danger" @click="reset">重置</el-button>
            </div>
        </div>


        <div class="btns mr-20">
            <el-button type="primary" @click="download">{{ exportText }}</el-button>
            <el-button type="primary" @click="add">添加</el-button>
        </div>

    </section>
</template>
