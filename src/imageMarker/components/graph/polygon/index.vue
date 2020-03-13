<template>
  <g @mousedown="handleGraphMousedown" :style="{ cursor: editable ?'move':'default' }">
    <text
      :x="textX"
      :y="textY"
      :fill="painterStyle.stroke"
      :font-size="painterStyle.fontSize"
    >{{painterStyle.text}}</text>
    <polygon
      v-if="!temp"
      :points="path"
      :stroke="painterStyle.stroke"
      :stroke-opacity="painterStyle.strokeOpacity"
      :stroke-width="painterStyle.strokeWidth"
      :fill="painterStyle.fill"
      :fill-opacity="painterStyle.fillOpacity"
    />
    <polyline
      v-else
      :points="path"
      :stroke="painterStyle.stroke"
      :stroke-opacity="painterStyle.strokeOpacity"
      :stroke-width="painterStyle.strokeWidth"
      :fill="painterStyle.fill"
      :fill-opacity="painterStyle.fillOpacity"
    />
    <line
      v-if="temp && painterStyle.shape === 'polygon' && points.length > 0 && offset"
      :x1="points[points.length -1].x"
      :y1="points[points.length -1].y"
      :x2="offset.x"
      :y2="offset.y"
      stroke="#3388ff"
      stroke-width="3"
      stroke-dasharray="5,5"
    />
    <g v-if="editable || temp">
      <circle
        class="anchor"
        v-for="(point,index) in points"
        :key="index"
        :cx="point.x"
        :cy="point.y"
        :r="anchorStyle.width"
        :stroke="anchorStyle.stroke"
        :stroke-width="anchorStyle.strokeWidth"
        :fill="anchorStyle.fill"
        @mousedown="handleAnchorMousedown(index)"
        @click.stop="handleAnchorClick"
      />
    </g>
  </g>
</template>

<script>
import mixin from '../mixin'
export default {
  name: 'im-polygon',
  mixins: [mixin],
  props: {
    points: Array,
    painterStyle: Object,
    temp: Boolean,
    offset: Object
  },
  computed: {
    path () {
      let result = this.points.map(item => {
        return item.x + ' ' + item.y
      })
      return result.join(",")
    },
    textX () {
      let xs = this.points.map(item => { return item.x })
      return Math.min(...xs)
    },
    textY () {
      let ys = this.points.map(item => { return item.y })
      return Math.min(...ys)
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleAnchorClick () {
      this.$emit('drawPolygonFinish')
    }
  }
}
</script>

<style>
</style>