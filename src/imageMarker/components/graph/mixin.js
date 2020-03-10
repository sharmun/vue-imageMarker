export default {
  props: {
    editable: Boolean
  },
  data () {
    return {
      anchorStyle: {
        stroke: "#3388ff",
        strokeWidth: "1",
        fill: "white",
        width: 10
      }
    }
  },
  mounted () {

  },
  methods: {
    handleGraphMousedown (e) {
      if (e.button === 0) {
        this.$emit('handleGraphMousedown')
      }
    },
    handleAnchorMousedown (index) {
      this.$emit('startSkew')
      this.$emit('setAnchorIndex', index)
    }
  }
}