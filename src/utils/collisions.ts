import { AbstractMob } from "../game/AbstractMob";

export function are_colliding(objA : AbstractMob, objB : AbstractMob) : boolean {
    
    const dx = objB.x - objA.x;
    const dy = objB.y - objA.y;
    const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    const sumOfRadii = objA.getRadius() + objB.getRadius();

    return distance < sumOfRadii;
}