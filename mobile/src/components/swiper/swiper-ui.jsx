// swiper-ui.jsx
import { defineComponent } from 'vue'

const SwiperUI = defineComponent({
  props: {
    images: {
      type: Array,
      required: true,
    },
    currentIndex: {
      type: Number,
      required: true,
    },
    onNext: {
      type: Function,
      required: true,
    },
    onPrev: {
      type: Function,
      required: true,
    },
    onTouchStart: {
      type: Function,
      required: true,
    },
    onTouchMove: {
      type: Function,
      required: true,
    },
    onTouchEnd: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div class="relative overflow-hidden h-full">
        <div class="flex">
          {props.images.map((image, index) => (
            <img
              key={index}
              src={image}
              class={['w-full', index === props.currentIndex ? 'block' : 'hidden', index === props.currentIndex ? 'slide-out-left' : index === props.nextIndex ? 'slide-in-right' : '']}
              style={{
                transform: `translateX(${(index - props.currentIndex) * 100}%)`,
                transition: 'transform 0.3s ease',
              }}
            />
          ))}
        </div>
        <div class="flex justify-center absolute bottom-2 w-full z-30">
          {props.images.map((_, index) => (
            <div
              key={index}
              class={['h-1 w-4 mx-2 rounded-full', index === props.currentIndex ? 'bg-blue-500' : 'bg-gray-300']}
            ></div>
          ))}
        </div>
      </div>
    )
  },
})

export default SwiperUI
