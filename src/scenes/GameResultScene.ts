import { Text, TextStyle } from "pixi.js";
import { AbstractScene } from "./AbstractScene";
import { FONT, SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/constants";
import { Button } from "../ui/Button";
import { SceneManager } from "../utils/SceneManager";
import { TitleScreenScene } from "./TitleScreenScene";
import { GameScene } from "./GameScene";

export class GameResultScene extends AbstractScene {
    
    constructor(titleText : string, titleColor : string) {
        super();

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
            0xD21404, 
            this.goToTitleScreen.bind(this)
        );
        titleScreenBtn.position.set(title.x - titleScreenBtn.width/2, 700);

        this.addChild(title);
        this.addChild(titleScreenBtn);
        this.addChild(retryBtn);
    }

    private goToGame() {
        SceneManager.changeScene(new GameScene());
    }

    private goToTitleScreen() {
        SceneManager.changeScene(new TitleScreenScene());
    }

    public override update(): void {}
}