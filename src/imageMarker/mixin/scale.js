export default {
  props: {
  },
  data () {
    return {
      SVGScale: 1,
      SVGDefaultScale: 1,
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
    compSVGMouseWheel (scrollDetail) { // 兼容浏览器鼠标滚动事件
      let isLarge = scrollDetail > 0 ? 1 : -1
      this.zoom(isLarge)
    },
    zoom (isLarge) {
      if (isLarge > 0) { // 放大
        this.SVGScale = Math.min(this.SVGScale + 0.1, this.SVGMaxScale)
      } else if (isLarge < 0) { // 缩小
        this.SVGScale = Math.max(this.SVGScale - 0.1, this.SVGMiniScale)
      } else {
        this.initScale()
        this.initSVGtranslate()
      }
    }
  }
}