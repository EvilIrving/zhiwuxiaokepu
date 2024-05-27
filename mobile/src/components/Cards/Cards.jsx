import { defineComponent, ref, toRefs, watch } from 'vue'
import Card from '@/components/Cards/Card'
export default defineComponent({
  name: 'Cards',
  props: {
    basic: {
      type: Array,
      default: () => [],
    },
    morphological: String,
    lifeHabit: String,
    greenApplication: String,
  },
  setup(props) {
    const { basic, morphological, lifeHabit, greenApplication } = props

    return () => (
      <div className="space-y-4 text-base ">
        <Card
          title="基本属性"
          content={basic}
        />
        <Card
          title="形态特征"
          content={morphological}
        />
        <Card
          title="生活习性"
          content={lifeHabit}
        />
        <Card
          title="绿化运用"
          content={greenApplication}
        />
      </div>
    )
  },
})
