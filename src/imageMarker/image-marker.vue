<template>
  <div
    class="im-container"
    ref="IMcontainer"
    @mousewheel="handleSVGMouseWheel"
    @DOMMouseScroll="handleSVGMouseWheelFirefox"
  >
    <div v-if="loading" class="loading">图片加载中...</div>
    <!-- <div id="openseadragon" style="width:100%;height:100%"></div> -->
    <svg
      id="svg"
      style="background:rgba(255,0,0,0.5);"
      v-show="!loading"
      :width="imageConfig.width"
      :height="imageConfig.height"
      :transform="`translate(${SVGtranslate.x} ${SVGtranslate.y}) scale(${SVGScale})`"
      @click.prevent="handleSVGClick"
      @contextmenu.prevent="handleSVGRightClick"
      @mousedown="handleSvgMouseDown"
      @mouseup="handleSvgMouseUp"
      @mousemove="handleSVGMousemove"
      @mouseleave="handleSvgMouseLeave"
      :style="{
        cursor:
          mode === 'svgMoving'
            ? 'move'
            : mode === 'draw'
            ? 'pointer'
            : 'default'
      }"
    >
      <g>
        <!-- 底图 start-->
        <image
          x="0"
          y="0"
          :width="imageConfig.width"
          :height="imageConfig.height"
          :xlink:href="imgObj.src"
        />
        <!-- 底图 end-->
        <!-- graph start-->
        <g>
          <im-line
            :showText="showText"
            v-for="(line, index) in lineData"
            :key="'l' + index"
            :x1="line.data.x1"
            :y1="line.data.y1"
            :x2="line.data.x2"
            :y2="line.data.y2"
            :painterStyle="line.style"
            :SVGScale="SVGScale"
            @handleGraphMousedown="handleGraphMousedown('line', index)"
          />
          <im-circle
            :showText="showText"
            :SVGScale="SVGScale"
            v-for="(circle, index) in circleData"
            :ref="'c' + index"
            :key="'c' + index"
            :editable="
              curEditingGraph.shape === 'circle' &&
                curEditingGraph.index === index
            "
            :x="circle.data.x"
            :y="circle.data.y"
            :rx="circle.data.rx"
            :ry="circle.data.ry"
            :painterStyle="circle.style"
            @handleGraphMousedown="handleGraphMousedown('circle', index)"
            @startSkew="startSkew"
            :style="{ cursor: mode === 'editing' ? 'move' : 'default' }"
          />
          <im-rect
            :showText="showText"
            :SVGScale="SVGScale"
            v-for="(rect, index) in rectData"
            :key="'r' + index"
            :editable="
              curEditingGraph.shape === 'rect' &&
                curEditingGraph.index === index
            "
            :x1="rect.data.x1"
            :y1="rect.data.y1"
            :x2="rect.data.x2"
            :y2="rect.data.y2"
            :painterStyle="rect.style"
            @handleGraphMousedown="handleGraphMousedown('rect', index)"
            @startSkew="startSkew"
            @setAnchorIndex="setAnchorIndex"
            :style="{ cursor: mode === 'editing' ? 'move' : 'default' }"
          />
          <im-polygon
            :showText="showText"
            :SVGScale="SVGScale"
            v-for="(polygon, index) in polygonData"
            :key="'pg' + index"
            :editable="
              curEditingGraph.shape === 'polygon' &&
                curEditingGraph.index === index
            "
            :points="polygon.data"
            :painterStyle="polygon.style"
            :temp="polygon.hasOwnProperty('temp')"
            :offset="offset"
            @handleGraphMousedown="handleGraphMousedown('polygon', index)"
            @startSkew="startSkew"
            @setAnchorIndex="setAnchorIndex"
            @drawPolygonFinish="drawPolygonFinish"
            :style="{ cursor: mode === 'editing' ? 'move' : 'default' }"
          />
        </g>
        <!-- graph end-->
      </g>
    </svg>
  </div>
</template>

<script>
import imCircle from "./components/graph/circle";
import imRect from "./components/graph/rect";
import imPolygon from "./components/graph/polygon";
import imLine from "./components/graph/line";
import scaleMixin from "./mixin/scale.js";
import moveMixin from "./mixin/move.js";
import skewMixin from "./mixin/skew.js";
import drawMixin from "./mixin/draw.js";
import "snapsvg-cjs";
import OpenSeadragon from "openseadragon";

