<template>
  <div style="width: 100%;height:100%;margin: 0 auto;">
    <image-marker :img-src="imgSrc" :mode="mode"></image-marker>
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
      mode: 'editing',
      pencil: {
        shape: 'rect',
        strokeColor: 'red',
        strokeWidth: 1,
        fillColor: 'green'
      }
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
</style>
