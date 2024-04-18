import { Container } from "pixi.js";

export abstract class AbstractScene extends Container {
    
    public abstract update(deltaFrame : number, deltaTime? : number) : void;
}