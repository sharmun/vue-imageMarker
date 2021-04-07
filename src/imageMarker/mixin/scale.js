export default {
  props: {
    SVGMaxScale: {
      type: Number,
      default() {
        return 5;
      }
    },
    SVGMiniScale: {
      type: Number,
      default() {
        return 0.5;
      }
    },
    stepScale: {
      type: Number,
      default() {
        return 0.1;
      }
    }
  },
  data() {
    return {
      SVGScale: 1,
      SVGDefaultScale: 1,
      SVGtranslate: {
        x: 0,
        y: 0
      }
    };
  },
  mounted() {},
  methods: {
    handleSVGMouseWheelFirefox(e) {
      this.compSVGMouseWheel(e.detail < 0);
    },
    handleSVGMouseWheel(e) {
      this.compSVGMouseWheel(e.deltaY < 0);
    },
    compSVGMouseWheel(scrollDetail) {
      // 兼容浏览器鼠标滚动事件
      let isLarge = scrollDetail > 0 ? 1 : -1;
      this.zoom(isLarge);
    },
    zoom(isLarge) {
      if (isLarge > 0) {
        // 放大
        this.SVGScale = Math.min(
          this.SVGScale + this.stepScale,
          this.SVGMaxScale
        );
      } else if (isLarge < 0) {
        // 缩小
        let min = Math.min(this.SVGMiniScale, this.SVGDefaultScale);
        this.SVGScale = Math.max(this.SVGScale - this.stepScale, min);
      } else {
        this.initScale();
        this.initSVGtranslate();
      }
    }
  }
};
