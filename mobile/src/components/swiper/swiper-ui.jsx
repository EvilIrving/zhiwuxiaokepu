// swiper-ui.jsx
import { defineComponent } from 'vue';

const SwiperUI = defineComponent({
  props: {
    images: {
      type: Array,
      required: true
    },
    currentIndex: {
      type: Number,
      required: true
    },
    onTouchStart: {
      type: Function,
      required: true
    },
    onTouchMove: {
      type: Function,
      required: true
    },
    onTouchEnd: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    return () => (
      <div class="relative overflow-hidden h-full">
        {/* swiper-container */}
        <div class="flex">
          {props.images.map((image, index) => (
            <img
              key={index}
              src={image}
              class={["w-full", index === props.currentIndex ? "block" : "hidden"]}
            />
          ))}
        </div>
        {/* swiper-indicator */}
        <div class="flex justify-center absolute bottom-2 w-full z-30">
          {props.images.map((_, index) => (
            <div
              key={index}
              class={["h-1 ml-2 rounded-full",index === props.currentIndex ? "w-6" : "w-2", index === props.currentIndex ? "bg-white" : "bg-gray-300"]}
            ></div>
          ))}
        </div>
      </div>
    );
  }
});

export default SwiperUI;
