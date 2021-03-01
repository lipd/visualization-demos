const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const r1 = 200
const r2 = 100

const starSize = [400, 400]
ctx.fillStyle = 'red'
ctx.translate(0.5 * starSize[0], 0.5 * starSize[1])
ctx.beginPath()
for (let i = 0; i < 5; i++) {
  const x1 = r1 * Math.cos((18 + 72 * i) / 180 * Math.PI)
  const y1 = r1 * Math.sin((18 + 72 * i) / 180 * Math.PI) * -1
  const x2 = r2 * Math.cos((54 + 72 * i) / 180 * Math.PI)
  const y2 = r2 * Math.sin((54 + 72 * i) / 180 * Math.PI) * -1
  ctx.lineTo(x1, y1)
  ctx.lineTo(x2, y2)
}
ctx.closePath()
ctx.fill()
