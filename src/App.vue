<template>
  <div style="width: 100%;height:100%;margin: 0 auto;">
    <div class="toolbar">
      <div class="toolbar__group">
        <i class="iconfont icon-fangda toolbar__group--item" @click="zoom(1)" title="放大"></i>
        <i class="iconfont icon-suoxiao toolbar__group--item" @click="zoom(-1)" title="缩小"></i>
        <i
          class="iconfont icon-huanyuanpingmudaxiao toolbar__group--item"
          @click="zoom(0)"
          title="适应屏幕"
        ></i>
        <i
          class="iconfont icon-yidong toolbar__group--item"
          :class="{ selected: mode === 'svgMoving' }"
          @click="setMode('svgMoving')"
          title="移动画布"
        ></i>
        <i
          class="iconfont icon-biaoqianguanli toolbar__group--item"
          @click="toggleShowText"
          title="隐藏标签"
        ></i>
      </div>
      <div class="toolbar__group">
        <i
          title="删除"
          class="iconfont icon-eraser toolbar__group--item"
          :class="{ selected: mode === 'eraser' }"
          @click="setMode('eraser')"
        ></i>
        <i
          title="清空"
          class="iconfont icon-qingchushujuku toolbar__group--item"
          @click="clearGraphData"
        ></i>
        <i
          class="iconfont icon-xuanze toolbar__group--item"
          :class="{ selected: mode === 'editing' }"
          @click="setMode('editing')"
        ></i>
      </div>
      <div class="toolbar__group">
        <i class="iconfont icon-ziyuan toolbar__group--item">
          <div class="pencile">
            <div>
              stroke:
              <input type="color" v-model="painterStyle.stroke" />
            </div>
            <div>
              strokeOpacity:
              <input type="number" v-model="painterStyle.strokeOpacity" />
            </div>
            <div>
              strokeWidth:
              <input type="number" v-model="painterStyle.strokeWidth" />
            </div>
            <div>
              fill:
              <input type="color" v-model="painterStyle.fill" />
            </div>
            <div>
              fillOpacity:
              <input type="number" v-model="painterStyle.fillOpacity" />
            </div>
            <div>
              text:
              <input type="text" v-model="painterStyle.text" />
            </div>
            <div>
              fontSize:
              <input type="number" v-model="painterStyle.fontSize" />
            </div>
          </div>
        </i>
        <i
          title="矩形"
          class="iconfont icon-juxing toolbar__group--item"
          :class="{ selected: painterStyle.shape === 'rect' }"
          @click="setShape('rect')"
        ></i>
        <i
          title="椭圆"
          class="iconfont icon-icon-yuanxk toolbar__group--item"
          :class="{ selected: painterStyle.shape === 'circle' }"
          @click="setShape('circle')"
        ></i>
        <i
          title="多边形"
          class="iconfont icon-draw-polygon-solid toolbar__group--item"
          :class="{ selected: painterStyle.shape === 'polygon' }"
          @click="setShape('polygon')"
        ></i>
        <i
          title="直线"
          class="iconfont icon-zhixian-xuanzhong toolbar__group--item"
          :class="{ selected: painterStyle.shape === 'line' }"
          @click="setShape('line')"
        ></i>
        <i
          title="涂抹"
          class="iconfont icon-quxian-xuanzhong toolbar__group--item"
          :class="{ selected: painterStyle.shape === 'daub' }"
          @click="setShape('daub')"
        ></i>
      </div>
    </div>

    <image-marker
      ref="imageMarker"
      :img-src="imgSrc"
      :mode.sync="mode"
      :painterStyle="painterStyle"
      :rectData.sync="rectData"
      :circleData.sync="circleData"
      :polygonData.sync="polygonData"
      :daubData.sync="daubData"
      :lineData.sync="lineData"
      :showText="showText"
      @imgOnload="imgOnload"
    ></image-marker>
  </div>
</template>

<script>
import imageMarker from "./imageMarker/image-marker";

