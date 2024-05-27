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
      // 定义关键字规则
      const words = ['var.', 'f.', 'cv.', 'subsp.', 'Hybrid']
      const wordRegex = new RegExp(`(?<!\\w)(${words.join('|')})(?!\\w)`, 'g')

      // 定义单引号内容规则
      const singleQuoteRegex = /'[^']*'/g

      // 首先替换 `words` 内容
      text = text.replace(wordRegex, '<span class="not-italic">$1</span>')

      // 然后替换单引号内容
      text = text.replace(singleQuoteRegex, (match) => `<span class="not-italic">${match}</span>`)

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
