/*
    Copyright (C) 2020 David Sauer

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

    In case otherwise stated Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
Public License applies.

*/
let canvas1 = function(p) {

    var particles = [];
    var speed = 1;
    let noOfParticles = 1000;
    let colors = ["red", "green", "yellow", "blue", "pink"]
    let typeCoordinates = [{x: 50, y: 50}, {x: 150, y: 150}, {x: 250, y: 250}, {x: 300, y: 300}, {x: 350, y: 350}] 
    let noOfParticleTypes = 3;
    let dimx = 400;
    let dimy = 400;
    var editMode = false;
    var placedSources = 0;
    var alerted = false;

    var particleNumberSlider;
    var speedSlider;

    drawer = function(p, th){
        if (th.protein == true) {
            p.fill("black");
            polygon(th.x, th.y, 10, 7);
        } else {
            p.fill(th.col);
            p.circle(th.pos.x, th.pos.y, 4);
        }
    }
    
    // under CC BY-NC-SA 4.0 from https://p5js.org/examples/form-regular-polygon.html
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
        p.textSize(15);

        //in the following lines ui elements are set up
        var submissionButton = p.createButton('Einstellungen übernehmen');
        submissionButton.position(450, 210);
        submissionButton.mousePressed(submit);

        var restartButton = p.createButton('Neu starten');
        restartButton.position(450, 260);
        restartButton.mousePressed(restart);

        var modeButton = p.createButton('Platziere neue Quellen');
        modeButton.position(450, 160);
        modeButton.mousePressed(modeChange);

        particleNumberSlider = p.createSlider(100, 5000, 1000, 100);
        particleNumberSlider.position(450, 110);

        speedSlider = p.createSlider(0.1, 3, 1, 0.1);
        speedSlider.position(450, 60);

        for (let i = 0; i < noOfParticleTypes; i++) {
            var color = colors[i];
            for (let j = 0; j < Math.floor(noOfParticles/noOfParticleTypes); j++) {
                particles[Math.floor(i*noOfParticles/noOfParticleTypes)+j] = new Particle(typeCoordinates[i].x, typeCoordinates[i].y, color, dimx, dimy)
            }
        }
    }

    modeChange = function(){
        editMode = true;
    }

    submit = function(){
        noOfParticles = particleNumberSlider.value();
        speed = speedSlider.value();
        restart();
    }

    restart = function(){
        p.loop();
        alerted = false;
        if (placedSources != 0){
            noOfParticleTypes = placedSources;
            placedSources = 0;
        }
        editMode = false;
        while (particles.length > noOfParticles) { particles.pop(); }
        for (let i = 0; i < noOfParticleTypes; i++) {
            var color = colors[i];
            for (let j = 0; j < Math.floor(noOfParticles/noOfParticleTypes); j++) {
                particles[Math.floor(i*noOfParticles/noOfParticleTypes)+j] = new Particle(typeCoordinates[i].x, typeCoordinates[i].y, color, dimx, dimy)
            }
        }
    }

    p.mouseClicked = function(){
        if (editMode == true && alerted == false){
            if (p.mouseY > 0 && p.mouseY < dimy && p.mouseX > 0 && p.mouseX < dimx){
                typeCoordinates[placedSources] = {x:p.mouseX, y:p.mouseY};
                placedSources += 1;
                console.log("pl")
            }
        }
    }

    p.draw = function(){
        p.background(220);
        p.noStroke();
        if (editMode == false){
            for (let idx = 0; idx < particles.length; idx++) {
                const particle = particles[idx];
                particle.updateParticle(drawer, p, particles, speed);
            }
        } else {
            if (placedSources >= colors.length){
                if (alerted == false){
                    alert("Du kannst maximal fünf Teilchenquellen platzieren.");
                    alerted = true;
                }
            }
            for (let i = 0; i < typeCoordinates.length; i++) {
                if (i < placedSources){
                    const element = typeCoordinates[i];
                    p.fill("black");
                    p.rect(element.x, element.y, 10, 10);
                }
            }
        }
    }
}

