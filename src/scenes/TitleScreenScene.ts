import { Text, Container, TextStyle, Graphics } from "pixi.js";
import { IUpdateable } from "../utils/interfaces/IUpdateable";
import { GAME_HEIGHT, GAME_WIDTH } from "../utils/constants";
import { Death } from "../game/Death";
import { Button } from "../ui/Button";

export class TitleScreenScene extends Container implements IUpdateable {
    
    constructor() {
        super();

        const ballsPen = new Graphics();

        const tStyle = new TextStyle({
            fontSize: 150,
            fontFamily: "Minercraftory",
        });

        const gameTitle = new Text("Dodge Them!", tStyle);
        gameTitle.anchor.set(0.5);
        gameTitle.position.set(GAME_WIDTH/2, 200);

        const playButton = new Button("Play", this.goToGame.bind(this));
        playButton.position.set(GAME_WIDTH/2, GAME_HEIGHT/2);

        ballsPen.lineStyle(5, 0x020202, 1, 1);

        ballsPen.beginFill("0xdf2935");
        for (let index = 0; index < 20; index++) {
            ballsPen.drawCircle(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1080), 70)
        }
        ballsPen.endFill();


        const titlePen = new Graphics();
        titlePen.lineStyle(5, 0x020202, 1, 1);
        titlePen.beginFill("0xf8e9e9");
        titlePen.drawRect(gameTitle.x - gameTitle.width/2 - 50, gameTitle.y - gameTitle.height/2, gameTitle.width + 100, gameTitle.height);
        titlePen.endFill();

        const death = new Death();
        death.position.set(70, 1010);
        death.scale.set(0.2);

        this.addChild(ballsPen);
        this.addChild(death);
        this.addChild(playButton);
        this.addChild(titlePen);
        this.addChild(gameTitle);
    }

    update(_deltaTime: number, _deltaFrame?: number | undefined): void {
    }

    private goToGame() : void {
        console.log("pepe desde goToGame");
    }
}