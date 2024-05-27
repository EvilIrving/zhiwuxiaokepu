import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Slide',
  emits: ['click'],
  setup(props, { emit, slots }) {
    const clickSlide = () => {
      emit('click')
    }

    return () => (
      <div
        class="wh_slide w-full flex-shrink-0 z-10 min-h-24"
        onClick={clickSlide}
      >
        {slots.default && slots.default()}
      </div>
    )
  },
})
