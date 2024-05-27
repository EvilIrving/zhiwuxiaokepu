import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'Title',
  props: {
    name: {
      type: String,
      required: true,
      default: '',
    },
    latinName: {
      type: String,
      required: true,
      default: '',
    },
  },
  setup(props) {
    const { name, latinName } = props
    const fotmattedTitle = computed(() => {
      const words = ['var.', 'f.', 'cv.', 'subsp.', 'Hybrid']
      const regex = new RegExp(`(${words.join('|')})`, 'g')

      return latinName.replace(regex, `<span class="not-italic">$1</span>`)
    })

    return () => (
      <>
        <section class="absolute bottom-0 pb-4 w-full px-4 z-20 text-white bg-gradient-to-b from-title-white-start to-title-white-end">
          <h2 class="text-xl font-bold mb-1">{name}</h2>
          <p
            class="italic text-sm"
            v-html={fotmattedTitle.value}
          ></p>
        </section>
      </>
    )
  },
})
