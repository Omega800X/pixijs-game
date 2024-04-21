import { Text, TextStyle } from "pixi.js";
import { AbstractScene } from "./AbstractScene";
import { FONT, SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/constants";
import { Button } from "../ui/Button";
import { SceneManager } from "../utils/SceneManager";
import { TitleScreenScene } from "./TitleScreenScene";
import { GameScene } from "./GameScene";
import { HUD } from "../ui/HUD";
import { sound } from "@pixi/sound";

export class GameResultScene extends AbstractScene {
    
    private hud;
    private backgroundMusic = sound.find("MenuMusic");

    constructor(titleText : string, titleColor : string) {
        super();

        this.hud = new HUD();
        this.backgroundMusic.play({loop: true, volume: 0.1});

        const textStyle = new TextStyle({
            fontSize: 250,
            fontFamily: FONT,
            fill: titleColor,
        });

        const title = new Text(titleText, textStyle);
        title.anchor.set(0.5);
        title.position.set(SCREEN_WIDTH/2, SCREEN_HEIGHT/4);

        const retryBtn = new Button(
            "Retry", 
            0xfdfff7, 
            0x74b72e, 
            this.goToGame.bind(this)
        );
        retryBtn.position.set(title.x - retryBtn.width/2, 500);

        const titleScreenBtn = new Button(
            "Title Screen", 
            0xfdfff7, 
            0xd21404, 
            this.goToTitleScreen.bind(this)
        );
        titleScreenBtn.position.set(title.x - titleScreenBtn.width/2, 700);

        this.addChild(title);
        this.addChild(titleScreenBtn);
        this.addChild(retryBtn);
        this.addChild(this.hud);
    }

    private goToGame() {
        if(sound.isPlaying()) {
            sound.stopAll();
        }
        SceneManager.changeScene(new GameScene());
    }

    private goToTitleScreen() {
        if(sound.isPlaying()) {
            sound.stopAll();
        }
        SceneManager.changeScene(new TitleScreenScene());
    }

    public override update(): void {}
}