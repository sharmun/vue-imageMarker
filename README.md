# image-marker

> A vue compoment that can draw graphs on image background

## display
![avatar](https://thumbnail0.baidupcs.com/thumbnail/0b831172bs2d3bb214b366ec31dfb931?fid=939934425-250528-349492674296658&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-PIaGTFiSnytRUruMwjj2Dkiz80k%3d&expires=8h&chkbd=0&chkv=0&dp-logid=1661645728819725922&dp-callid=0&time=1583996400&size=c1920_u1080&quality=90&vuk=939934425&ft=image&autopolicy=1)


### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| imgSrc   | 底图src    | String | — | — |
| minScale | 最小缩放值 | Number | — | 0.5 |
| maxScale | 最大缩放值 | Number | — | 5 |
| stepScale | 缩放步长 | Number | — | 0.1 |
| mode     | 当前所处模式 | String | null/draw/editing/svgMoving/eraser | — |
| painterStyle | 画笔样式 | Object | — | — |
| graphData | 图形数据 | Array | — | [] |

<!-- ### Slot

| Name | Description |
|------|--------|
| — | 描述 |
| title | 标题的内容 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭alert时触发的事件 | — | -->
