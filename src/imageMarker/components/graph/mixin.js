export default {
  props: {
    editable: Boolean,
    showText: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    anchorStyle() {
      console.log(this.painterStyle.strokeWidth / this.SVGScale);
      console.log(this.SVGScale);
      return {
        stroke: this.painterStyle.stroke,
        strokeWidth: "0",
        fill: "white",
        r: this.painterStyle.strokeWidth / this.SVGScale
      };
    },
    anchroLineStyle() {
      return {
        stroke: this.painterStyle.stroke,
        strokeWidth: this.painterStyle.strokeWidth / this.SVGScale
      };
    }
  },
  mounted() {},
  methods: {
    handleGraphMousedown(e) {
      if (e.button === 0) {
        this.$emit("handleGraphMousedown");
      }
    },
    handleAnchorMousedown(index) {
      this.$emit("startSkew");
      this.$emit("setAnchorIndex", index);
    }
  }
};
