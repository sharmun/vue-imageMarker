export default {
  props: {
    painterStyle: {
      type: Object,
      default () {
        return {
          shape: 'polygon',
          stroke: "#3388ff",
          strokeOpacity: "1",
          strokeWidth: "3",
          fill: "#3388ff",
          fillOpacity: "0.2"
        }
      }
    }
  },
  data () {
    return {
      drawing: false
    }
  },
  mounted () {

  },
  methods: {
    drawGraph (e) {
      if (this.painterStyle.shape !== 'polygon') {
        this.drawing = !this.drawing
      } else {
        if (!this.drawing) { // polygon 第一次点击开启绘制
          this.drawing = !this.drawing
        }
      }

      if (this.drawing) {
        this.anchorIndex = null
        switch (this.painterStyle.shape) {
          case 'rect':
            this.drawRect(e)
            break
          case 'circle':
            this.drawCircle(e)
            break
          case 'polygon':
            this.drawPolygon(e)
            break
        }
      } else {
        this.clearCurEditingGraph()
      }

    },
    drawRect (e) {
      let drawingIndex = this.rectData.length
      let drawingRect = {
        data: {
          x: e.offsetX,
          y: e.offsetY,
          width: this.graphMinWidth,
          height: this.graphMinWidth
        },
        style: { ...this.painterStyle }
      }
      this.rectData.push(drawingRect)
      this.anchorIndex = 2
      this.setCurEditingGraph('rect', drawingIndex)
    },
    drawCircle (e) {
      let drawingIndex = this.circleData.length
      let drawingCircle = {
        data: {
          x: e.offsetX,
          y: e.offsetY,
          r: this.graphMinWidth
        },
        style: { ...this.painterStyle }
      }
      this.circleData.push(drawingCircle)
      this.setCurEditingGraph('circle', drawingIndex)
    },
    drawPolygon (e) {
      let drawingIndex = this.polygonData.length
      let drawingPolygon = {}
      if (this.polygonData.length > 0 && this.polygonData[this.polygonData.length - 1].hasOwnProperty('temp')) {
        drawingPolygon = this.polygonData.pop()
        drawingPolygon.data.push({
          x: e.offsetX,
          y: e.offsetY
        })
      } else {
        drawingPolygon = {
          data: [{
            x: e.offsetX,
            y: e.offsetY
          }],
          style: { ...this.painterStyle },
          temp: true
        }
      }
      this.polygonData.push(drawingPolygon)
      this.setCurEditingGraph('polygon', drawingIndex)
    },
    drawPolygonFinish () { // 结束多边形的绘制
      this.drawing = false
      delete this.polygonData[this.polygonData.length - 1].temp
      this.$forceUpdate()
    }
  }
}