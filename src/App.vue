<template>
  <div style="width: 100%;height:100%;margin: 0 auto;">
    <div class="toolbar">
      <div class="toolbar__group">
        <i class="iconfont icon-fangda toolbar__group--item" @click="zoom(1)"></i>
        <i class="iconfont icon-suoxiao toolbar__group--item" @click="zoom(-1)"></i>
        <i class="iconfont icon-huanyuanpingmudaxiao toolbar__group--item" @click="zoom(0)"></i>
      </div>
      <div class="toolbar__group">
        <i
          class="iconfont icon-yidong toolbar__group--item"
          :class="{'selected': mode==='svgMoving'}"
          @click="setMode('svgMoving')"
        ></i>
        <i
          class="iconfont icon-eraser toolbar__group--item"
          :class="{'selected': mode==='eraser'}"
          @click="setMode('eraser')"
        ></i>

        <i
          class="iconfont icon-xuanze toolbar__group--item"
          :class="{'selected': mode==='editing'}"
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
          </div>
        </i>
        <i
          class="iconfont icon-juxing toolbar__group--item"
          :class="{'selected': painterStyle.shape==='rect'}"
          @click="setShape('rect')"
        ></i>
        <i
          class="iconfont icon-icon-yuanxk toolbar__group--item"
          :class="{'selected': painterStyle.shape==='circle'}"
          @click="setShape('circle')"
        ></i>
        <i
          class="iconfont icon-draw-polygon-solid toolbar__group--item"
          :class="{'selected': painterStyle.shape==='polygon'}"
          @click="setShape('polygon')"
        ></i>
      </div>
    </div>

    <image-marker
      ref="imageMarker"
      :img-src="imgSrc"
      :mode.sync="mode"
      :painterStyle="painterStyle"
      :rectData="rectData"
      :circleData="circleData"
      :polygonData="polygonData"
    ></image-marker>
  </div>
</template>

<script>
import imageMarker from './imageMarker/image-marker'
export default {
  name: 'app',
  components: { imageMarker },
  data () {
    return {
      imgSrc: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583387735060&di=00a8267ee16526e3436e0aa73b299564&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201510%2F13%2F20151013170839_yuZjk.jpeg",
      mode: null,
      painterStyle: {
        shape: null,
        stroke: "#3388ff",
        strokeOpacity: "1",
        strokeWidth: "3",
        fill: "#3388ff",
        fillOpacity: "0.2"
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
      rectData: [
        // {
        //   data: {
        //     x: 0,
        //     y: 0,
        //     width: 100,
        //     height: 100
        //   },
        //   style: {
        //     stroke: "#ffd717",
        //     strokeOpacity: "1",
        //     strokeWidth: "3",
        //     fill: "#ffd717",
        //     fillOpacity: "0.2"
        //   }
        // }
      ],
      circleData: [
        // {
        //   data: {
        //     x: 200,
        //     y: 200,
        //     r: 100
        //   },
        //   style: {
        //     stroke: "#3388ff",
        //     strokeOpacity: "1",
        //     strokeWidth: "3",
        //     fill: "#3388ff",
        //     fillOpacity: "0.2"
        //   }
        // }
      ]
    }
  },
  methods: {
    setMode (mode) {
      this.clearShape()
      this.mode = mode
    },
    clearShape () {
      this.painterStyle.shape = null
    },
    setShape (shape) {
      this.setMode('draw')
      this.painterStyle.shape = shape
    },
    zoom (isLarge) {
      this.$refs['imageMarker'].zoom(isLarge)
    }
  }
}
</script>

<style>
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
  background-color: #fff;
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