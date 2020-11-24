import { h, defineComponent } from 'vue'

import QBtn from '../btn/QBtn.js'
import QIcon from '../icon/QIcon.js'

import FabMixin from '../../mixins/fab.js'

import { hMergeSlot } from '../../utils/render.js'

const anchorMap = {
  start: 'self-end',
  center: 'self-center',
  end: 'self-start'
}

const anchorValues = Object.keys(anchorMap)

export default defineComponent({
  name: 'QFabAction',

  mixins: [ FabMixin ],

  props: {
    icon: {
      type: String,
      default: ''
    },

    anchor: {
      type: String,
      validator: v => anchorValues.includes(v)
    },

    to: [ String, Object ],
    replace: Boolean
  },

  emits: [ 'click' ],

  inject: {
    __qFab: {
      default () {
        console.error('QFabAction needs to be child of QFab')
      }
    }
  },

  computed: {
    classes () {
      const align = anchorMap[ this.anchor ]
      return this.formClass + (align !== void 0 ? ` ${align}` : '')
    },

    isDisabled () {
      return this.__qFab.showing !== true || this.disable === true
    }
  },

  methods: {
    click (e) {
      this.__qFab.__onChildClick(e)
      this.$emit('click', e)
    },

    __getContent () {
      const child = []

      this.icon !== '' && child.push(
        h(QIcon, { name: this.icon })
      )

      this.label !== '' && child[ this.labelProps.action ](
        h('div', this.labelProps.data, [ this.label ])
      )

      return hMergeSlot(this, 'default', child)
    }
  },

  render () {
    return h(QBtn, {
      class: this.classes,
      ...this.$props,
      noWrap: true,
      stack: this.stacked,
      icon: void 0,
      label: void 0,
      noCaps: true,
      fabMini: true,
      disable: this.isDisabled,
      onClick: this.click
    }, this.__getContent)
  }
})
