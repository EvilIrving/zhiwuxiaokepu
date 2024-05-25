<template>
    <div class="relative">
        <header class="w-full absolute h-56">
            <Swiper :images="images" />
            <!-- <img src="../assets/hua.jpeg" class="w-full h-56 object-cover z-10" alt="" /> -->
            <Title :name="name" :description="description"></Title>
        </header>
        <main class="w-full z-20 relative pt-56">
            <Cards />
        </main>
        <PageFooter />
    </div>
</template>

<script lang="js">
import { defineComponent, ref } from 'vue'
import { Cards, Title, PageFooter, Swiper } from '@/components'
import rawData from '@/data/zhiwu.json'

export default defineComponent({
    name: 'Version1',
    components: {
        Cards,
        Title,
        PageFooter,
        Swiper
    },
    setup() {
        const name = ref(rawData.title)
        const description = ref(rawData.scientific_name)


        const images = ref([
            'https://via.placeholder.com/600x400/FF0000/FFFFFF?text=Slide+1',
            'https://via.placeholder.com/600x400/00FF00/FFFFFF?text=Slide+2',
            'https://via.placeholder.com/600x400/0000FF/FFFFFF?text=Slide+3'
        ]);

        return {
            name,
            description,
            images,
        }
    },
})
</script>