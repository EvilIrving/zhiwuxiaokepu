// swiper.jsx
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import SwiperUI from './swiper-ui'
const Swiper = defineComponent({
  props: {
    images: {
      type: Array,
      required: true,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const currentIndex = ref(0)
    let timer

    const next = () => {
      if (currentIndex.value < props.images.length - 1) {
        currentIndex.value++
      } else {
        currentIndex.value = 0
      }
    }

    const prev = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--
      } else {
        currentIndex.value = props.images.length - 1
      }
    }

    const onTouchStart = (event) => {
      clearInterval(timer)
      startX = event.touches[0].clientX
    }

    const onTouchMove = (event) => {
      const deltaX = event.touches[0].clientX - startX
      if (Math.abs(deltaX) > 50) {
        deltaX > 0 ? prev() : next()
      }
    }

    const onTouchEnd = () => {
      startX = 0
      if (props.autoplay) {
        timer = setInterval(next, 3000)
      }
    }

    let startX = 0

    onMounted(() => {
      if (props.autoplay) {
        timer = setInterval(next, 3000)
      }
    })

    onUnmounted(() => {
      clearInterval(timer)
    })

    // const images = ref(props.images)

    return {
      images: props.images,
      currentIndex,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onNext: next,
      onPrev: prev,
    }
  },
  render() {
    return (
      <SwiperUI
        images={this.images}
        currentIndex={this.currentIndex}
        onNext={this.onNext}
        onPrev={this.onPrev}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
      />
    )
  },
})

export default Swiper
