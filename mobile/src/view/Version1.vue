<template>

    <div class="relative">
        <header class="w-full absolute h-56">
            <Swiper v-if="photos.length > 0">
                <Slide v-for="(item, index) in photos" :key=index>
                    <img :src="item" alt="image" class="w-full h-full object-cover block" />
                </Slide>
            </Swiper>
            <Title :name="plantData.chineseName" :latinName="plantData.latinName"></Title>
        </header>
        <main class="w-full z-20 relative top-56">
            <Cards :basic="basic" :greenApplication="greenApplication" :lifeHabit="lifeHabit"
                :morphological="morphological" />
        </main>
        <PageFooter />
    </div>
</template>

<script lang="js">
import { defineComponent, reactive, ref } from 'vue'
import { Cards, Title, PageFooter, Swiper, Slide } from '@/components'

export default defineComponent({
    name: 'Version1',
    components: {
        Cards,
        Title,
        PageFooter,
        Swiper, Slide
    },
    async setup() {
        let plantData = reactive({})
        let morphological = ref('')
        let lifeHabit = ref('')
        let greenApplication = ref('')
        let basic = ref([])

        const photos = ref([
            'data:image/jpeg;base64,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',
            'data:image/jpeg;base64,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',
            // 'https://via.placeholder.com/600x400/0000FF/FFFFFF?text=Slide+3'
        ]);

        const fetchedData = await fetchData('462598898323456')
        Object.assign(plantData, fetchedData)

        // 更新 ref 的值
        // photos.value = plantData.photos.split(',')
        basic.value = getBasicData(plantData)
        morphological.value = plantData.morphological
        lifeHabit.value = plantData.lifeHabit
        greenApplication.value = plantData.greenApplication


        async function fetchData(id = '462598898323456') {
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