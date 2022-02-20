
import P5 from 'p5-svelte';
import type World from '../world/world';
import type GDObject from '../objects/object'


interface Vector {
    x: number,
    y: number,
}

const CAMERA_SPEED = 10;

const drawObject = (p5: any, obj: Object) => {

}


const worldSketch = (
    world: World,
) => (p5: any) => {



    let zoom = 1;
    let cameraPos = {x: 0, y: 0};
    let cameraMove = {x: 0, y: 0};

    let p5div, cnv;

    p5.preload = () => {
        const PUSAB_FONT = p5.loadFont('assets/fonts/pusab.otf');
    }

    p5.setup = () => {
        cnv = p5.createCanvas(400, 400);
        p5.frameRate(240)
        p5div = document.getElementById("sketch")
        console.log(p5div)
    };

    p5.keyPressed = () => {
        if (!(p5.mouseX < 0 || p5.mouseX > p5.width || p5.mouseY < 0 || p5.mouseY > p5.height))
            switch (p5.keyCode) {
                case 37:
                    cameraMove.x += CAMERA_SPEED;
                    break;
                
                case 38:
                    cameraMove.y -= CAMERA_SPEED;
                    break;
                    
                case 39:
                    cameraMove.x -= CAMERA_SPEED;
                    break;
                
                case 40:
                    cameraMove.y += CAMERA_SPEED;
                    break;
            }
    }
    p5.keyReleased = () => {
        switch (p5.keyCode) {
            case 37:
                cameraMove.x = 0;
                break;
            
            case 38:
                cameraMove.y = 0;
                break;
                
            case 39:
                cameraMove.x = 0;
                break;
            
            case 40:
                cameraMove.y = 0;
                break;
        }
    }

    let dragging = false;
    let prevCameraPos = {x: 0, y: 0};
    let prevMousePos = {x: 0, y: 0};
    p5.mousePressed = () => {
        dragging = true;
        [prevCameraPos.x, prevCameraPos.y] = [cameraPos.x, cameraPos.y];
        prevMousePos.x = p5.mouseX;
        prevMousePos.y = p5.mouseY;
    }
    p5.mouseReleased = () => {
        dragging = false;
    }

    p5.draw = () => {

        cnv.position(
            p5div.offsetLeft,
            p5div.offsetTop,
        )
        p5.resizeCanvas(
            p5div.offsetWidth,
            p5div.offsetHeight,
        )


        // stop dragging when mouse leaves the canvas
        if (p5.mouseX < 0 || p5.mouseX > p5.width || p5.mouseY < 0 || p5.mouseY > p5.height) dragging = false;
        //else if (p5.mouseIsPressed) dragging = true;
        
        cameraPos.x += cameraMove.x
        cameraPos.y += cameraMove.y
        if (dragging) {
            cameraPos.x = prevCameraPos.x + (p5.mouseX - prevMousePos.x);
            cameraPos.y = prevCameraPos.y - (p5.mouseY - prevMousePos.y);
        }

        
        p5.push()

        p5.background(94, 129, 235)
        p5.translate(p5.width/2, p5.height/2)
        
        p5.translate(cameraPos.x, -cameraPos.y)
        p5.scale(2)

        p5.textSize(15)
        p5.noStroke()
        p5.fill(0)
        p5.text(world.objects.length + " objects", 20, 50)

        for (let i = 0; i < world.objects.length; i++) {
            world.objects[i].drawFull(p5)
        }

        p5.stroke(0)
        p5.strokeWeight(1)
        p5.line(0,0,100*30,0)
        p5.line(0,0,0,-100*30)

        p5.pop()

        p5.noFill()
        p5.stroke(20, 20, 26)
        p5.strokeWeight(12)
        p5.rect(-6, -6, p5.width+12, p5.height+12, 18)
        p5.stroke(17, 17, 22)
        p5.rect(-38, -38, p5.width+44, p5.height+44, 18)

    };



};

export default worldSketch




