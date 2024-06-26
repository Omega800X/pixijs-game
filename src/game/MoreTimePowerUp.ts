import { Timer } from "../ui/Timer";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/constants";
import { AbstractPowerUp } from "./AbstractPowerUp";

export class MoreTimePowerUp extends AbstractPowerUp {
    private gameTimer: Timer;

    constructor(timer: Timer) {
        super("MoreTime", 0, 28);
        this.sprite.scale.set(0.5);
        this.position.set(Math.floor(Math.random() * SCREEN_WIDTH), Math.floor(Math.random() * SCREEN_HEIGHT));
        this.gameTimer = timer;
        this.keepWithinBounds();
    }

    public override powerUpEffect(): void {
        this.gameTimer.incrementCounter(15);
    }
    protected override keepWithinBounds(): void {
        if (this.x > SCREEN_WIDTH - this.radius) {
            this.x = SCREEN_WIDTH - this.radius;
        } else if (this.x < 0 + this.radius) {
            this.x = 0 + this.radius;
        }

        if (this.y > SCREEN_HEIGHT - this.radius) {
            this.y = SCREEN_HEIGHT - this.radius;
        } else if (this.y < 0 + this.radius) {
            this.y = 0 + this.radius;
        }
    }

    override update(_deltaSeconds: number): void { }

    protected override move(): void {
    }

}