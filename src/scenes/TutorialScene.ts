import { Text, TextStyle } from "pixi.js";
import { AbstractScene } from "./AbstractScene";
import { FONT, SCREEN_WIDTH } from "../utils/constants";
import { Button } from "../ui/Button";
import { sound } from "@pixi/sound";
import { SceneManager } from "../utils/SceneManager";
import { TitleScreenScene } from "./TitleScreenScene";
import { HUD } from "../ui/HUD";
import { Enemy } from "../game/Enemy";
import { FreezePowerUp } from "../game/FreezePowerUp";
import { MoreTimePowerUp } from "../game/MoreTimePowerUp";
import { Timer } from "../ui/Timer";
import { MinusOnePowerUp } from "../game/MinusOnePowerUp";
import { Player } from "../game/Player";

export class TutorialScene extends AbstractScene {

    private hud;
    private backgroundMusic = sound.find("MenuMusic");

    constructor() {
        super();

        this.hud = new HUD();
        this.backgroundMusic.play({ loop: true, volume: 0.1 });

        const textStyle = new TextStyle({
            fontSize: 120,
            fontFamily: FONT,
        });

        const textStyle2 = new TextStyle({
            fontSize: 40,
            fontFamily: FONT,
        });

        const tutorialTitle = new Text("Tutorial", textStyle);
        tutorialTitle.anchor.set(0.5);
        tutorialTitle.position.set(SCREEN_WIDTH / 2, tutorialTitle.height);

        const controlsText = new Text("- Press WASD or Arrow keys to move the green ball.", textStyle2)
        controlsText.position.set(200, 300);

        const player = new Player("Player", 0, 0);
        player.position.set(controlsText.x + controlsText.width + 60, 320)

        const avoidText = new Text("- Avoid red balls.", textStyle2)
        avoidText.position.set(200, 400);

        const enemy = new Enemy("Enemy", 0, 0);
        enemy.position.set(avoidText.x + avoidText.width + 60, 420);

        const surviveText = new Text("- In normal mode: survive 120 seconds to win.", textStyle2)
        surviveText.position.set(200, 500);

        const powerUpsText = new Text("- In Endless: grab snowflakes, clocks and minuses \n to slow enemies, add time and remove balls.", textStyle2);
        powerUpsText.position.set(200, 600);

        const snowflake = new FreezePowerUp([]);
        snowflake.position.set(250, 750);
        const clock = new MoreTimePowerUp(new Timer(0));
        clock.position.set(350, 750);
        const minus = new MinusOnePowerUp([]);
        minus.position.set(450, 750);


        const backButton = new Button("Back", 0xfdfff7, 0xffe135, this.goToTitleScreen);
        backButton.position.set(SCREEN_WIDTH / 2 - backButton.width / 2, 900);

        this.addChild(tutorialTitle);
        this.addChild(controlsText);
        this.addChild(player);
        this.addChild(avoidText);
        this.addChild(enemy);
        this.addChild(surviveText);
        this.addChild(powerUpsText);
        this.addChild(snowflake);
        this.addChild(clock);
        this.addChild(minus);
        this.addChild(backButton);
        this.addChild(this.hud);
    }

    private goToTitleScreen(): void {
        if (sound.isPlaying()) {
            sound.stopAll();
        }
        SceneManager.changeScene(new TitleScreenScene());
    }

    public override update(): void { }
}