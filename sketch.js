let canvas1 = function(p) {
    p.setup = function(){
        var cnv = p.createCanvas(400, 400);
    }

    p.draw = function(){
        p.background(100);
    }
}

let canvas2 = function(p) {
    p.setup = function(){
        var cnv = p.createCanvas(400, 400);
    }

    p.draw = function(){
        p.background(100);
    }
}

//now two example instances are created
new p5(canvas1, 'p5js-canvas1');
new p5(canvas2, 'p5js-canvas2');