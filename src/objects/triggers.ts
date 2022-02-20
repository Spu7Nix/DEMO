import GDObject from "./object";
import type World from "../world/world";


class Trigger extends GDObject {
    touchTriggered: boolean = false;
    spawnTriggered: boolean = false;
    multiTrigger: boolean = false;
    trigger(world: World) {}
}


class ToggleTrigger extends Trigger {
    target: number = 0;
    activate: boolean = false;
    draw(p5: any) {

        p5.strokeWeight(2)
        if (!this.activate) {
            p5.stroke(120, 10, 10)
            p5.fill(255, 30, 30)
        } else {
            p5.stroke(10, 120, 10)
            p5.fill(30, 255, 30)
        }
        p5.rect(-13, -3, 26, 16, 3, 3, 3, 3)

        p5.textAlign(p5.CENTER)

        p5.textSize(9)
        p5.stroke(30)
        p5.strokeWeight(1.5)
        p5.fill(255)
        p5.text("Toggle", 0, -7)

        p5.textSize(11)
        p5.strokeWeight(2)
        p5.text(this.target, 0, 9)

    }
    trigger(world: World) {
        world.toggleGroupID(this.target, this.activate)
    }
}

class SpawnTrigger extends Trigger {
    target: number = 0;                 // nope
    delay: number = 0;
    draw(p5: any) {

        p5.strokeWeight(2)
        p5.stroke(42/1.3, 120/1.3, 82/1.3)
        p5.fill(62, 173, 119)
        p5.rect(-13, -3, 26, 16, 3, 3, 3, 3)

        p5.textAlign(p5.CENTER)

        p5.textSize(9)
        p5.stroke(30)
        p5.strokeWeight(1.5)
        p5.fill(255)
        p5.text("Spawn", 0, -7)

        p5.textSize(11)
        p5.strokeWeight(2)
        p5.text(this.target, 0, 9)

    }

    spawn(world: World) {
        world.spawnGroupID(this.target)
    }

    trigger(world: World) {
        if (this.delay > 0) {
            setTimeout(() => {
                this.spawn(world)
            }, this.delay / 1000)
        } else {
            this.spawn(world)
        }
    }
}

class PickupTrigger extends Trigger {
    itemID: number = 0;
    amount: number = 0;
    draw(p5: any) {


        p5.strokeWeight(2)
        p5.stroke(176/1.2, 107/1.2, 18/1.2)
        p5.fill(247, 151, 25)
        p5.rect(-13, -3, 26, 16, 3, 3, 3, 3)

        p5.textAlign(p5.CENTER)

        p5.textSize(9)
        p5.stroke(30)
        p5.strokeWeight(1.5)
        p5.fill(255)
        p5.text("Pickup", 0, -7)

        p5.textSize(10)
        p5.strokeWeight(2)
        p5.text(this.itemID + "i", 0, 4)
        p5.text(`${this.amount >= 0 ? "+" : ""}${this.amount}`, 0, 13)

    }
}

enum Cmp { EQUAL, GREATER, LESSER }
class InstantCountTrigger extends Trigger {
    itemID: number = 0;
    amount: number = 0;
    cmpType: Cmp = Cmp.LESSER;

    target: number = 0;
    activate: boolean = false;

    draw(p5: any) {

        let cmp: string = this.cmpType == Cmp.EQUAL ? "=" : this.cmpType == Cmp.LESSER ? "<" : ">";



        p5.strokeWeight(2)
        p5.stroke(135, 74, 74)
        p5.fill(245, 137, 137)
        p5.rect(-13, -3, 26, 16, 3, 3, 3, 3)

        p5.textAlign(p5.CENTER)

        p5.textSize(9)
        p5.stroke(30)
        p5.strokeWeight(1.5)
        p5.fill(255)
        p5.text("IC", 0, -7)

        p5.textSize(10)
        p5.strokeWeight(2)
        p5.text(this.itemID + "i", 0, 4)
        p5.text(`${cmp}${this.amount}`, 0, 13)

    }
}



export {
    Trigger,
    ToggleTrigger,
    SpawnTrigger,
    PickupTrigger,
    InstantCountTrigger,
    Cmp
};
