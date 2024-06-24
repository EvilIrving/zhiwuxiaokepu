<script setup>
import { SearchBar, PlantList, Pagination, PlantFormUI } from '@/components/index'
import { getPlantList, deletePlant, getPlantDetail } from '@/api/plant';
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { generateUUID } from "@/utils/utils";
// table 数据 
const currentPage = ref(1)
const pageSize = ref(10)
const totalNum = ref(0)
const pages = ref(0)
const plantList = ref([])
const chineseName = ref('')

onMounted(() => {
  queryPlantList()
})

const queryPlantList = async () => {
  const options = {
    pageNum: currentPage.value, pageSize: pageSize.value
  }

  if (chineseName.value) { options.chineseName = chineseName.value }
  try {
    const { total, list, pages: pageNumbers } = await getPlantList(options)
    totalNum.value = total
    pages.value = pageNumbers
    list.forEach(plant => {
      plant.image1 = plant.photos.split(',')[0]
      plant.image2 = plant.photos.split(',')[1]
      plant.photosArr = plant.photos.split(',').map(url => {
        return {
          url,
          name: generateUUID()
        }
      })
    });
    plantList.value = list
  } catch (error) {
    console.log(error);
  }
}

function handlePageChange(page) {
  currentPage.value = page
  queryPlantList()
}

function handlePageSizeChange(size) {
  pageSize.value = size
  queryPlantList()
}


// 操作植物逻辑 
function queryByName(name) {
  currentPage.value = 1
  pageSize.value = 10
  chineseName.value = name
  queryPlantList()
}


function resetParams() {
  chineseName.value = ''
  currentPage.value = 1
  pageSize.value = 10
  queryPlantList()
}


function deletePlantById(id) {
  deletePlant(id).then(() => {
    ElMessage.success('删除成功!')
    queryPlantList()
  }).catch(() => {
    ElMessage.error('删除失败,请联系开发人员')
  })
}

const showDialog = ref(false)
function newPlant() {
  showDialog.value = true
  openPlantForm('新增')
}
async function editPlantById(row) {
  showDialog.value = true
  openPlantForm('编辑', row)
}

const plantFormRef = ref(null);
function openPlantForm(title, row) {
  const params = {
    title,
    isView: title === "查看",
    row: { ...row },
    getTableList: queryPlantList
  };
  plantFormRef.value?.acceptParams(params);
}

</script>

<template>
  <main class="max-w-5xl mx-auto">
    <!-- search bar and filter -->

    <SearchBar :chineseName="chineseName" @queryByName="queryByName" @resetParams="resetParams"
      @newPlant="newPlant('新增')" />

    <!-- table of plants -->
    <PlantList :plantList="plantList" @deletePlant="deletePlantById" @editPlant="editPlantById" />

    <!-- pagination -->
    <Pagination :currentPage="currentPage" :total="totalNum" :pages="pages" :pageSize="pageSize"
      @handlePageChange="handlePageChange" @handlePageSizeChange="handlePageSizeChange"></Pagination>

    <PlantFormUI v-if="showDialog" ref="plantFormRef"></PlantFormUI>
  </main>
</template>
