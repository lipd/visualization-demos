const dataSource = 'https://s5.ssl.qhres.com/static/b0695e2dd30daa64.json';
const TAU = 2 * Math.PI

function draw (parent, node, {fillStyle = 'rgba(0, 0, 0, 0.2)', textColor = 'white'} = {}) {
  const children = node.children
  const {x, y, r} = node
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  circle.setAttribute('cx', x)
  circle.setAttribute('cy', y)
  circle.setAttribute('r', r)
  circle.setAttribute('fill', fillStyle)
  circle.setAttribute('data-name', node.data.name)
  parent.appendChild(circle)

  if(children) {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    for (let i = 0; i < children.length; i++) {
      draw(group, children[i], {fillStyle, textColor});
    }
    group.setAttribute('data-name', node.data.name)
    parent.appendChild(group)
  } else {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttribute('fill', textColor)
    text.setAttribute('font-family', 'Arial')
    text.setAttribute('font-size', '1.5rem')
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('x', x)
    text.setAttribute('y', y)
    const name = node.data.name
    text.textContent = name
    parent.appendChild(text)
  }
}

function getTitle(target) {
  const name = target.getAttribute('data-name')
  if (target.parentNode && target.parentNode.nodeName === 'g') {
    const parentName = target.parentNode.getAttribute('data-name')
    return `${parentName}-${name}`
  }
  return name
}

(async function () {
  const svgroot = document.querySelector('svg')

  const data = await (await fetch(dataSource)).json();

  // 将省份数据按照城市数量排序
  const regions = d3.hierarchy(data)
    .sum(d => 1)
    .sort((a, b) => b.value - a.value)

  const pack = d3.pack()
    .size([1600, 1600]) // 映射为一组宽高为 1600 的圆形
    .padding(3) // 通常每个相邻圆形之间保留 3 像素的间距

  const root = pack(regions)
  draw(svgroot, root)

  const titleEl = document.getElementById('title')

  let activeTraget = null
  svgroot.addEventListener('mousemove', evt => {
    let target = evt.target
    if (target.nodeName === 'text') target = target.previousSibling
    if (activeTraget !== target) {
      if (activeTraget) {
        activeTraget.setAttribute('fill', 'rgba(0, 0, 0, 0.2)')
      }
    }
    target.setAttribute('fill', 'rgba(0, 128, 0, 0.1)')
    titleEl.textContent = getTitle(target)
    activeTraget = target
  })
}());