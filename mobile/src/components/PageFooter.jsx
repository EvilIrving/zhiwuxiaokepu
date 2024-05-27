import { defineComponent } from 'vue'
import footer from '@/assets/images/footer.jpg'
export default defineComponent({
  name: 'Footer',
  setup() {
    return () => (
      <footer class="w-full relative top-56">
        <img
          src={footer}
          alt="footer"
          class="w-full block object-cover text-[0px]"
        />
        <h2 class="text-[#FFF6F6] w-full text-center text-base absolute bottom-4">苏州市城市公园管理处（苏州市绿化指导站）</h2>
      </footer>
    )
  },
})
