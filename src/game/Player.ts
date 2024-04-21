import { Keyboard } from "../utils/Keyboard";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/constants";
import { AbstractBall } from "./AbstractBall";

export class Player extends AbstractBall {

    constructor(sprite : string, velocity : number, radius : number) {
        super(sprite, velocity, radius);
    }

    protected override keepWithinBounds() {
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

    protected override move(deltaSeconds : number) {
        
        if(Keyboard.state.get("ArrowRight") || Keyboard.state.get("KeyD")) {
            this.speed.x = this.velocity;
        } else if(Keyboard.state.get("ArrowLeft") || Keyboard.state.get("KeyA")) {
            this.speed.x = -this.velocity;
        } else {
            this.speed.x = 0;
        }

        if(Keyboard.state.get("ArrowUp") || Keyboard.state.get("KeyW")) {
            this.speed.y = -this.velocity;
        } else if(Keyboard.state.get("ArrowDown") || Keyboard.state.get("KeyS")) {
            this.speed.y = this.velocity;
        } else {
            this.speed.y = 0;
        }

        this.x += this.speed.x * deltaSeconds;
        this.y += this.speed.y * deltaSeconds;
    }

    public override update(deltaSeconds: number) {

        this.move(deltaSeconds);
        this.keepWithinBounds();
    }
}