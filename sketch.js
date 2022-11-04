let particles

function setup() {
  createCanvas(windowWidth, windowHeight)
  // createCanvas(3000, 3000)

  particles = new ParticleSimulation(xr=[-10, 10], yr=[-10, 10], resolution=50)
}

function draw() {
  background(0)

  // particles.run(10, (x, y) => -x/y)

  particles.run(10, (x, y) => -y/(abs(x)+10))

  // particles.run(10, (x, y) => sin(2*x)/(2*sin(x)*cos(y)))

  stroke(255)
  line(0, windowHeight/2, windowWidth, windowHeight/2)
  line(windowWidth/2, 0, windowWidth/2, windowHeight)
  noStroke()
}