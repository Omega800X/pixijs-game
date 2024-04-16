import { Container, Graphics, Sprite } from "pixi.js";

export class Death extends Container {

    private static readonly BORDER_COLOR : number = 0x020202;
    private static readonly COLOR : string = "0x020202";
    private static readonly SIZE : number = 530;


    constructor() {
        
        super();

        const pen = new Graphics();
        pen.lineStyle(5, Death.BORDER_COLOR, 1, 1);
        pen.beginFill(Death.COLOR);
        pen.drawCircle(0, 0, Death.SIZE);
        pen.endFill();

        const skull = Sprite.from("Skull");
        skull.anchor.set(0.5);
        skull.position.set(-50, 0);

        this.scale.set(0);

        this.addChild(pen);
        this.addChild(skull);
    }

    update(deltaSeconds : number) : void {
        if(this.scale.x < 2.2) {
            this.scale.x += 1 * deltaSeconds;
        }
        if(this.scale.y < 2.2) {
            this.scale.y += 1 * deltaSeconds;
        }
        
    }
}