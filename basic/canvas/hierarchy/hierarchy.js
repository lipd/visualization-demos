const dataSource = 'https://s5.ssl.qhres.com/static/b0695e2dd30daa64.json';
const TAU = 2 * Math.PI

function draw(ctx, node, {fillStyle = 'rgba(0, 0, 0, 0.2)', textColor = 'white'} = {}) {
  const children = node.children
  const {x, y, r} = node
  ctx.fillStyle = fillStyle
  ctx.beginPath()
  ctx.arc(x, y, r, 0, TAU)
  ctx.fill()
  if (children) {
    for (let i = 0; i < children.length; i++) {
      draw(ctx, children[i])
    }
  } else {
    const name = node.data.name
    ctx.fillStyle = textColor
    ctx.font = '1.5rem Arial'
    ctx.textAlign = 'center'
    ctx.fillText(name, x, y)
  }
}

(async function () {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')

  const data = await (await fetch(dataSource)).json();

  // 将省份数据按照城市数量排序
  const regions = d3.hierarchy(data)
    .sum(d => 1)
    .sort((a, b) => b.value - a.value)

  const pack = d3.pack()
    .size([1600, 1600]) // 映射为一组宽高为 1600 的圆形
    .padding(3) // 通常每个相邻圆形之间保留 3 像素的间距

  const root = pack(regions)
  draw(ctx, root)

}());