export default {
  name: "image-marker",
  mixins: [moveMixin, scaleMixin, skewMixin, drawMixin],
  components: {
    imCircle,
    imRect,
    imPolygon,
    imLine
  },
  props: {
    imgSrc: String,
    minScale: Number,
    maxScale: Number,
    showText: {
      type: Boolean,
      default () {
        return true;
      }
    },
    mode: {
      type: String,
      default () {
        return null; // draw-画新graph   editing-编辑现有graph  svgMoving-拖拽整个画布 eraser-擦除
      }
    },
    rectData: {
      type: Array,
      default () {
        return [];
      }
    },
    circleData: {
      type: Array,
      default () {
        return [];
      }
    },
    polygonData: {
      type: Array,
      default () {
        return [];
      }
    },
    polylineData: {
      type: Array,
      default () {
        return [];
      }
    },
    lineData: {
      type: Array,
      default () {
        return [];
      }
    },
    daubData: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  watch: {
    imgSrc (val) {
      this.initImg();
    }
  },
  data () {
    return {
      p: { x: 0, y: 0 },
      snapCtx: null,
      offset: null,
      returnMode: null,
      curEditingGraph: {
        // 当前正在被编辑的图形
        shape: null,
        index: NaN,
        data: {}
      },
      loading: true,
      ImContainer: {
        width: 0,
        height: 0
      },
      imgObj: {
        src: null
      },
      imageConfig: {
        width: 0,
        height: 0
      }
    };
  },
  mounted () {
    this.initEvent();
    this.initImContainer();
    this.initImg();
    this.initHotKey();
    this.snapCtx = Snap("#svg");
    var s = Snap("#svg");
    var p = s.path("M0 0").attr({
      fill: "red",
      stroke: "#bada55",
      strokeWidth: 5
    });

    // console.log(p.attr("d"));

    // document.addEventListener("mousemove", function(e) {
    //   console.log(e);
    //   let newD = p.attr("d") + "L" + e.offsetX + "," + e.offsetY;
    //   p.attr({ d: newD });
    // });
  },
  methods: {
    clearAll () {
      this.$emit("update:rectData", []);
      this.$emit("update:circleData", []);
      this.$emit("update:polygonData", []);
      this.$emit("update:lineData", []);
      this.$emit("update:daubData", []);
      this.daubData.forEach((ele, i) => {
        ele.obj.remove();
      });
    },
    initHotKey () {
      let that = this;
      window.addEventListener("keydown", e => {
        if (e.keyCode === 16) {
          this.shifting = true;
          if (that.curEditingGraph.shape === "circle") {
            that.curEditingGraph.data.rx = that.curEditingGraph.data.ry;
          }
        }
      });
      window.addEventListener("keyup", e => {
        if (e.keyCode === 16) {
          this.shifting = false;
        }
      });
    },
    initEvent () {
      let that = this;
      window.addEventListener(
        "resize",
        function () {
          that.initImContainer();
          that.initScale();
          that.initSVGtranslate();
        },
        false
      );
    },
    initImContainer () {
      this.ImContainer.width = this.$refs.IMcontainer.offsetWidth;
      this.ImContainer.height = this.$refs.IMcontainer.offsetHeight;
    },
    initImg () {
      // 初始化图片，使其居中，自适应缩放
      let that = this;
      that.loading = true;
      that.imgObj = new Image();
      that.imgObj.src = that.imgSrc;
      that.imgObj.onload = function () {
        that.imageConfig.width = that.imgObj.width;
        that.imageConfig.height = that.imgObj.height;
        that.initScale();
        that.initSVGtranslate();
        that.loading = false;
        that.$emit("imgOnload", that.imageConfig);
        // that.initOpenSeadragon();
      };
    },
    initOpenSeadragon () {
      const options = {
        id: "openseadragon", //绑定ID
        showFullPageControl: false,
        showHomeControl: false,
        pixelsPerArrowPress: 0,
        zoomInButton: "zoom-in",
        zoomOutButton: "zoom-out",
        // mouseNavEnabled: 0,
        gestureSettingsMouse: {
          clickToZoom: false
        },
        tileSources: {
          type: "image",
          url: this.imgSrc
        }
      };
      let viewer = OpenSeadragon(options);
      // const homeBounds = viewer.world.getHomeBounds();
      // viewer.addOverlay(
      //   "svg",
      //   new OpenSeadragon.Rect(0, 0, homeBounds.width, homeBounds.height)
      // );
      viewer.addOverlay("svg")
      var containerWidth = viewer.container.clientWidth;
      console.log("containerWidth", containerWidth);
      var containerHeight = viewer.container.clientHeight;
      this.p = viewer.viewport.pixelFromPoint(
        new OpenSeadragon.Point(0, 0),
        true
      );
      this.SVGScale = viewer.viewport.getZoom(true);
      // var scale = viewer.viewport._containerInnerSize.x * zoom;
      console.log(this.p);
      // console.log(scale);
      // console.log("viewer.viewport", viewer.viewport);
      // viewer.addOverlay("svg");
      // this.SVGScale = viewer.viewport.getZoom(true);
      viewer.addHandler("zoom", params => {
        this.SVGScale = params.zoom;
        console.log('SVGScale', this.SVGScale)
        console.log('viewer.viewport._containerInnerSize.x', viewer.viewport)
      });
    },
    initScale () {
      // 初始化图像大小
      if (
        this.imageConfig.width > this.ImContainer.width ||
        this.imageConfig.height > this.ImContainer.height
      ) {
        this.SVGDefaultScale = Math.min(
          this.ImContainer.width / this.imageConfig.width,
          this.ImContainer.height / this.imageConfig.height
        );
        this.SVGScale = this.SVGDefaultScale;
      } else {
        this.SVGScale = this.SVGDefaultScale = 1;
      }
    },
    initTextStyle () {
      this.textStyle.fontSize = parseInt(15 / this.SVGDefaultScale);
      this.rectStyle.strokeWidth = parseInt(2 / this.SVGDefaultScale);
    },
    initSVGtranslate () {
      this.SVGtranslate.x =
        (this.ImContainer.width - this.imageConfig.width) / 2;
      this.SVGtranslate.y =
        (this.ImContainer.height - this.imageConfig.height) / 2;
    }
  }
};
</script>

<style>
svg {
  overflow: visible;
}
.im-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #eeeeee;
}
.loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
.anchor {
  cursor: pointer;
}
text {
  user-select: none;
}
</style>
