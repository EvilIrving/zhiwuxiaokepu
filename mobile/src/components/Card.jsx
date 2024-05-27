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
  },
  setup(props) {
    const { title, content } = props
    console.log(content), '-------'

    return () => (
      <div class="max-w-sm p-4 my-4 bg-white border-gray-200 rounded-lg shadow">
        <div class="flex items-center justify-start mb-2">
          <h2 class="text-lg leading-6 font-semibold text-customGray">{title}</h2>
        </div>
        <div class="rounded-lg text-sm p-4 bg-gradient text-customGray">
          {Array.isArray(content) ? (
            <ul>
              {content.map((item, index) => (
                <li key={index}>
                  {item.label}: {item.value}
                </li>
              ))}
            </ul>
          ) : (
            <p> {content}</p>
          )}
        </div>
      </div>
    )
  },
})
