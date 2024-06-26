import { Text, TextStyle } from "pixi.js";
import { AbstractScene } from "./AbstractScene";
import { FONT, SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/constants";
import { Button } from "../ui/Button";
import { SceneManager } from "../utils/SceneManager";
import { TitleScreenScene } from "./TitleScreenScene";
import { GameScene } from "./GameScene";
import { HUD } from "../ui/HUD";
import { sound } from "@pixi/sound";
import { RecordManager } from "../ui/RecordManager";
import { EndlessGameScene } from "./EndlessGameScene";

export class GameResultScene extends AbstractScene {

    private hud;
    private backgroundMusic = sound.find("MenuMusic");

    constructor(titleText: string, titleColor: string, survivedTime: number, recordKey: string, gamemode: ("normal" | "endless")) {
        super();

        this.hud = new HUD();
        this.backgroundMusic.play({ loop: true, volume: 0.1 });

        const textStyle = new TextStyle({
            fontSize: 250,
            fontFamily: FONT,
            fill: titleColor,
        });

        const title = new Text(titleText, textStyle);
        title.anchor.set(0.5);
        title.position.set(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 4);

        const textStyle2 = new TextStyle({
            fontSize: 40,
            fontFamily: FONT,
        });

        const survivedTimeText = new Text("Survived time: " + survivedTime + "s", textStyle2);
        survivedTimeText.anchor.set(0.5);
        survivedTimeText.position.set(title.x, 430);

        const personalBestText = new Text("Personal Best: " + RecordManager.retrieveRecord(recordKey) + "s", textStyle2);
        personalBestText.anchor.set(0.5);
        personalBestText.position.set(title.x, 490);

        const retryBtn = new Button(
            "Retry",
            0xfdfff7,
            0xffe135,
            gamemode === "normal" ? this.goToGame.bind(this) : this.goToEndless.bind(this)
        );
        retryBtn.position.set(title.x - retryBtn.width / 2, 540);

        const titleScreenBtn = new Button(
            "Title Screen",
            0xfdfff7,
            0xffe135,
            this.goToTitleScreen.bind(this)
        );
        titleScreenBtn.position.set(title.x - titleScreenBtn.width / 2, 640);

        this.addChild(title);
        this.addChild(survivedTimeText);
        this.addChild(personalBestText);
        this.addChild(titleScreenBtn);
        this.addChild(retryBtn);
        this.addChild(this.hud);
    }

    private goToGame() {
        if (sound.isPlaying()) {
            sound.stopAll();
        }
        SceneManager.changeScene(new GameScene());
    }

    private goToEndless() {
        if (sound.isPlaying()) {
            sound.stopAll();
        }
        SceneManager.changeScene(new EndlessGameScene());
    }

    private goToTitleScreen() {
        if (sound.isPlaying()) {
            sound.stopAll();
        }
        SceneManager.changeScene(new TitleScreenScene());
    }

    public override update(): void { }
}