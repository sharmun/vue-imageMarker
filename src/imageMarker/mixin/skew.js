export default {
  props: {},
  data() {
    return {
      graphMinWidth: 10,
      graphSkewing: false,
      anchorIndex: null
    };
  },
  mounted() {},
  methods: {
    startSkew() {
      this.graphSkewing = true;
    },
    stopSkew() {
      this.graphSkewing = false;
    },
    setAnchorIndex(index) {
      this.anchorIndex = index;
    },
    skewDaub(e) {
      let daubData = this.curEditingGraph.data;
      let daubObj = this.curEditingGraph.obj;
      let newD = daubObj.attr("d") + "L" + e.offsetX + "," + e.offsetY;
      daubObj.attr({ d: newD });
      daubObj.attr({
        fill: "none",
        stroke: this.painterStyle.stroke,
        strokeLinecap: "round",
        strokeOpacity: this.painterStyle.strokeOpacity,
        strokeWidth: this.painterStyle.strokeWidth / this.SVGScale
      });
      daubData.push({
        x: e.offsetX,
        y: e.offsetY
      });
    },
    skewPolygon(e) {
      if (this.anchorIndex !== null) {
        let polygontData = this.curEditingGraph.data[this.anchorIndex];
        polygontData.x += e.movementX / this.SVGScale;
        polygontData.y += e.movementY / this.SVGScale;
      }
    },
    skewRect(e) {
      let rectData = this.curEditingGraph.data;
      switch (this.anchorIndex) {
        case 0:
          rectData.x1 = e.offsetX;
          rectData.y1 = e.offsetY;
          break;
        case 1:
          rectData.x2 = e.offsetX;
          rectData.y1 = e.offsetY;
          break;
        case 2:
          rectData.x2 = e.offsetX;
          rectData.y2 = e.offsetY;
          break;
        case 3:
          rectData.x1 = e.offsetX;
          rectData.y2 = e.offsetY;
          break;
      }
    },
    skewLine(e) {
      let lineData = this.curEditingGraph.data;
      lineData.x2 += e.movementX / this.SVGScale;
      lineData.y2 += e.movementY / this.SVGScale;
    },
    skewCircle(e) {
      let circleData = this.curEditingGraph.data;

      if (this.shifting) {
        circleData.rx = circleData.ry = Math.max(
          Math.abs(circleData.x - e.offsetX),
          Math.abs(circleData.y - e.offsetY)
        );
      } else {
        circleData.rx = Math.abs(circleData.x - e.offsetX);
        circleData.ry = Math.abs(circleData.y - e.offsetY);
      }
    }
  }
};
