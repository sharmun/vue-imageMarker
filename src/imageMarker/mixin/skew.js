export default {
  props: {},
  data () {
    return {
      graphMinWidth: 10,
      graphSkewing: false,
      anchorIndex: null
    }
  },
  mounted () {

  },
  methods: {
    startSkew () {
      this.graphSkewing = true
    },
    stopSkew () {
      this.graphSkewing = false
    },
    setAnchorIndex (index) {
      this.anchorIndex = index
    },
    skewPolygon (e) {
      if (this.anchorIndex !== null) {
        let polygontData = this.curEditingGraph.data[this.anchorIndex]
        polygontData.x += e.movementX / this.SVGScale
        polygontData.y += e.movementY / this.SVGScale
      }
    },
    skewRect (e) {
      let rectData = this.curEditingGraph.data
      switch (this.anchorIndex) {
        case 0:
          if ((rectData.width - e.movementX / this.SVGScale) > this.graphMinWidth) {
            rectData.x += e.movementX / this.SVGScale
          }
          if ((rectData.height - e.movementY / this.SVGScale) > this.graphMinWidth) {
            rectData.y += e.movementY / this.SVGScale
          }
          rectData.width = Math.max((rectData.width - e.movementX / this.SVGScale), this.graphMinWidth)
          rectData.height = Math.max((rectData.height - e.movementY / this.SVGScale), this.graphMinWidth)
          break
        case 1:
          if ((rectData.height - e.movementY / this.SVGScale) > this.graphMinWidth) {
            rectData.y += e.movementY / this.SVGScale
          }
          rectData.width = Math.max((rectData.width + e.movementX / this.SVGScale), this.graphMinWidth)
          rectData.height = Math.max((rectData.height - e.movementY / this.SVGScale), this.graphMinWidth)
          break
        case 2:
          rectData.width = Math.max((rectData.width + e.movementX / this.SVGScale), this.graphMinWidth)
          rectData.height = Math.max((rectData.height + e.movementY / this.SVGScale), this.graphMinWidth)
          break
        case 3:
          if ((rectData.width - e.movementX / this.SVGScale) > this.graphMinWidth) {
            rectData.x += e.movementX / this.SVGScale
          }
          rectData.width = Math.max((rectData.width - e.movementX / this.SVGScale), this.graphMinWidth)
          rectData.height = Math.max((rectData.height + e.movementY / this.SVGScale), this.graphMinWidth)
          break
      }

    },
    skewCircle (e) {
      let circleData = this.curEditingGraph.data
      circleData.r = Math.min(Math.sqrt(Math.pow((e.offsetX - circleData.x), 2) + Math.pow((e.offsetY - circleData.y), 2)), circleData.x, circleData.y, this.imageConfig.width - circleData.x, this.imageConfig.height - circleData.y)
    }
  }
}