import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../utils/constants";
import { AbstractPowerUp } from "./AbstractPowerUp";
import { Enemy } from "./Enemy";

export class FreezePowerUp extends AbstractPowerUp {

    private enemies: Enemy[];


    constructor(enemies: Enemy[]) {
        super("Freeze", 0, 28);
        this.sprite.scale.set(0.5);
        this.enemies = enemies;
        this.position.set(Math.floor(Math.random() * SCREEN_WIDTH), Math.floor(Math.random() * SCREEN_HEIGHT));
        this.keepWithinBounds();
    }

    public override powerUpEffect(): void {
        this.enemies.forEach(enemy => {
            enemy.slow();
        });
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

    override update(): void { }
    protected override move(): void { }

}