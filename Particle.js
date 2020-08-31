class Particle {
    constructor(x, y, col, dimx, dimy, interactions=[]) {
        this.pos = {x: x, y: y};
        this.vel = {x: 0, y: 0};
        this.col = col;
        this.interactions = interactions;
        this.dim = {x: dimx, y: dimy};
    }

    applyForce(force) {
        this.vel.x += force.x;
        this.vel.y += force.y;
    }

    updatePosition() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        if (this.pos.x > this.dim.x){
            this.pos.x = this.pos.x%this.dim.x
        } else if (this.pos.x < 0) {
            this.pos.x = this.dim.x+this.pos.x
        }

        if (this.pos.y > this.dim.y){
            this.pos.y = this.pos.y%this.dim.y
        } else if (this.pos.y < 0) {
            this.pos.y = this.dim.y+this.pos.y
        }
    }

    diffuse(scale=1) {
        let diffusor = {x: this.randomDiffusionValue(scale), y: this.randomDiffusionValue(scale)}
        this.applyForce(diffusor);
        return diffusor
    }

    updateParticle(particles, draw=true) {
        let localScale = 1;
        let diffusor = this.diffuse(localScale)
        this.updatePosition();
        if (draw == true) {
            this.drawParticle()
        }
        this.applyForce({x: -diffusor.x, y: -diffusor.y})
    }

    drawParticle() {
        fill(this.col);
        circle(this.pos.x, this.pos.y, 4);
    }

    randomDiffusionValue(scale=1) {
        return (Math.round(Math.random()) * 2 - 1) * Math.random() * scale;
    }
}