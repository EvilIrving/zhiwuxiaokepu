<template>
  <div
    v-if="plantData && photos.length > 0"
    class="relative"
  >
    <header class="w-full absolute h-56">
      <Swiper v-if="photos.length > 0">
        <Slide
          v-for="(item, index) in photos"
          :key="index"
        >
          <img
            :src="item"
            alt="image"
            class="w-full h-full object-cover block"
          />
        </Slide>
      </Swiper>
      <Title
        :name="plantData.chineseName"
        :latinName="plantData.latinName"
      ></Title>
    </header>
    <main class="w-full z-20 relative top-56">
      <Cards
        :basic="basic"
        :greenApplication="greenApplication"
        :lifeHabit="lifeHabit"
        :morphological="morphological"
      />
    </main>
    <PageFooter />
  </div>
  <div
    v-else
    class="flex flex-col justify-center items-center h-screen"
  >
    <svg
      class="animate-spin -ml-4 h-6 w-6 text-[#70ab66]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <p class="mt-3 text-lg">Loading...</p>
  </div>
</template>

<script lang="js">
// import { useRouter } from 'vue-router'
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { Cards, Title, PageFooter, Swiper, Slide } from '@/components'
async function fetchFromCode(id) {
  if (!id) {
    return false
  }
  return await fetch('/api/botany/detail/' + id, { method: 'get' }).then((response) => {
    return response.json()
  })
}

function getBasicData(data) {
  const result = []
  // 花期  florescence
  if (data.florescence !== '-') {
    result.push({ label: '花期', value: data.florescence })
  }
  // 果期 fruitStage
  if (data.fruitStage !== '-') {
    result.push({ label: '果期', value: data.fruitStage })
  }
  // 花果期 flowerFruit
  if (data.flowerFruit !== '-') {
    result.push({ label: '花果期', value: data.flowerFruit })
  }
  // 种子成熟  seedMaturation
  if (data.seedMaturation !== '-') {
    result.push({ label: '种子成熟', value: data.seedMaturation })
  }
  // 保护等级 protectionClass
  if (data.protectionClass !== '-') {
    result.push({ label: '保护等级', value: data.protectionClass })
  }
  // 科 family
  if (data.family !== '-') {
    result.push({ label: '科', value: data.family })
  }
  // 属 genus
  if (data.genus !== '-') {
    result.push({ label: '属', value: data.genus })
  }

  return result
}

function getQueryParams() {
  // 获取当前 URL
  const url = window.location.href

  // 使用 URL 对象解析 URL
  const urlObj = new URL(url)

  // 使用 URLSearchParams 对象解析查询参数
  const queryParams = new URLSearchParams(urlObj.search)

  // 获取 id 参数
  const id = queryParams.get('id')

  // 返回一个对象，包含 id 参数
  return { id }
}
export default defineComponent({
  name: 'Version1',
  components: {
    Cards,
    Title,
    PageFooter,
    Swiper,
    Slide,
  },
  setup() {
    let plantData = reactive({})
    let morphological = ref('')
    let lifeHabit = ref('')
    let greenApplication = ref('')
    let basic = ref([])
    let photos = ref([])

    onMounted(async () => {
      try {
        // 获取 url 中的 id 参数
        const { id } = getQueryParams()
        const fetchedData = await fetchFromCode(id)

        if (fetchedData) {
          Object.assign(plantData, fetchedData)

          // 更新 ref 的值
          photos.value = plantData.photos.split(',')
          basic.value = getBasicData(plantData)
          morphological.value = plantData.morphological
          lifeHabit.value = plantData.lifeHabit
          greenApplication.value = plantData.greenApplication
        } else {
          console.error('No data fetched')
        }
      } catch (error) {
        console.error('Error occurred while fetching data:', error)
      }
    })

    return {
      photos,
      plantData,
      basic,
      morphological,
      lifeHabit,
      greenApplication,
    }
  },
})
</script>
