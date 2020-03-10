export default {
  props: {},
  data () {
    return {
      drawing: false,
      painterStyle: {
        shape: 'rect',
        stroke: "#3388ff",
        strokeOpacity: "1",
        strokeWidth: "3",
        fill: "#3388ff",
        fillOpacity: "0.2"
      }
    }
  },
  mounted () {

  },
  methods: {
    drawGraph (e) {
      this.drawing = !this.drawing
      if (this.drawing) {
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
    }
  }
}