<template>
  <g @mousedown="handleGraphMousedown" :style="{ cursor: editable ?'move':'default' }">
    <text
      :x="x"
      :y="y-10"
      :fill="painterStyle.stroke"
      :font-size="painterStyle.fontSize"
    >{{painterStyle.text}}</text>
    <path
      :d="`M${x} ${y}L${x+width} ${y}L${x+width} ${y+height}L${x} ${y+height}Z`"
      :stroke="painterStyle.stroke"
      :stroke-opacity="painterStyle.strokeOpacity"
      :stroke-width="painterStyle.strokeWidth"
      :fill="painterStyle.fill"
      :fill-opacity="painterStyle.fillOpacity"
    />
    <g v-if="editable">
      <circle
        class="anchor"
        :cx="x"
        :cy="y"
        :r="anchorStyle.width"
        :stroke="anchorStyle.stroke"
        :stroke-width="anchorStyle.strokeWidth"
        :fill="anchorStyle.fill"
        @mousedown="handleAnchorMousedown(0)"
      />
      <circle
        class="anchor"
        :cx="x+width"
        :cy="y"
        :r="anchorStyle.width"
        :stroke="anchorStyle.stroke"
        :stroke-width="anchorStyle.strokeWidth"
        :fill="anchorStyle.fill"
        @mousedown="handleAnchorMousedown(1)"
      />
      <circle
        class="anchor"
        :cx="x+width"
        :cy="y+height"
        :r="anchorStyle.width"
        :stroke="anchorStyle.stroke"
        :stroke-width="anchorStyle.strokeWidth"
        :fill="anchorStyle.fill"
        @mousedown="handleAnchorMousedown(2)"
      />
      <circle
        class="anchor"
        :cx="x"
        :cy="y+height"
        :r="anchorStyle.width"
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
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    painterStyle: Object
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