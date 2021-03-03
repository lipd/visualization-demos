/**
 * 1. 创建 WebGL Program
 */

const canvas = document.querySelector('canvas')
const gl = canvas.getContext('webgl')

const vertex = `
  attribute vec2 position;

  void main() {
    gl_PointSize = 1.0;
    gl_Position = vec4(position, 1.0, 1.0);
  }
`


const fragment = `
  precision mediump float;

  void main()
  {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`

const vertextShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertextShader, vertex)
gl.compileShader(vertextShader)

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, fragment)
gl.compileShader(fragmentShader)

const program = gl.createProgram()
gl.attachShader(program, vertextShader)
gl.attachShader(program, fragmentShader)
gl.linkProgram(program)

gl.useProgram(program)

/**
 * 2. 将数据存入缓冲区
 */


// 表示三角形顶点
const points = new Float32Array([
  -1, -1,
  0, 1,
  1, -1,
])

// 创建一个缓存对象
const bufferId = gl.createBuffer()
// 将它绑定为当前对象
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId)
// 将数据写入缓存
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)

/**
 * 3. 将缓冲区数据读入 GPU
 */

// 获取顶点着色器中的 position 变量的地址
const vPosition = gl.getAttribLocation(program, 'position')
// 给变量设置长度和类型
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0)
// 激活这个变量
gl.enableVertexAttribArray(vPosition)

/**
 * 4. 执行着色器完成绘制
 */


// 清除当前画布内容
gl.clear(gl.COLOR_BUFFER_BIT)
// 用顶点画出三角形
gl.drawArrays(gl.TRIANGLES, 0, points.length / 2)