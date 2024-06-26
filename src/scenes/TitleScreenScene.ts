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
import { EndlessGameScene } from "./EndlessGameScene";
import { TutorialScene } from "./TutorialScene";

export class TitleScreenScene extends AbstractScene {

    private backgroundContainer: Container;
    private backgroundBalls: Enemy[];
    private hud;
    private backgroundMusic = sound.find("MenuMusic");

    constructor() {
        super();



        this.hud = new HUD();
        this.backgroundMusic.play({ loop: true, volume: 0.1 });
        this.backgroundContainer = new Container();
        this.backgroundContainer.alpha = 0.5;
        this.backgroundBalls = [];

        for (let i = 0; i < 30; i++) {
            const newEnemy = new Enemy("Enemy", 300, 28);
            this.backgroundBalls.push(newEnemy);
            this.backgroundContainer.addChild(newEnemy);
        }

        const textStyle = new TextStyle({
            fontSize: 150,
            fontFamily: FONT,
        });

        const title = new Text(GAME_NAME, textStyle);
        title.anchor.set(0.5);
        title.position.set(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 4);

        const playButton = new Button("Play", 0xfdfff7, 0xffe135, this.goToGameScene);
        playButton.position.set(title.x - playButton.width / 2, 500);

        const endlessButton = new Button("Endless", 0xfdfff7, 0xffe135, this.goToEndlessGameScene);
        endlessButton.position.set(title.x - playButton.width / 2, 600);

        const tutorialButton = new Button("Tutorial", 0xfdfff7, 0xffe135, this.goToTutorialScene);
        tutorialButton.position.set(title.x - playButton.width / 2, 700);

        this.addChild(this.backgroundContainer);
        this.addChild(title);
        this.addChild(playButton);
        this.addChild(endlessButton);
        this.addChild(tutorialButton)
        this.addChild(this.hud);

        if (IS_TAURI) {
            const exitButton = new Button("Exit", 0xfdfff7, 0xffe135, this.exitGame);
            exitButton.position.set(title.x - exitButton.width / 2, 800);
            this.addChild(exitButton);
        }
    }

    public override update(deltaTime: number): void {
        this.backgroundBalls.forEach(ball => {
            ball.update(deltaTime / 1000);
        });
    };

    private goToGameScene() {
        if (sound.isPlaying()) {
            sound.stopAll();
        }
        SceneManager.changeScene(new GameScene());
    }

    private goToEndlessGameScene() {
        if (sound.isPlaying()) {
            sound.stopAll();
        }
        SceneManager.changeScene(new EndlessGameScene());
    }

    private goToTutorialScene() {
        if (sound.isPlaying()) {
            sound.stopAll();
        }
        SceneManager.changeScene(new TutorialScene());
    }

    private exitGame() {
        if (IS_TAURI) {
            exit();
        }
    }
}