import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/constants";
import { AbstractPowerUp } from "./AbstractPowerUp";
import { Enemy } from "./Enemy";

export class MinusOnePowerUp extends AbstractPowerUp {

    private enemies: Enemy[];

    constructor(enemies: Enemy[]) {
        super("MinusOne", 0, 28);
        this.sprite.scale.set(0.5);
        this.enemies = enemies;
        this.position.set(Math.floor(Math.random() * SCREEN_WIDTH), Math.floor(Math.random() * SCREEN_HEIGHT));
        this.keepWithinBounds();
    }

    public override powerUpEffect(): void {
        const removedEnemy = this.enemies.pop();
        removedEnemy?.destroy();
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
    protected override move(): void { }
    override update(): void { }

}