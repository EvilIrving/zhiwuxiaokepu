import { defineComponent, onMounted, ref } from 'vue'
import Slide from './Slide'

export default defineComponent({
  name: 'Swiper',
  props: {
    autoPlay: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
    interval: {
      type: Number,
      default: 2500,
    },
  },
  setup(props, { emit, slots }) {
    const slidesLength = ref(1)
    const _width = ref(0)
    const auto = ref(true)
    const slideing = ref(true)
    const timer1 = ref(null)
    const className = ref('')
    const dom = ref({})
    const t = ref({ sx: 0, s: 0, m: 0, e: 0 })
    const index = ref(1)

    const s = (x) => {
      if (slideing.value) {
        clearTimeout(timer1.value)
        t.value.sx = getTransform()
        t.value.s = x.touches[x.touches.length - 1].clientX
      }
    }

    const m = (x) => {
      if (slideing.value && t.value.s !== -1) {
        clearTimeout(timer1.value)
        t.value.m = x.touches[x.touches.length - 1].clientX - t.value.s
        setTransform(t.value.m + t.value.sx)
      }
    }

    const e = () => {
      if (slideing.value && t.value.s !== -1) {
        clearTimeout(timer1.value)
        setTransform(t.value.m + t.value.sx)
        let x = getTransform()
        x += t.value.m > 0 ? _width.value * 0.3 : _width.value * -0.3
        index.value = Math.round(x / _width.value) * -1
        wh('touch')
      }
    }

    const setTransform = (num) => {
      dom.value.transform = `translate3d(${num}px, 0px, 0px)`
      dom.value['-webkit-transform'] = `translate3d(${num}px, 0px, 0px)`
      dom.value['-ms-transform'] = `translate3d(${num}px, 0px, 0px)`
    }

    const getTransform = () => {
      let x = dom.value.transform || dom.value['-webkit-transform'] || dom.value['-ms-transform']
      x = x.substring(12)
      x = x.match(/(\S*)px/)[1]
      return Number(x)
    }

    const prevSlide = () => {
      clearTimeout(timer1.value)
      index.value--
      wh()
    }

    const nextSlide = () => {
      clearTimeout(timer1.value)
      index.value++
      wh()
    }

    const slideTo = (slideIndex) => {
      clearTimeout(timer1.value)
      index.value = slideIndex + 1
      wh()
    }

    const wh = (type) => {
      slideing.value = false
      dom.value.transition = type === 'touch' ? '250ms' : props.duration + 'ms'
      setTransform(index.value * -1 * _width.value)
      t.value.m = 0
      t.value.s = -1
      if (props.autoPlay) {
        setTime()
      }
      const timeDuration = type === 'touch' ? 250 : props.duration
      setTimeout(() => {
        dom.value.transition = '0s'
        if (index.value >= slidesLength.value + 1) {
          index.value = 1
          setTransform(index.value * -1 * _width.value)
        }
        if (index.value <= 0) {
          index.value = slidesLength.value
          setTransform(index.value * -1 * _width.value)
        }
        emit('transitionend', index.value - 1)
        auto.value = true
        slideing.value = true
      }, timeDuration)
    }

    const setTime = () => {
      timer1.value = window.setTimeout(() => {
        if (auto.value) {
          index.value++
          wh()
        } else {
          window.clearTimeout(timer1.value)
        }
      }, props.interval)
    }

    const starDom = () => {
      const SlideDom = document.querySelector('.' + className.value).getElementsByClassName('wh_slide')
      slidesLength.value = SlideDom.length
      if (slidesLength.value > 1) {
        const cloneDom1 = SlideDom[0].cloneNode(true)
        const cloneDom2 = SlideDom[slidesLength.value - 1].cloneNode(true)
        document.querySelector('.' + className.value).insertBefore(cloneDom2, SlideDom[0])
        document.querySelector('.' + className.value).appendChild(cloneDom1)
        _width.value = document.querySelector('.' + className.value).offsetWidth
        dom.value = document.querySelector('.' + className.value).style
      }
    }

    const clearTimeOut = () => {
      auto.value = false
      window.clearTimeout(timer1.value)
    }

    onMounted(() => {
      className.value = `wh_swiper_${Math.random().toFixed(3) * 1000}`
      setTimeout(() => {
        starDom()
        setTransform(_width.value * -1)
        if (props.autoPlay) {
          setTime()
        }
      }, 50)
    })

    return () => (
      <section class="relative w-full h-full overflow-hidden ">
        <div
          class={`w-full h-full flex duration-0 ease-linear ${className.value}`}
          onTouchstart={s}
          onTouchmove={m}
          onTouchend={e}
        >
          {slots.default && slots.default()}
        </div>

        <div class="w-full flex justify-center p-2 absolute bottom-0">
          {Array.from({ length: slidesLength.value }).map((_, $index) => (
            <span
              key={$index}
              class={['mx-1 h-1.5 rounded', index.value % 2 === $index ? 'bg-white w-8' : 'bg-white bg-opacity-70 w-4']}
            ></span>
          ))}
        </div>
      </section>
    )
  },
})
