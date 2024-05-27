import { defineComponent, ref, onMounted, onUnmounted, watch } from 'vue'
import SwiperItem from './swiper-item.jsx'
import Indicator from './indicator.jsx'
import SwiperUI from './swiper-ui.jsx'
import SwiperBtn from './swiper-btn.jsx'
export default defineComponent({
  name: 'Swiper',
  components: {
    SwiperItem,
    Indicator,
    SwiperUI,
    SwiperBtn,
  },
  props: {
    slides: Array,
    autoPlay: {
      type: Boolean,
      default: false,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    interval: {
      type: Number,
      default: 3000,
    },
  },
  setup(props) {
    const activeIndex = ref(1)

    let autoPlayInterval = null

    const startAutoPlay = () => {
      if (props.autoPlay) {
        stopAutoPlay() // 确保不会有多个interval
        autoPlayInterval = setInterval(() => {
          nextSlide()
        }, props.autoPlayIntervalTime || 3000)
      }
    }

    const stopAutoPlay = () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval)
        autoPlayInterval = null
      }
    }

    const nextSlide = () => {
      if (activeIndex.value < props.slides.length - 1) {
        activeIndex.value++
      } else if (props.loop) {
        activeIndex.value = 0
      }
    }

    const prevSlide = () => {
      if (activeIndex.value > 0) {
        activeIndex.value--
      } else if (props.loop) {
        activeIndex.value = props.slides.length - 1
      }
    }

    onMounted(() => {
      startAutoPlay()
    })

    onUnmounted(() => {
      stopAutoPlay()
    })

    watch(activeIndex, () => {
      // 当活动索引改变时，你可能想要做些事情
    })

    return {
      activeIndex,
      startAutoPlay,
      stopAutoPlay,
      nextSlide,
      prevSlide,
    }
  },
  render(props) {
    const { activeIndex, slides } = props

    // 后退，切换到上一张图片
    const handlePrevSlide = () => {
      activeIndex = (activeIndex - 1 + slides.length) % slides.length
    }

    // 前进，切换到下一张图片
    const handleNextSlide = () => {
      activeIndex = (activeIndex + 1) % slides.length
    }

    return (
      <>
        <SwiperUI>
          {slides.map((slide, index) => (
            <SwiperItem
              key={index}
              slide={slide}
              slideIndex={index}
              activeIndex={activeIndex}
              isNext={index === (activeIndex + 1) % slides.length}
              isPrev={index === (activeIndex - 1 + slides.length) % slides.length}
            />
          ))}
        </SwiperUI>
        <SwiperBtn
          onPrev-slide={handlePrevSlide}
          onNext-slide={handleNextSlide}
        ></SwiperBtn>
        <Indicator
          count={slides.length}
          activeIndex={activeIndex}
        />
      </>
    )
  },
})
