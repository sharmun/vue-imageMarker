<template>
  <g @mousedown="handleGraphMousedown" :style="{ cursor: editable ?'move':'default' }">
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
    temp: Boolean
  },
  computed: {
    path () {
      let result = this.points.map(item => {
        return item.x + ' ' + item.y
      })
      return result.join(",")
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