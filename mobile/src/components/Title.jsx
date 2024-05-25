import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Title',
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const fotmattedTitle = computed(() => {
      const words = ['var.', 'f.', 'cv.', 'subsp.', 'Hybrid']
      const regex = new RegExp(`(${words.join('|')})`, 'g')
      const description = ref(props.description)
      return description.value.replace(regex, `<span class="not-italic">$1</span>`)
    })

    console.log(fotmattedTitle);
    return () => (
      <>
        <section class="absolute bottom-0 pb-4 w-full px-4 z-20 text-white bg-gradient-to-b from-title-white-start to-title-white-end">
          <h2 class="text-xl font-bold">{props.name}</h2>
          <p
            class="italic text-sm"
            v-html={fotmattedTitle.value}
          ></p>
        </section>
      </>
    )
  },
})
