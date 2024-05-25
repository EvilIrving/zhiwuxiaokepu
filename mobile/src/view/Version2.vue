<template>
  <div class="bg-primary pb-4">
    <header class="h-32 w-full relative">
      <img src="../assets/hua.jpeg" class="w-full h-52 object-cover z-0" alt="" />
      <div class="title z-10 w-full h-10"></div>
    </header>

    <main class="px-4 z-20 relative">
      <Title :name="name" :description="description"></Title>
      <Cards />
    </main>
  </div>
</template>

<script lang="js">
import { defineComponent, ref } from 'vue'
import { Cards, Title } from '@/components'
import rawData from '@/data/zhiwu.json'

export default defineComponent({
  name: "Version2",
  components: {
    Cards,
    Title,
  },
  setup() {
    const name = ref(rawData.title)
    const description = ref(rawData.scientific_name)

    return {
      name,
      description,
    }
  },
})
</script>
