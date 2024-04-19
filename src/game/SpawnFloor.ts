import { Container, Sprite } from "pixi.js";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../utils/constants";

export class SpawnFloor extends Container {

    constructor() {
        super();

        const topBorder = Sprite.from("SpawnFloor");
        topBorder.width = SCREEN_WIDTH;
        const bottomBorder = Sprite.from("SpawnFloor");
        bottomBorder.width = SCREEN_WIDTH;
        bottomBorder.y = SCREEN_HEIGHT - bottomBorder.height;
        const leftBorder = Sprite.from("SpawnFloor");
        leftBorder.height = SCREEN_HEIGHT;
        const rightBorder = Sprite.from("SpawnFloor");
        rightBorder.height = SCREEN_HEIGHT;
        rightBorder.x = SCREEN_WIDTH - rightBorder.width;

        this.addChild(topBorder);
        this.addChild(bottomBorder);
        this.addChild(leftBorder);
        this.addChild(rightBorder);
    }
}