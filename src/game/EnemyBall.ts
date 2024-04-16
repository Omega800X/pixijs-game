import { Graphics, Point } from "pixi.js";
import { AbstractMob } from "./AbstractMob";
import { GAME_HEIGHT, GAME_WIDTH } from "../utils/constants";

export class EnemyBall extends AbstractMob {

    private static readonly BORDER_COLOR : number = 0x020202;
    private static readonly COLOR : string = "0xdf2935";
    private static readonly MOVE_SPEED : number = 300;
    private static readonly SIZE : number = 20;
    private speed : Point;

    constructor() {
        super();

        const randomIncrementX = Math.floor(100 * Math.random());
        const randomIncrementY = Math.floor(100 * Math.random());


        this.speed = new Point(EnemyBall.MOVE_SPEED + randomIncrementX, EnemyBall.MOVE_SPEED + randomIncrementY);

        const pen = new Graphics();
        pen.lineStyle(5, EnemyBall.BORDER_COLOR, 1, 1);
        pen.beginFill(EnemyBall.COLOR);
        pen.drawCircle(0, 0, EnemyBall.SIZE);
        pen.endFill();

        this.addChild(pen);
    }

    override getRadius(): number {
        return EnemyBall.SIZE;
    }

    private keepWithinBounds(): void {
        if(this.x > GAME_WIDTH - EnemyBall.SIZE) {
            this.x = GAME_WIDTH - EnemyBall.SIZE;
            this.speed.x = Math.abs(this.speed.x) * -1;
        } else if (this.x < 0 + EnemyBall.SIZE) {
            this.x = 0 + EnemyBall.SIZE;
            this.speed.x = Math.abs(this.speed.x);
        }

        if(this.y > GAME_HEIGHT - EnemyBall.SIZE) {
            this.y = GAME_HEIGHT - EnemyBall.SIZE;
            this.speed.y = Math.abs(this.speed.y) * -1;
        } else if (this.y < 0 + EnemyBall.SIZE) {
            this.y = 0 + EnemyBall.SIZE;
            this.speed.y = Math.abs(this.speed.y);
        }
    }

    override move(deltaSeconds: number): void {
        this.x += this.speed.x * deltaSeconds;
        this.y += this.speed.y * deltaSeconds;
        this.keepWithinBounds();
    }

}