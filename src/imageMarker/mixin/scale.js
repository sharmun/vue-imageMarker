export default {
  props: {},
  data () {
    return {
      SVGDefaultScale: 1,
      SVGScale: 1,
      SVGMaxScale: 5,
      SVGMiniScale: 0.5,
      SVGtranslate: {
        x: 0,
        y: 0
      },
    }
  },
  mounted () {

  },
  methods: {
    handleSVGMouseWheel (e) {
      this.compSVGMouseWheel(e.deltaY < 0)
    },
    compSVGMouseWheel (isLarge) { // 兼容浏览器鼠标滚动事件
      if (isLarge) { // 放大
        this.SVGScale = Math.min(this.SVGScale + 0.1, this.SVGMaxScale)
      } else { // 缩小
        this.SVGScale = Math.max(this.SVGScale - 0.1, this.SVGMiniScale)
      }
    }
  }
}