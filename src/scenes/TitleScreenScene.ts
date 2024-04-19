import { Container, Text, TextStyle } from "pixi.js";
import { FONT, GAME_NAME, SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/constants";
import { AbstractScene } from "./AbstractScene";
import { Button } from "../ui/Button";
import { SceneManager } from "../utils/SceneManager";
import { GameScene } from "./GameScene";
import { Enemy } from "../game/Enemy";

export class TitleScreenScene extends AbstractScene {
    
    private backgroundContainer : Container;
    private backgroundBalls : Enemy[];

    constructor() {
        super();

        this.backgroundContainer = new Container();
        this.backgroundContainer.alpha = 0.5;
        this.backgroundBalls = [];

        for(let i = 0; i < 20; i++) {
            const newEnemy = new Enemy("Enemy", 300);
            this.backgroundBalls.push(newEnemy);
            this.backgroundContainer.addChild(newEnemy);
        }

        const textStyle = new TextStyle({
            fontSize: 150,
            fontFamily: FONT,
        });

        const title = new Text(GAME_NAME, textStyle);
        title.anchor.set(0.5);
        title.position.set(SCREEN_WIDTH/2, SCREEN_HEIGHT/4);

        const playButton = new Button("Play", 0xfdfff7, 0xfff380, this.goToGameScene);
        playButton.position.set(title.x - playButton.width/2, 500);

        this.addChild(this.backgroundContainer);
        this.addChild(title);
        this.addChild(playButton);
    }

    public override update(deltaTime : number): void {
        this.backgroundBalls.forEach(ball => {
            ball.update(deltaTime/1000);
        });
    };

    private goToGameScene() {
        SceneManager.changeScene(new GameScene());
    }
}