export default {
  name: "app",
  components: { imageMarker },
  data () {
    return {
      imgSrc:"src/assets/bg.jpg",
      mode: null,
      showText: true,
      painterStyle: {
        shape: null,
        stroke: "#3388ff",
        strokeOpacity: "1",
        strokeWidth: "3",
        fill: "#3388ff",
        fillOpacity: "0.2",
        text: "hi",
        fontSize: 30
      },
      polygonData: [
        // {
        //   data: [{
        //     x: 0,
        //     y: 0
        //   },
        //   {
        //     x: 100,
        //     y: 100
        //   },
        //   {
        //     x: 0,
        //     y: 200
        //   }],
        //   style: {
        //     stroke: "#3388ff",
        //     strokeOpacity: "1",
        //     strokeWidth: "3",
        //     fill: "#3388ff",
        //     fillOpacity: "0.2"
        //   }
        // }
      ],
      lineData: [
        // {
        //   data: {
        //     x1: 0,
        //     y1: 0,
        //     x2: 1000,
        //     y2: 1000
        //   },
        //   style: {
        //     stroke: "#0078EC",
        //     strokeOpacity: "1",
        //     strokeWidth: "3",
        //     fill: "transparent",
        //     fillOpacity: "0.2"
        //   }
        // }
      ],
      rectData: [
        // {
        //   data: {
        //     x: 0,
        //     y: 0,
        //     width: 100,
        //     height: 100
        //   },
        //   style: {
        //     stroke: "#0078EC",
        //     strokeOpacity: "1",
        //     strokeWidth: "3",
        //     fill: "transparent",
        //     fillOpacity: "0.2"
        //   }
        // }
      ],
      circleData: [
        // {
        //   data: {
        //     x: 200,
        //     y: 200,
        //     rx: 100,
        //     ry: 200
        //   },
        //   style: {
        //     stroke: "#3388ff",
        //     strokeOpacity: "1",
        //     strokeWidth: "3",
        //     fill: "#3388ff",
        //     fillOpacity: "0.2"
        //   }
        // }
      ],
      daubData: [
        {
          data: [
            {
              x: 50,
              y: 150
            },
            {
              x: 250,
              y: 150
            },
            {
              x: 300,
              y: 400
            }
          ],
          style: {
            stroke: "white",
            strokeOpacity: "1",
            strokeWidth: "30",
            fill: "transparent",
            fillOpacity: "0.2"
          }
        }
      ]
    };
  },
  mounted () {
    let that = this;
    // setTimeout(function () {
    //   that.imgSrc = 'http://192.168.20.104:81/indai/template/originalPictureRootPath/74b3b8ecca0e4ca7a519774162008728.jpg'
    // }, 2000)
  },
  methods: {
    toggleShowText () {
      this.showText = !this.showText
    },
    getCut () {
      console.log(this.$refs["imageMarker"].curEditingGraph.data);
    },
    imgOnload (val) {
      // this.rectData[0].data.width = val.width
      // this.rectData[0].data.height = val.height
      // this.mode = 'editing'
      // this.$refs['imageMarker'].curEditingGraph.shape = "rect"
      // this.$refs['imageMarker'].curEditingGraph.index = 0
      // this.$refs['imageMarker'].curEditingGraph.data = this.rectData[0]
    },
    clearGraphData () {
      this.$refs['imageMarker'].clearAll()
    },
    setMode (mode) {
      this.clearShape();
      this.mode = mode;
    },
    clearShape () {
      this.painterStyle.shape = null;
    },
    setShape (shape) {
      this.setMode("draw");
      this.painterStyle.shape = shape;
    },
    zoom (isLarge) {
      this.$refs["imageMarker"].zoom(isLarge);
    }
  }
};
</script>

<style lang="css">
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
}
.toolbar {
  position: absolute;
  z-index: 1;
  left: 10px;
  top: 10px;
}
.pencile {
  width: 160px;
  background: #fff;
  text-align: right;
  padding: 20px 20px 20px 0;
  position: absolute;
  left: 30px;
  top: 0;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
  border-radius: 4px;
  display: none;
}
.pencile input {
  width: 40px;
  margin-left: 10px;
  margin-bottom: 10px;
}

.toolbar__group {
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
  border-radius: 4px;
  margin-bottom: 15px;
  width: 30px;
  background-color: rgba(255, 255, 255, 0.8);
}
.toolbar__group--item {
  cursor: pointer;
  font-size: 14px;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  position: relative;
}
.toolbar__group--item:hover .pencile {
  display: block;
}
.toolbar__group--item:hover {
  background-color: #eee;
  transition: all 0.3s;
}
.selected {
  box-shadow: inset 0 -1px 5px 2px rgba(81, 77, 77, 0.31);
}
</style>
