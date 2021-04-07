<template>
  <g @mousedown="handleGraphMousedown" :style="{ cursor: editable ?'move':'default' }">
    <!-- <text
      :x="x1"
      :y="y1-10"
      :fill="painterStyle.stroke"
      :font-size="painterStyle.fontSize"
    >{{painterStyle.text}}</text>-->
    <line
      :x1="x1"
      :y1="y1"
      :x2="x2"
      :y2="y2"
      :stroke="painterStyle.stroke"
      :stroke-opacity="painterStyle.strokeOpacity"
      :stroke-width="painterStyle.strokeWidth/SVGScale"
      :fill="painterStyle.fill"
      :fill-opacity="painterStyle.fillOpacity"
      stroke-linecap="round"
      stroke-linejoin="round"
      vector-effect="non-scaling-stroke"
    />
    <!-- <g v-if="editable">
      <circle
        class="anchor"
        :cx="x"
        :cy="y"
        :r="anchorStyle.width/SVGScale"
        :stroke="anchorStyle.stroke"
        :stroke-width="anchorStyle.strokeWidth/SVGScale"
        :fill="anchorStyle.fill"
        @mousedown="handleAnchorMousedown(0)"
      />
      <circle
        class="anchor"
        :cx="x+width"
        :cy="y"
        :r="anchorStyle.width/SVGScale"
        :stroke="anchorStyle.stroke"
        :stroke-width="anchorStyle.strokeWidth/SVGScale"
        :fill="anchorStyle.fill"
        @mousedown="handleAnchorMousedown(1)"
      />
      <circle
        class="anchor"
        :cx="x+width"
        :cy="y+height"
        :r="anchorStyle.width/SVGScale"
        :stroke="anchorStyle.stroke"
        :stroke-width="anchorStyle.strokeWidth/SVGScale"
        :fill="anchorStyle.fill"
        @mousedown="handleAnchorMousedown(2)"
      />
      <circle
        class="anchor"
        :cx="x"
        :cy="y+height"
        :r="anchorStyle.width/SVGScale"
        :stroke="anchorStyle.stroke"
        :stroke-width="anchorStyle.strokeWidth/SVGScale"
        :fill="anchorStyle.fill"
        @mousedown="handleAnchorMousedown(3)"
      />
    </g>-->
  </g>
</template>

<script>
import mixin from '../mixin'
export default {
  name: 'im-line',
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