import { Container } from "pixi.js";

export abstract class AbstractMob extends Container {

    constructor() {
        super();
    }

    abstract getRadius() : number;
    abstract move(deltaSeconds : number) : void;
    
}