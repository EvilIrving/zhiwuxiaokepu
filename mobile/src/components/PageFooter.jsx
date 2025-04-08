import { defineComponent } from 'vue'
import footer from '@/assets/images/footer.jpg'
export default defineComponent({
  name: 'Footer',
  setup() {
    const year = 2024; // new Date().getFullYear()
    return () => (
      <footer class="w-full h-40 relative mt-56">
        <img
          src={footer}
          alt="footer"
          class="w-full h-full block object-cover text-[0px] absolute -bottom-2"
        />
        <h2 class="text-[#6bb382] w-full text-center text-sm font-medium absolute left-1/2 -translate-x-1/2 top-4">苏州市城市公园管理处（苏州市绿化指导站）</h2>
        <h2 class="text-[#FFF6F6]  w-full text-center text-sm absolute left-1/2 -translate-x-1/2 bottom-6">{year}年苏州市科普专项资金资助项目</h2>
        <h2 class="text-[#E8E8E8]  w-full text-center text-[10px] absolute left-1/2 -translate-x-1/2 bottom-1  cursor-pointer">
          <a href="https://beian.miit.gov.cn/">苏ICP备2021005939号</a>
        </h2>
      </footer>
    )
  },
})