let canvas2 = function(p) {
    var particles = [];
    let noOfParticles = 1000;
    var speed = 1;
    let colors = ["red", "green", "yellow", "blue", "pink"]
    let typeCoordinates = [{x: 50, y: 50}, {x: 150, y: 150}, {x: 250, y: 250}, {x: 300, y: 300}, {x: 350, y: 350}] 
    let noOfParticleTypes = 3;
    let dimx = 400;
    let dimy = 400;
    var editMode = false;
    var placedSources = 0;
    var alerted = false;

    var particleNumberSlider2;
    var speedSlider2;

    drawer = function(p, th){
        if (th.protein == true) {
            p.fill("black");
            polygon(th.pos.x, th.pos.y, 10, 7);
        } else {
            p.fill(th.col);
            p.circle(th.pos.x, th.pos.y, 4);
        }
    }

    // under CC BY-NC-SA 4.0 from https://p5js.org/examples/form-regular-polygon.html
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

        //in the following lines ui elements are set up
        var submissionButton2 = p.createButton('Einstellungen übernehmen');
        submissionButton2.position(450, 650);
        submissionButton2.mousePressed(submit2);

        var restartButton2 = p.createButton('Neu starten');
        restartButton2.position(450, 700);
        restartButton2.mousePressed(restart2);

        var modeButton2 = p.createButton('Platziere neue Quellen');
        modeButton2.position(450, 600);
        modeButton2.mousePressed(modeChange2);

        particleNumberSlider2 = p.createSlider(100, 5000, 1000, 100);
        particleNumberSlider2.position(450, 550);

        speedSlider2 = p.createSlider(0.1, 3, 1, 0.1);
        speedSlider2.position(450, 500);

        for (let i = 0; i < noOfParticleTypes; i++) {
            var color = colors[i];
            for (let j = 0; j < Math.floor(noOfParticles/noOfParticleTypes); j++) {
                particles[Math.floor(i*noOfParticles/noOfParticleTypes)+j] = new Particle(typeCoordinates[i].x, typeCoordinates[i].y, color, dimx, dimy)
            }
        }
        particles[particles.length] = new Particle(200, 200, "NA", dimx, dimy, true);
    }

    modeChange2 = function(){
        editMode = true;
    }

    submit2 = function(){
        noOfParticles = particleNumberSlider2.value();
        speed = speedSlider2.value();
        restart2();
    }

    restart2 = function(){
        p.loop();
        alerted = false;
        if (placedSources != 0){
            noOfParticleTypes = placedSources;
            placedSources = 0;
        }
        editMode = false;
        while (particles.length > noOfParticles) { particles.pop(); }
        for (let i = 0; i < noOfParticleTypes; i++) {
            var color = colors[i];
            for (let j = 0; j < Math.floor(noOfParticles/noOfParticleTypes); j++) {
                particles[Math.floor(i*noOfParticles/noOfParticleTypes)+j] = new Particle(typeCoordinates[i].x, typeCoordinates[i].y, color, dimx, dimy)
            }
        }
        if (particles[particles.length-1].protein == false){
            particles[particles.length] = new Particle(200, 200, "NA", dimx, dimy, true);
        }
    }

    p.mouseClicked = function(){
        if (editMode == true && alerted == false){
            if (p.mouseY > 0 && p.mouseY < dimy && p.mouseX > 0 && p.mouseX < dimx){
                typeCoordinates[placedSources] = {x:p.mouseX, y:p.mouseY};
                placedSources += 1;
            }
        }
    }

    p.draw = function(){
        p.background(220);
        p.noStroke();
        if (editMode == false){
            for (let idx = 0; idx < particles.length; idx++) {
                const particle = particles[idx];
                particle.updateParticle(drawer, p, particles, speed);
            }
        } else {
            if (placedSources >= colors.length){
                if (alerted == false){
                    alert("Du kannst maximal fünf Teilchenquellen platzieren.");
                    alerted = true;
                }
            }
            for (let i = 0; i < typeCoordinates.length; i++) {
                if (i < placedSources){
                    const element = typeCoordinates[i];
                    p.fill("black");
                    p.rect(element.x, element.y, 10, 10);
                }
            }

        }
        
    }
}

//now two example instances are created
new p5(canvas1, 'p5js-canvas1');
new p5(canvas2, 'p5js-canvas2');
