<template>
  <g @mousedown="handleGraphMousedown" :style="{ cursor: editable ?'move':'default' }">
    <text
      :x="x"
      :y="y-r-10"
      :fill="painterStyle.stroke"
      :font-size="painterStyle.fontSize"
    >{{painterStyle.text}}</text>
    <circle
      :cx="x"
      :cy="y"
      :r="r"
      :stroke="painterStyle.stroke"
      :stroke-opacity="painterStyle.strokeOpacity"
      :stroke-width="painterStyle.strokeWidth"
      :fill="painterStyle.fill"
      :fill-opacity="painterStyle.fillOpacity"
    />
    <g v-if="editable">
      <line
        :x1="x"
        :y1="y"
        :x2="x+r"
        :y2="y"
        stroke="#3388ff"
        stroke-width="3"
        stroke-dasharray="5,5"
      />
      <circle
        class="anchor"
        :cx="x"
        :cy="y"
        :r="anchorStyle.width"
        :stroke="anchorStyle.stroke"
        :stroke-width="anchorStyle.strokeWidth"
        :fill="anchorStyle.fill"
      />
      <circle
        class="anchor"
        :cx="x+r"
        :cy="y"
        :r="anchorStyle.width"
        :stroke="anchorStyle.stroke"
        :stroke-width="anchorStyle.strokeWidth"
        :fill="anchorStyle.fill"
        @mousedown="handleAnchorMousedown"
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
    r: Number,
    painterStyle: Object
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