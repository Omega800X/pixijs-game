import { Container, Text, TextStyle } from "pixi.js";
import { FONT, GAME_NAME, IS_TAURI, SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/constants";
import { AbstractScene } from "./AbstractScene";
import { Button } from "../ui/Button";
import { SceneManager } from "../utils/SceneManager";
import { GameScene } from "./GameScene";
import { Enemy } from "../game/Enemy";
import { exit } from "@tauri-apps/api/process";
import { HUD } from "../ui/HUD";
import { sound } from "@pixi/sound";

export class TitleScreenScene extends AbstractScene {
    
    private backgroundContainer : Container;
    private backgroundBalls : Enemy[];
    private hud;
    private backgroundMusic = sound.find("MenuMusic");

    constructor() {
        super();
        
        
        
        this.hud = new HUD();
        this.backgroundMusic.play({loop: true, volume: 0.1});
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

        const playButton = new Button("Play", 0xfdfff7, 0x74b72e, this.goToGameScene);
        playButton.position.set(title.x - playButton.width/2, 500);

        this.addChild(this.backgroundContainer);
        this.addChild(title);
        this.addChild(playButton);
        this.addChild(this.hud);

        if (IS_TAURI) {
            const exitButton = new Button("Exit", 0xfdfff7, 0xd21404, this.exitGame);
            exitButton.position.set(title.x - exitButton.width/2, 700);
            this.addChild(exitButton);
        }
    }

    public override update(deltaTime : number): void {
        this.backgroundBalls.forEach(ball => {
            ball.update(deltaTime/1000);
        });
    };

    private goToGameScene() {
        if(sound.isPlaying()) {
            sound.stopAll();
        }
        SceneManager.changeScene(new GameScene());
    }
    
    private exitGame() {
        if (IS_TAURI) {
            exit();
        }
    }
}