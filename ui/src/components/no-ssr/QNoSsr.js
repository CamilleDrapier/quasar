import { h, defineComponent } from 'vue'

import CanRenderMixin from '../../mixins/can-render.js'

import { hSlot } from '../../utils/render.js'

export default defineComponent({
  name: 'QNoSsr',

  mixins: [ CanRenderMixin ],

  props: {
    tag: {
      type: String,
      default: 'div'
    },

    placeholder: String
  },

  render () {
    const data = {}

    if (this.canRender === true) {
      const node = hSlot(this, 'default')
      return node === void 0
        ? node
        : (node.length > 1 ? h(this.tag, data, node) : node[ 0 ])
    }

    data.class = 'q-no-ssr-placeholder'

    const node = hSlot(this, 'placeholder')
    if (node !== void 0) {
      return node.length > 1
        ? h(this.tag, data, node)
        : node[ 0 ]
    }

    if (this.placeholder !== void 0) {
      return h(this.tag, data, this.placeholder)
    }
  }
})
