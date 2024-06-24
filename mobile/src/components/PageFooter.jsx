import { defineComponent } from 'vue'
import footer from '@/assets/images/footer.jpg'
export default defineComponent({
  name: 'Footer',
  setup() {
    const year = new Date().getFullYear()
    return () => (
      <footer class="w-full h-28 relative mt-56">
        <img
          src={footer}
          alt="footer"
          class="w-full h-3/4 block object-cover text-[0px] absolute bottom-0"
        />
        <h2 class="text-[#6bb382] w-full  text-center text-sm font-medium absolute left-1/2 -translate-x-1/2 top-3">苏州市城市公园管理处（苏州市绿化指导站）</h2>
        <h2 class="text-[#FFF6F6]  text-center text-sm absolute right-4 bottom-2">{year}年苏州市科普专项资金资助项目</h2>
      </footer>
    )
  },
})