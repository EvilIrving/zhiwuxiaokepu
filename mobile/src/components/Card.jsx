import { defineComponent } from 'vue'
import sun from './icons/Sun.svg'
export default defineComponent({
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: [String, Array],
      required: true,
    },
    backgroundColor: {
      type: String,
      default: '#f9f9f9',
    },
  },
  setup(props) {
    return () => (
      <div class="max-w-sm p-4 my-4 bg-white border-gray-200 rounded-lg shadow">
        <div class="flex items-center justify-start mb-2">
          <img
            src={sun}
            alt="Sun Icon"
            class="w-4 h-4 mr-2 inline-block"
          />
          <h2 class="font-normal text-gray-70">{props.title}</h2>
        </div>
        <div class="rounded-lg p-4 bg-gradient">
          {Array.isArray(props.content) ? (
            <ul>
              {props.content.map((item, index) => (
                <li key={index}>
                  {item.label}: {item.value}
                </li>
              ))}
            </ul>
          ) : (
            <p>{props.content}</p>
          )}
        </div>
      </div>
    )
  },
})
