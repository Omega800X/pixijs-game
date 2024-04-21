import { Container } from "pixi.js";
import { Enemy } from "../game/Enemy";
import { Player } from "../game/Player";
import { AbstractScene } from "./AbstractScene";
import { HUD } from "../ui/HUD";
import { Timer } from "../ui/Timer";
import { sound } from "@pixi/sound";
import { TutorialContainer } from "../game/TutorialContainer";
import { SpawnFloor } from "../game/SpawnFloor";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../utils/constants";
import { GameResultScene } from "./GameResultScene";
import { SceneManager } from "../utils/SceneManager";
import { Tween } from "tweedle.js";
import { RecordManager } from "../ui/RecordManager";
import { FreezePowerUp } from "../game/FreezePowerUp";

export class EndlessGameScene extends AbstractScene {
    
    private static readonly TIME_LIMIT_MS = 60000;
    private static readonly SPAWN_TIME_MS = 6000;
    private static readonly RECORD_KEY = "endlessGameRecord";
    private tinyPlayer : Player = new Player("Player", 500, 12);
    private enemies : Enemy[] = [];
    private gameContainer : Container;
    private hud : HUD;
    private timer = new Timer(EndlessGameScene.TIME_LIMIT_MS / 1000);
    private backgroundMusic = sound.find("GameMusic");
    private freezePowerUp : FreezePowerUp;

    constructor() {
        super();

        const tutorialContainer = new TutorialContainer();
        this.backgroundMusic.play({loop: true, volume: 0.1});
        this.hud = new HUD();
        this.gameContainer = new Container();
        const spawnFloor = new SpawnFloor();

        this.tinyPlayer.scale.set(0.5);
        this.tinyPlayer.position.set(SCREEN_WIDTH/2, SCREEN_HEIGHT/2);

        this.timer.position.set(SCREEN_WIDTH/2, SCREEN_HEIGHT/2);
        this.timer.alpha = 0.5;

        this.gameContainer.addChild(this.tinyPlayer);

        this.spawnEnemy();

        this.freezePowerUp = new FreezePowerUp(this.tinyPlayer, this.enemies);
        this.gameContainer.addChild(this.freezePowerUp);

        new Tween({a: 0})
            .to({a: 1}, EndlessGameScene.SPAWN_TIME_MS)
            .repeat((EndlessGameScene.TIME_LIMIT_MS / EndlessGameScene.SPAWN_TIME_MS))
            .onRepeat(this.spawnEnemy.bind(this))
            .start();

        this.addChild(spawnFloor);
        this.addChild(tutorialContainer);
        this.addChild(this.timer);
        this.addChild(this.gameContainer);
        this.addChild(this.hud);

        new Tween(tutorialContainer).to({alpha:0}, 3000).onComplete(() => {this.removeChild(tutorialContainer)}).start();
    }

    

    private spawnEnemy() : void {
        const newEnemy = new Enemy("Enemy", 300, 12);
        newEnemy.scale.set(0.5);
        this.enemies.push(newEnemy);
        this.gameContainer.addChild(newEnemy);
    }

    private goToGameResultScene(titleText : string, titleColor : string, survivedTime : number) {
        if(sound.isPlaying()) {
            sound.stopAll();
        }
        SceneManager.changeScene(new GameResultScene(titleText, titleColor, survivedTime, EndlessGameScene.RECORD_KEY, "endless"));
    }

    public override update(deltaTime: number): void {
        const deltaSeconds = deltaTime / 1000;

        this.tinyPlayer.update(deltaSeconds);

        if(this.children.includes(this.freezePowerUp)) {
            this.freezePowerUp.update();
        }

        this.enemies.forEach(enemy => {
            enemy.update(deltaSeconds);
            if(this.tinyPlayer.isColliding(enemy) || this.timer.getCounter() <= 0) {
                if(RecordManager.isRecord(EndlessGameScene.RECORD_KEY, this.timer.getSurvivedTime())) {
                    RecordManager.storeRecord(EndlessGameScene.RECORD_KEY, this.timer.getSurvivedTime().toString());
                }
                this.goToGameResultScene("Game Ended!", "black", this.timer.getSurvivedTime());
            }
        });
    
    }
}