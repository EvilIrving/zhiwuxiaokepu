// swiper.jsx
import { defineComponent, ref } from 'vue'
import SwiperUI from './swiper-ui.jsx'
const Swiper = defineComponent({
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  components: {
    SwiperUI,
  },
  setup(props) {
    const currentIndex = ref(0)
    let startX = 0
    let startY = 0

    const onTouchStart = (event) => {
      startX = event.touches[0].clientX
      startY = event.touches[0].clientY
    }

    const onTouchMove = (event) => {
      const deltaX = event.touches[0].clientX - startX
      const deltaY = event.touches[0].clientY - startY

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        event.preventDefault()
      }
    }

    const onTouchEnd = (event) => {
      const deltaX = event.changedTouches[0].clientX - startX

      if (deltaX > 50 && currentIndex.value > 0) {
        currentIndex.value--
      } else if (deltaX < -50 && currentIndex.value < props.images.length - 1) {
        currentIndex.value++
      }
    }

    return {
      currentIndex,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    }
  },
  render() {
    return (
      <SwiperUI
        images={this.images}
        currentIndex={this.currentIndex}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
      />
    )
  },
})

export default Swiper
