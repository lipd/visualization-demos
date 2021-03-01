const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'red'
ctx.beginPath()
ctx.moveTo(200, 100)
ctx.lineTo(300, 300)
ctx.lineTo(100, 300)
ctx.fill()