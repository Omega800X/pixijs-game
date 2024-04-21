import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../utils/constants";
import { AbstractPowerUp } from "./AbstractPowerUp";
import { Enemy } from "./Enemy";
import { Player } from "./Player";

export class FreezePowerUp extends AbstractPowerUp {

    private enemies : Enemy[];
    private player : Player;


    constructor(player : Player, enemies : Enemy[]) {
        super("Freeze", 0, 28);
        this.player = player;
        this.enemies = enemies;
        this.position.set(Math.floor(Math.random() * SCREEN_WIDTH), Math.floor(Math.random() * SCREEN_HEIGHT));
        this.keepWithinBounds();
    }

    protected override powerUpEffect(): void {
        this.enemies.forEach(enemy => {
            enemy.slow();
        });
        this.parent.removeChild(this);
    }
    protected override keepWithinBounds(): void {
        if(this.x > SCREEN_WIDTH - this.radius) {
            this.x = SCREEN_WIDTH - this.radius;
        } else if(this.x < 0 + this.radius) {
            this.x = 0 + this.radius;
        }

        if(this.y > SCREEN_HEIGHT - this.radius) {
            this.y = SCREEN_HEIGHT - this.radius;
        } else if(this.y < 0 + this.radius) {
            this.y = 0 + this.radius;
        }
    }
    
    override update(): void {
        if(this.isColliding(this.player)) {
            this.powerUpEffect();
        }
    }

    protected override move(): void {}

}