class Particle {
    constructor(x, y, col, dimx, dimy, protein=false, interactions=[]) {
        this.pos = {x: x, y: y};
        this.vel = {x: 0, y: 0};
        this.col = col;
        this.interactions = interactions;
        this.dim = {x: dimx, y: dimy};
        this.protein = protein;
        this.low_diff = 1;
        if (protein == true){
            this.low_diff = 5;
        }
        
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
    
    updateDiff(){
        if (this.low_diff > 1) {
            this.low_diff -= 0.2;
        } else if (this.low_diff < 1) {
            this.low_diff = 1;
        }
    }

    distanceTo(x,y){
        let distX = Math.abs(this.pos.x-x);
        let distY = Math.abs(this.pos.y-y);
        return Math.sqrt(distX*distX+distY*distY);
    }

    updateParticle(func, arg, particles, speed=1, draw=true) {
        if (this.protein == true) {
            for (let idx = 0; idx < particles.length; idx++) {
                var element = particles[idx];
                if (this.distanceTo(element.pos.x, element.pos.y) < 20){
                    if (element.protein == false){
                        particles[idx].set_low_diff(21-this.distanceTo(element.pos.x, element.pos.y));
                    }
                }
            }
        } 
        var localScale = 1/this.low_diff;
        if (localScale < 0.15){
            localScale = 0.15
        }
        this.updateDiff();
        let diffusor = this.diffuse(localScale*speed);
        this.updatePosition();
        if (draw == true) {
            this.drawParticle(func, arg);
        }
        this.applyForce({x: -diffusor.x, y: -diffusor.y});
    }

    set_low_diff(x) {
        this.low_diff = x;
    }

    drawParticle(func, arg) {
        func(arg, this)
    }

    randomDiffusionValue(scale=1) {
        return (Math.round(Math.random()) * 2 - 1) * Math.random() * scale;
    }
}