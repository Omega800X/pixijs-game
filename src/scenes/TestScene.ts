import { Container } from "pixi.js";
import { IUpdateable } from "../utils/interfaces/IUpdateable";
import { Death } from "../game/Death";
import { GAME_HEIGHT, GAME_WIDTH } from "../utils/constants";

export class TestScene extends Container implements IUpdateable {
    
    private death : Death = new Death();

    constructor() {
        super();

        this.death.position.set(GAME_WIDTH + this.death.width, GAME_HEIGHT/2);

        this.addChild(this.death);

    }
    
    
    update(deltaTime: number, _deltaFrame?: number | undefined): void {

        this.death.update(deltaTime/1000);
    }

}