class ParticleSimulation {
  constructor(xr=[], yr=[], resolution=10) {
    // console.log(xr)
    // console.log(yr)
    // if (xr.length && !yr.length) {
    //   yr = [xr[0]*windowHeight/windowWidth, xr[1]*windowHeight/windowWidth]
    // } else if (!xr.length && yr.length) {
    //   xr = [yr[0]*windowWidth/windowHeight, yr[1]*windowWidth/windowHeight]
    // } else if (!xr.length && !yr.length) {
    //   xr = [-10, 10]
    //   yr = [-10, 10]
    // }
    // console.log(xr)
    // console.log(yr)

    const xrange = abs(xr[1]-xr[0])
    const yrange = abs(yr[1]-yr[0])
    this.p_size = Math.min(40, windowHeight/(2*resolution+1))
    this.p_ydist = 2*this.p_size*(resolution-1)/yrange
    this.p_xdist = this.p_ydist
    // this.p_xdist = 2*(windowWidth/(2*resolution+1))*(resolution-1)/xrange
    this.particles = new Array(resolution).fill(0).map((_, i) => new Array(resolution).fill(0).map((_, j) => [xrange*i/(resolution-1)+xr[0], yrange*j/(resolution-1)+yr[0]]))
    console.log(this.particles)
  }

  run(speed, diff_eq) {
    textSize(32)
    fill(255)
    text(`dy`, 140, 82)
    text(`__`, 140, 90)
    text(`dx`, 140, 122)
    // text(` = ${diff_eq.toString().split('=> ').pop()}`, 177, 100)

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = 0; j < this.particles[0].length; j++) {
        const slope = diff_eq(this.particles[i][j][0], this.particles[i][j][1])
        if (!Number.isNaN(slope)) {
          this.particles[i][j][0] += 0.01 * speed * cos(atan(slope))
          this.particles[i][j][1] += 0.01 * speed * sin(atan(slope))

          const x = this.particles[i][j][0]*this.p_xdist+windowWidth/2
          const y = windowHeight/2-this.p_ydist*this.particles[i][j][1]
          if (x < 0 && x > windowWidth && y < 0 && x > windowHeight)
            this.particles[i].splice(1, j)

          ellipse(x, y, this.p_size)
        }
      }
    }
  }
}