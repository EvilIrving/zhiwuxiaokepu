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
      let text = latinName.trim()
      // 定义正则表达式模式
      const patterns = [/var\./g, /f\./g, /cv\./g, /subsp\./g, /Hybrid/g, /'[^']*'/g]

      // 替换匹配的内容
      patterns.forEach((pattern) => {
        text = text.replace(pattern, '<span class="not-italic">$&</span>')
      })

      return text
    })

    console.log(latinName, '-------', fotmattedTitle.value)

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
