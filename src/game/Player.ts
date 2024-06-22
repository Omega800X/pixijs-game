import { Container, Graphics, Sprite } from "pixi.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/constants";
import { Keyboard } from "../utils/Keyboard";

export class Player extends Container {
    private sprite: Sprite;
    private moveSpeed: number;
    private hitbox: Graphics;

    constructor(sprite: string, moveSpeed: number, scale: number) {
        super();

        this.sprite = Sprite.from(sprite);
        this.sprite.anchor.set(0.5);
        this.moveSpeed = moveSpeed;
        this.sprite.scale.set(scale);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x000000);
        this.hitbox.drawCircle(0, 0, 40);
        this.hitbox.endFill();
        this.hitbox.scale.set(scale);
        this.hitbox.alpha = 0;

        this.addChild(this.sprite);
        this.addChild(this.hitbox);
    }

    private keepInBounds(): void {
        if (this.x > SCREEN_WIDTH - this.getRadius()) {
            this.x = SCREEN_WIDTH - this.getRadius();
        } else if (this.x < 0 + this.getRadius()) {
            this.x = 0 + this.getRadius();
        }

        if (this.y > SCREEN_HEIGHT - this.getRadius()) {
            this.y = SCREEN_HEIGHT - this.getRadius();
        } else if (this.y < 0 + this.getRadius()) {
            this.y = 0 + this.getRadius();
        }
    }

    private move(deltaSeconds: number): void {
        if (Keyboard.state.get("ArrowRight") || Keyboard.state.get("KeyD")) {
            this.x += this.moveSpeed * deltaSeconds;
        } else if (Keyboard.state.get("ArrowLeft") || Keyboard.state.get("KeyA")) {
            this.x -= this.moveSpeed * deltaSeconds;
        } /* else {
            this.speed.x = 0;
        } */

        if (Keyboard.state.get("ArrowUp") || Keyboard.state.get("KeyW")) {
            this.y -= this.moveSpeed * deltaSeconds;
        } else if (Keyboard.state.get("ArrowDown") || Keyboard.state.get("KeyS")) {
            this.y += this.moveSpeed * deltaSeconds;
        } /* else {
            this.speed.y = 0;
        } */
    }

    private getRadius(): number {
        return this.hitbox.scale.x * 40;
    }

    public update(deltaSeconds: number): void {
        this.move(deltaSeconds);
        this.keepInBounds();
    }
}