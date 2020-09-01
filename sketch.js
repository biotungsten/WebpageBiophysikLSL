let canvas1 = function(p) {
    var particles = [];
    let noOfParticles = 1000;
    let colors = ["red", "green", "yellow", "blue", "pink"]
    let typeCoordinates = [{x: 50, y: 50}, {x: 150, y: 150}, {x: 250, y: 250}, {x: 300, y: 300}, {x: 350, y: 350}] 
    let noOfParticleTypes = 3;
    let dimx = 400;
    let dimy = 400;

    drawer = function(p, th){
        if (th.protein == true) {
            p.fill("black");
            polygon(th.x, th.y, 10, 7);
        } else {
            p.fill(th.col);
            p.circle(th.pos.x, th.pos.y, 4);
        }
    }

    polygon = function(x, y, radius, npoints) {
        let angle = 6.28 / npoints;
        p.beginShape();
        for (let a = 0; a < 6.28; a += angle) {
          let sx = x + Math.cos(a) * radius;
          let sy = y + Math.sin(a) * radius;
          p.vertex(sx, sy);
        }
        p.endShape(p.CLOSE);
      }
      

    p.setup = function(){
        var cnv = p.createCanvas(dimx, dimy);

        for (let i = 0; i < noOfParticleTypes; i++) {
            var color = colors[i];
            for (let j = 0; j < Math.floor(noOfParticles/noOfParticleTypes); j++) {
                particles[Math.floor(i*noOfParticles/noOfParticleTypes)+j] = new Particle(typeCoordinates[i].x, typeCoordinates[i].y, color, dimx, dimy)
            }
            
        }
    }

    p.draw = function(){
        p.background(220);
        p.noStroke();
        for (let idx = 0; idx < particles.length; idx++) {
            const particle = particles[idx];
            particle.updateParticle(drawer, p, particles);
        }
    }
}

let canvas2 = function(p) {
    var particles = [];
    let noOfParticles = 1000;
    let colors = ["red", "green", "yellow", "blue", "pink"]
    let typeCoordinates = [{x: 50, y: 50}, {x: 150, y: 150}, {x: 250, y: 250}, {x: 300, y: 300}, {x: 350, y: 350}] 
    let noOfParticleTypes = 3;
    let dimx = 400;
    let dimy = 400;

    drawer = function(p, th){
        if (th.protein == true) {
            p.fill("black");
            polygon(th.pos.x, th.pos.y, 10, 7);
        } else {
            p.fill(th.col);
            p.circle(th.pos.x, th.pos.y, 4);
        }
    }

    polygon = function(x, y, radius, npoints) {
        let angle = 6.28 / npoints;
        p.beginShape();
        for (let a = 0; a < 6.28; a += angle) {
          let sx = x + Math.cos(a) * radius;
          let sy = y + Math.sin(a) * radius;
          p.vertex(sx, sy);
        }
        p.endShape(p.CLOSE);
      }
      

    p.setup = function(){
        var cnv = p.createCanvas(dimx, dimy);

        for (let i = 0; i < noOfParticleTypes; i++) {
            var color = colors[i];
            for (let j = 0; j < Math.floor(noOfParticles/noOfParticleTypes); j++) {
                particles[Math.floor(i*noOfParticles/noOfParticleTypes)+j] = new Particle(typeCoordinates[i].x, typeCoordinates[i].y, color, dimx, dimy)
            }
            
        }
        particles[particles.length] = new Particle(200, 200, "NA", dimx, dimy, true);
    }

    p.draw = function(){
        p.background(220);
        p.noStroke();
        for (let idx = 0; idx < particles.length; idx++) {
            const particle = particles[idx];
            particle.updateParticle(drawer, p, particles);
        }
    }
}

//now two example instances are created
new p5(canvas1, 'p5js-canvas1');
new p5(canvas2, 'p5js-canvas2');