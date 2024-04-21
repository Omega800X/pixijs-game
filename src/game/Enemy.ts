import { Point } from "pixi.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/constants";
import { AbstractBall } from "./AbstractBall";
import { Tween } from "tweedle.js";

export class Enemy extends AbstractBall {
    

    constructor(sprite : string, velocity : number, radius : number) {
        super(sprite, velocity, radius);
        this.speed.x = this.velocity + Math.floor(100 * Math.random());
        this.speed.y = this.velocity + Math.floor(100 * Math.random());
        this.setRandomSpawnLoc();
    }

    private setRandomSpawnLoc() : void {
        const spawn = Math.floor(Math.random() * 4);

        switch(spawn) {
            case 0: {
                const positionX = SCREEN_WIDTH - this.radius;
                const positionY = SCREEN_HEIGHT * Math.random();

                this.position.set(positionX, positionY);
                break;
            }
            case 1: {
                const positionX = SCREEN_WIDTH * Math.random();
                const positionY = SCREEN_HEIGHT - this.radius;

                this.position.set(positionX, positionY);
                break;
            }
            case 2: {
                const positionX = 0 + this.radius;
                const positionY = SCREEN_HEIGHT * Math.random();

                this.position.set(positionX, positionY);
                break;
            }
            case 3: {
                const positionX = SCREEN_WIDTH * Math.random();
                const positionY = 0 + this.radius;

                this.position.set(positionX, positionY);
                break;
            }
        }
    }

    protected override keepWithinBounds(): void {
        if(this.x > SCREEN_WIDTH - this.radius) {
            this.x = SCREEN_WIDTH - this.radius;
            this.speed.x = Math.abs(this.speed.x) * -1;
        } else if (this.x < 0 + this.radius) {
            this.x = 0 + this.radius;
            this.speed.x = Math.abs(this.speed.x);
        }

        if(this.y > SCREEN_HEIGHT - this.radius) {
            this.y = SCREEN_HEIGHT - this.radius;
            this.speed.y = Math.abs(this.speed.y) * -1;
        } else if (this.y < 0 + this.radius) {
            this.y = 0 + this.radius;
            this.speed.y = Math.abs(this.speed.y);
        }
    }

    protected override move(deltaSeconds: number): void {
        this.x += this.speed.x * deltaSeconds;
        this.y += this.speed.y * deltaSeconds;
    }

    public slow() {
        const currentSpeed = this.speed;
        this.speed = new Point(currentSpeed.x/2, currentSpeed.y/2);
        new Tween(this.speed).to({x: currentSpeed.x, y: currentSpeed.y}, 3000).start();
    }

    override update(deltaSeconds: number): void {
        this.move(deltaSeconds);
        this.keepWithinBounds();
    }
}