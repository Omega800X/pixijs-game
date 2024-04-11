import { Container, Sprite } from "pixi.js";

export class GameScene extends Container {
    constructor() {
        super();

        const ball : Sprite = Sprite.from("Ball");
        ball.anchor.set(0.5);

        ball.position.set(960, 540);
        this.addChild(ball);
    }
}