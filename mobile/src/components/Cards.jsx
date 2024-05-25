import { defineComponent, ref } from 'vue'
import rawData from '@/data/zhiwu.json'
import Card from '@/components/FlattenCard'
export default defineComponent({
  name: 'Home',
  setup() {
    const basic = ref(rawData.sections[0])
    const morphologicalFeatures = ref(rawData.sections[1])
    const ecologicalHabits = ref(rawData.sections[2])
    const greeningApplication = ref(rawData.sections[3])
    const color = '#7683d5'
    return () => (
      <div className='space-y-4 text-base '>
        <Card
          title={basic.value.section_title}
          content={basic.value.attributes}
          backgroundColor={color}
        />
        <Card
          title={morphologicalFeatures.value.section_title}
          content={morphologicalFeatures.value.description}
          backgroundColor={color}
        />
        <Card
          title={ecologicalHabits.value.section_title}
          content={ecologicalHabits.value.description}
          backgroundColor={color}
        />
        <Card
          title={greeningApplication.value.section_title}
          content={greeningApplication.value.description}
          backgroundColor={color}
        />
      </div>
    )
  },
})
