import { Container, Graphics, Sprite } from "pixi.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/constants";
import { getRandomIntInclusive } from "../utils/random_number";
import { Player } from "./Player";

export class Enemy extends Container {

    private sprite: Sprite;
    private hitbox: Graphics;
    private speedX: number = getRandomIntInclusive(200, 400);
    private speedY: number = getRandomIntInclusive(200, 400);

    constructor(sprite: string, scale: number) {
        super();

        this.sprite = Sprite.from(sprite);
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(scale);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x000000);
        this.hitbox.drawCircle(0, 0, 38);
        this.hitbox.endFill();
        this.hitbox.scale.set(scale);
        this.hitbox.visible = false;

        this.addChild(this.sprite);
        this.addChild(this.hitbox);
    }

    private keepInBounds(): void {
        if (this.x > SCREEN_WIDTH - this.getRadius()) {
            this.x = SCREEN_WIDTH - this.getRadius();
            this.speedX = this.speedX * -1;
        } else if (this.x < 0 + this.getRadius()) {
            this.x = 0 + this.getRadius();
            this.speedX = Math.abs(this.speedX);
        }

        if (this.y > SCREEN_HEIGHT - this.getRadius()) {
            this.y = SCREEN_HEIGHT - this.getRadius();
            this.speedY = this.speedY * -1;
        } else if (this.y < 0 + this.getRadius()) {
            this.y = 0 + this.getRadius();
            this.speedY = Math.abs(this.speedY);
        }
    }

    private move(deltaSeconds: number): void {
        this.x += this.speedX * deltaSeconds;
        this.y += this.speedY * deltaSeconds;
    }


    public isColliding(player: Player) {
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        const sumOfRadii = this.getRadius() + player.getRadius();

        return distance < sumOfRadii;
    }

    public getRadius(): number {
        return this.hitbox.width / 2;
    }

    public update(deltaSeconds: number): void {
        this.move(deltaSeconds);
        this.keepInBounds();
    }
}