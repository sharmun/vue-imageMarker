export default {
  props: {},
  data () {
    return {
      SVGMoving: false,
      graphMoving: false
    }
  },
  mounted () {

  },
  methods: {
    handleSVGClick (e) {
      if (this.mode === 'draw') {
        this.drawGraph(e)
      }
    },
    handleSVGRightClick () {

    },
    handleSvgMouseDown (e) {
      if (e.button === 2 || this.mode === 'svgMoving') {
        this.clearCurEditingGraph()
        this.returnMode = this.mode
        this.$emit('update:mode', 'svgMoving')
        this.SVGMoving = true
      }
    },
    handleSvgMouseLeave () {
      this.SVGMoving = false
      this.graphMoving = false
      this.stopSkew()
    },
    handleSvgMouseUp (e) {
      if (e.button === 2) {
        this.$emit('update:mode', this.returnMode)
      }
      this.SVGMoving = false
      this.graphMoving = false
      this.stopSkew()
    },
    handleSVGMousemove (e) {
      let that = this
      if (that.mode === 'svgMoving') {
        if (this.SVGMoving) {
          this.SVGtranslate.x += e.movementX * Math.max(this.SVGScale, 1)
          this.SVGtranslate.y += e.movementY * Math.max(this.SVGScale, 1)
        }
      } else {
        if (this.graphSkewing || this.drawing) {
          switch (that.curEditingGraph.shape) {
            case 'rect':
              that.skewRect(e)
              break
            case 'circle':
              that.skewCircle(e)
              break
            case 'polygon':
              this.skewPolygon(e)
              break
          }
        } else if (this.graphMoving) {
          switch (that.curEditingGraph.shape) {
            case 'rect':
              that.curEditingGraph.data.x = Math.min(Math.max((that.curEditingGraph.data.x + e.movementX / that.SVGScale), 0), (that.imageConfig.width - that.curEditingGraph.data.width))
              that.curEditingGraph.data.y = Math.min(Math.max((that.curEditingGraph.data.y + e.movementY / that.SVGScale), 0), (that.imageConfig.height - that.curEditingGraph.data.height))
              break
            case 'circle':
              that.curEditingGraph.data.x = Math.min(Math.max((that.curEditingGraph.data.x + e.movementX / that.SVGScale), that.curEditingGraph.data.r), (that.imageConfig.width - that.curEditingGraph.data.r))
              that.curEditingGraph.data.y = Math.min(Math.max((that.curEditingGraph.data.y + e.movementY / that.SVGScale), that.curEditingGraph.data.r), (that.imageConfig.height - that.curEditingGraph.data.r))
              break
            case 'polygon':
              let xArr = []
              let yArr = []
              this.curEditingGraph.data.forEach(item => {
                xArr.push(item.x)
                yArr.push(item.y)
              });

              if (Math.min(...xArr) + e.movementX / this.SVGScale > 0 && Math.max(...xArr) + e.movementX / this.SVGScale < that.imageConfig.width) {
                this.curEditingGraph.data.forEach(item => {
                  item.x += e.movementX / this.SVGScale
                });
              }
              if (Math.min(...yArr) + e.movementY / this.SVGScale > 0 && Math.max(...yArr) + e.movementY / this.SVGScale < that.imageConfig.height) {
                this.curEditingGraph.data.forEach(item => {
                  item.y += e.movementY / this.SVGScale
                });
              }
              break
          }
        }
      }
    },
    handleGraphMousedown (shape, index) {
      if (this.mode === 'editing') {
        this.setCurEditingGraph(shape, index)
      }
    },
    setCurEditingGraph (shape, index) {
      if (this.mode === 'editing' || this.drawing) {
        this.graphMoving = true
        this.curEditingGraph = { shape, index }
        switch (shape) {
          case 'rect':
            this.curEditingGraph.data = this.rectData[index].data
            break
          case 'circle':
            this.curEditingGraph.data = this.circleData[index].data
            break
          case 'polygon':
            if (!this.drawing) {
              this.curEditingGraph.data = this.polygonData[index].data
            }
            break
        }
      }
    },
    clearCurEditingGraph () {
      this.curEditingGraph = { // 当前正在被编辑的图形
        shape: null,
        index: NaN,
        data: {}
      }
    },
    handleGraphMouseup () {
      this.graphMoving = false
    }
  }
}