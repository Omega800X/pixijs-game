import { Container, Point, Sprite } from "pixi.js";

export abstract class AbstractBall extends Container {

    protected sprite : Sprite;
    protected readonly radius : number;
    protected speed : Point = new Point();
    protected velocity : number;
    
    

    constructor(sprite : string, velocity : number, radius : number) {
        super();

        this.sprite = Sprite.from(sprite);
        this.velocity = velocity;
        this.radius = radius;

        this.sprite.anchor.set(0.5);
        this.addChild(this.sprite);
    }

    public isColliding(Ball : AbstractBall) : boolean {
        
        const dx = Ball.x - this.x;
        const dy = Ball.y - this.y;
        const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        const sumOfRadii = this.radius + Ball.radius;
        
        return distance < sumOfRadii;
    }

    protected abstract keepWithinBounds() : void;

    protected abstract move(deltaSeconds : number) : void;

    abstract update(deltaSeconds : number) : void;
}