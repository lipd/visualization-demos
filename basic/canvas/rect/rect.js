const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const rectSize = [100, 100]
ctx.fillStyle = 'red'
ctx.translate(-0.5 * rectSize[0], -0.5 * rectSize[1])
ctx.beginPath()
ctx.rect(0.5 * canvas.width, 0.5 * canvas.height, ...rectSize)
ctx.fill()
