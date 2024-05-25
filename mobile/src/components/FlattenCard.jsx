import { defineComponent } from 'vue'
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
      <div class="p-4 bg-white border-gray-200">
        <div class="flex items-center justify-start mb-2 relative">
          <h2 class="font-bold text-gray-70 pl-4">{props.title}</h2>
          <div class="absolute left-0  w-1 h-3/4 bg-gradient-to-b from-line-green-start to-line-green-end rounded"></div>
        </div>
        <div class="rounded-lg p-4 bg-gradient-to-b from-card-green-start to-card-green-end">
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
