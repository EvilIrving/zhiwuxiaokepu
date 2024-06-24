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
    latinStyle: {
      type: Number, // 拉丁格式 1-正则 2-全正体
      default: 1,
    },
  },
  setup(props) {
    const { name, latinName, latinStyle } = props
    const fotmattedTitle = computed(() => {
      if (latinStyle === 2) {
        return `<span class="not-italic">${latinName}</span>`
      }

      let text = latinName.trim()
      // 定义正则表达式模式
      const patterns = [/var\./g, /f\./g, /cv\./g, /subsp\./g, /Hybrid/g, /'[^']*'/g]

      // 替换匹配的内容
      patterns.forEach((pattern) => {
        text = text.replace(pattern, '<span class="not-italic">$&</span>')
      })

      return text
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
