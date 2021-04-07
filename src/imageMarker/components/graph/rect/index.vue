<template>
  <g @mousedown="handleGraphMousedown" :style="{ cursor: editable ?'move':'default' }">
    <text
      v-show="showText"
      :x="Math.min(x1,x2)"
      :y="Math.min(y1,y2)-painterStyle.strokeWidth"
      :fill="painterStyle.stroke"
      :font-size="painterStyle.fontSize"
    >{{painterStyle.text}}</text>
    <path
      :d="`M${Math.min(x1,x2)} ${Math.min(y1,y2)}L${Math.max(x1,x2)} ${Math.min(y1,y2)}L${Math.max(x1,x2)} ${Math.max(y1,y2)}L${Math.min(x1,x2)} ${Math.max(y1,y2)}Z`"
      :stroke="painterStyle.stroke"
      :stroke-opacity="painterStyle.strokeOpacity"
      :stroke-width="painterStyle.strokeWidth/SVGScale"
      :fill="painterStyle.fill"
      :fill-opacity="painterStyle.fillOpacity"
    />
    <g v-if="editable">
      <circle
        class="anchor"
        :cx="Math.min(x1,x2)"
        :cy="Math.min(y1,y2)"
        :r="anchorStyle.r"
        :stroke="anchorStyle.stroke"
        :stroke-width="anchorStyle.strokeWidth"
        :fill="anchorStyle.fill"
        @mousedown="handleAnchorMousedown(0)"
      />
      <circle
        class="anchor"
        :cx="Math.max(x1,x2)"
        :cy="Math.min(y1,y2)"
        :r="anchorStyle.r"
        :stroke="anchorStyle.stroke"
        :stroke-width="anchorStyle.strokeWidth"
        :fill="anchorStyle.fill"
        @mousedown="handleAnchorMousedown(1)"
      />
      <circle
        class="anchor"
        :cx="Math.max(x1,x2)"
        :cy="Math.max(y1,y2)"
        :r="anchorStyle.r"
        :stroke="anchorStyle.stroke"
        :stroke-width="anchorStyle.strokeWidth"
        :fill="anchorStyle.fill"
        @mousedown="handleAnchorMousedown(2)"
      />
      <circle
        class="anchor"
        :cx="Math.min(x1,x2)"
        :cy="Math.max(y1,y2)"
        :r="anchorStyle.r"
        :stroke="anchorStyle.stroke"
        :stroke-width="anchorStyle.strokeWidth"
        :fill="anchorStyle.fill"
        @mousedown="handleAnchorMousedown(3)"
      />
    </g>
  </g>
</template>

<script>
import mixin from '../mixin'
export default {
  name: 'im-rect',
  mixins: [mixin],
  props: {
    x1: Number,
    y1: Number,
    x2: Number,
    y2: Number,
    painterStyle: Object,
    SVGScale: Number
  },
  mounted () {

  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>
</style>