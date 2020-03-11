<template>
  <div class="im-container" ref="IMcontainer" @mousewheel="handleSVGMouseWheel">
    <div v-if="loading" class="loading">图片加载中...</div>
    <svg
      v-else
      :width="imageConfig.width"
      :height="imageConfig.height"
      :transform="`translate(${SVGtranslate.x} ${SVGtranslate.y}) scale(${SVGScale})`"
      @click.prevent="handleSVGClick"
      @contextmenu.prevent="handleSVGRightClick"
      @mousedown="handleSvgMouseDown"
      @mouseup="handleSvgMouseUp"
      @mousemove="handleSVGMousemove"
      @mouseleave="handleSvgMouseLeave"
      :style="{'cursor': mode ==='svgMoving'? 'move' : mode ==='draw'? 'pointer':'default'}"
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
          <im-circle
            v-for="(circle,index) in circleData"
            :ref="'c'+index"
            :key="'c'+index"
            :editable="curEditingGraph.shape==='circle'&& curEditingGraph.index === index"
            :x="circle.data.x"
            :y="circle.data.y"
            :r="circle.data.r"
            :painterStyle="circle.style"
            @handleGraphMousedown="handleGraphMousedown('circle',index)"
            @startSkew="startSkew"
            :style="{'cursor': mode ==='editing'? 'move' : 'default'}"
          />
          <im-rect
            v-for="(rect,index) in rectData"
            :key="'r'+index"
            :editable="curEditingGraph.shape==='rect'&& curEditingGraph.index === index"
            :x="rect.data.x"
            :y="rect.data.y"
            :width="rect.data.width"
            :height="rect.data.height"
            :painterStyle="rect.style"
            @handleGraphMousedown="handleGraphMousedown('rect', index)"
            @startSkew="startSkew"
            @setAnchorIndex="setAnchorIndex"
            :style="{'cursor': mode ==='editing'? 'move' : 'default'}"
          />
          <im-polygon
            v-for="(polygon,index) in polygonData"
            :key="'p'+index"
            :editable="curEditingGraph.shape==='polygon'&& curEditingGraph.index === index"
            :points="polygon.data"
            :painterStyle="polygon.style"
            :temp="polygon.hasOwnProperty('temp')"
            @handleGraphMousedown="handleGraphMousedown('polygon',index)"
            @startSkew="startSkew"
            @setAnchorIndex="setAnchorIndex"
            @drawPolygonFinish="drawPolygonFinish"
            :style="{'cursor': mode ==='editing'? 'move' : 'default'}"
          />
        </g>
        <!-- graph end-->
      </g>
    </svg>
  </div>
</template>

<script>
import imCircle from './components/graph/circle'
import imRect from './components/graph/rect'
import imPolygon from './components/graph/polygon'
import scaleMixin from './mixin/scale.js'
import moveMixin from './mixin/move.js'
import skewMixin from './mixin/skew.js'
import drawMixin from './mixin/draw.js'
export default {
  name: 'image-marker',
  mixins: [moveMixin, scaleMixin, skewMixin, drawMixin],
  components: {
    imCircle,
    imRect,
    imPolygon
  },
  props: {
    imgSrc: String,
    minScale: Number,
    maxScale: Number,
    pencil: Object,
    mode: {
      type: String,
      defaulf () {
        return null  // draw-画新graph   editing-编辑现有graph  svgMoving-拖拽整个画布
      }
    },
    rectData: {
      type: Array,
      default () {
        return []
      }
    },
    circleData: {
      type: Array,
      default () {
        return []
      }
    },
    polygonData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      returnMode: null,
      curEditingGraph: { // 当前正在被编辑的图形
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
    }
  },
  mounted () {
    this.initEvent()
    this.initImContainer()
    this.initImg()
  },
  methods: {
    initEvent () {
      let that = this
      window.addEventListener(
        "resize", function () {
          that.initImContainer()
          that.initScale()
          that.initSVGtranslate()
        }, false
      )
    },
    initImContainer () {
      this.ImContainer.width = this.$refs.IMcontainer.offsetWidth
      this.ImContainer.height = this.$refs.IMcontainer.offsetHeight
    },
    initImg () { // 初始化图片，使其居中，自适应缩放
      let that = this
      that.imgObj = new Image()
      that.imgObj.src = that.imgSrc
      that.imgObj.onload = function () {
        that.imageConfig.width = that.imgObj.width
        that.imageConfig.height = that.imgObj.height
        that.initScale()
        that.initSVGtranslate()
        that.loading = false
      }
    },
    initScale () { // 初始化图像大小
      if (this.imageConfig.width > this.ImContainer.width || this.imageConfig.height > this.ImContainer.height) {
        this.SVGDefaultScale = Math.min(this.ImContainer.width / this.imageConfig.width, this.ImContainer.height / this.imageConfig.height)
        this.SVGScale = this.SVGDefaultScale
      } else {
        this.SVGScale = this.SVGDefaultScale = 1
      }
    },
    initTextStyle () {
      this.textStyle.fontSize = parseInt(15 / this.SVGDefaultScale)
      this.rectStyle.strokeWidth = parseInt(2 / this.SVGDefaultScale)
    },
    initSVGtranslate () {
      this.SVGtranslate.x = (this.ImContainer.width - this.imageConfig.width) / 2
      this.SVGtranslate.y = (this.ImContainer.height - this.imageConfig.height) / 2
    },
  }
}
</script>

<style>
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
</style>
