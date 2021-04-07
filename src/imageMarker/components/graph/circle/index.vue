<template>
  <g @mousedown="handleGraphMousedown" :style="{ cursor: editable ?'move':'default' }">
    <text
      v-show="showText"
      :x="x"
      :y="y-ry-painterStyle.strokeWidth"
      :fill="painterStyle.stroke"
      :font-size="painterStyle.fontSize"
    >{{painterStyle.text}}</text>
    <path
      :d="`M ${x-rx} ${y} a ${rx} ${ry} 0 1 0 ${2*rx} 0 a ${rx} ${ry} 0 1 0 ${-2*rx} 0 z`"
      :stroke="painterStyle.stroke"
      :stroke-opacity="painterStyle.strokeOpacity"
      :stroke-width="painterStyle.strokeWidth/SVGScale"
      :fill="painterStyle.fill"
      :fill-opacity="painterStyle.fillOpacity"
    />
    <g v-if="editable">
      <line
        :x1="x"
        :y1="y"
        :x2="x+rx"
        :y2="y"
        :stroke="anchorStyle.stroke"
        :stroke-width="painterStyle.strokeWidth/SVGScale"
        :stroke-dasharray="`${painterStyle.strokeWidth},${painterStyle.strokeWidth}`"
      />
      <line
        :x1="x"
        :y1="y"
        :x2="x"
        :y2="y+ry"
        :stroke="anchorStyle.stroke"
        :stroke-width="painterStyle.strokeWidth"
        :stroke-dasharray="`${painterStyle.strokeWidth},${painterStyle.strokeWidth}`"
      />
      <circle
        class="anchor"
        :cx="x"
        :cy="y+ry"
        :r="anchorStyle.r"
        :stroke="anchorStyle.stroke"
        :stroke-width="anchorStyle.strokeWidth"
        :fill="anchorStyle.fill"
        @mousedown="handleAnchorMousedown"
      />
      <circle
        class="anchor"
        :cx="x+rx"
        :cy="y"
        :r="anchorStyle.r"
        :stroke="anchorStyle.stroke"
        :stroke-width="anchorStyle.strokeWidth"
        :fill="anchorStyle.fill"
        @mousedown="handleAnchorMousedown"
      />
      <circle
        class="anchor"
        :cx="x"
        :cy="y"
        :r="anchorStyle.r"
        :stroke="anchorStyle.stroke"
        :stroke-width="anchorStyle.strokeWidth"
        :fill="anchorStyle.fill"
      />
    </g>
  </g>
</template>

<script>
import mixin from '../mixin'
export default {
  name: 'im-circle',
  mixins: [mixin],
  props: {
    x: Number,
    y: Number,
    rx: Number,
    ry: Number,
    painterStyle: Object,
    SVGScale: Number
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