import { Graphics, Point } from "pixi.js";
import { Keyboard } from "../utils/Keyboard";
import { GAME_HEIGHT, GAME_WIDTH } from "../utils/constants";
import { AbstractMob } from "./AbstractMob";

export class Player extends AbstractMob {
    
    private static readonly BORDER_COLOR : number = 0x020202;
    private static readonly COLOR : string = "0x87ff65";
    private static readonly MOVE_SPEED : number = 350;
    private static readonly SIZE : number = 15;
    private speed : Point = new Point();

    

    constructor() {
        super();

        const pen = new Graphics();
        pen.lineStyle(5, Player.BORDER_COLOR, 1, 1);
        pen.beginFill(Player.COLOR);
        pen.drawCircle(0, 0, Player.SIZE);
        pen.endFill();

        this.addChild(pen);
    }
    
    override move(deltaSeconds: number): void {
        
        if(Keyboard.state.get("ArrowRight")) {
            this.speed.x = Player.MOVE_SPEED;
        } else if(Keyboard.state.get("ArrowLeft")) {
            this.speed.x = -Player.MOVE_SPEED;
        } else {
            this.speed.x = 0;
        }

        if(Keyboard.state.get("ArrowUp")) {
            this.speed.y = -Player.MOVE_SPEED;
        } else if(Keyboard.state.get("ArrowDown")) {
            this.speed.y = Player.MOVE_SPEED;
        } else {
            this.speed.y = 0;
        }

        
        this.x += this.speed.x * deltaSeconds;
        this.y += this.speed.y * deltaSeconds;

        this.keepWithinBounds();
    }

    override getRadius(): number {
        return Player.SIZE;
    }

    private keepWithinBounds(): void {
        if(this.x > GAME_WIDTH - Player.SIZE) {
            this.x = GAME_WIDTH - Player.SIZE;
        } else if (this.x < 0 + Player.SIZE) {
            this.x = 0 + Player.SIZE;
        }

        if(this.y > GAME_HEIGHT - Player.SIZE) {
            this.y = GAME_HEIGHT - Player.SIZE;
        } else if (this.y < 0 + Player.SIZE) {
            this.y = 0 + Player.SIZE;
        }
    }
}