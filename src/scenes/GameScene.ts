import { AbstractScene } from "./AbstractScene";
import { SpawnFloor } from "../game/SpawnFloor";
import { Player } from "../game/Player";
import { Enemy } from "../game/Enemy";
import { Container } from "pixi.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/constants";
import { Tween } from "tweedle.js";
import { Timer } from "../ui/Timer";
import { GameResultScene } from "./GameResultScene";
import { SceneManager } from "../utils/SceneManager";
import { TutorialContainer } from "../game/TutorialContainer";
import { HUD } from "../ui/HUD";
import { sound } from "@pixi/sound";
import { RecordManager } from "../ui/RecordManager";

export class GameScene extends AbstractScene {
    
    private static readonly TIME_LIMIT_MS = 120000; 
    private static readonly SPAWN_TIME_MS = 6000;
    private static readonly RECORD_KEY = "normalGameRecord";
    private player : Player = new Player("Player", 350, 28);
    private enemies : Enemy[] = [];
    private gameContainer : Container;
    private hud : HUD;
    private timer = new Timer(GameScene.TIME_LIMIT_MS / 1000);
    private backgroundMusic = sound.find("GameMusic");

    constructor () {
        super();

        const tutorialContainer = new TutorialContainer();
        this.backgroundMusic.play({loop: true, volume: 0.1});
        this.hud = new HUD();
        this.gameContainer = new Container();
        const spawnFloor = new SpawnFloor();

        this.timer.position.set(SCREEN_WIDTH/2, SCREEN_HEIGHT/2);
        this.timer.alpha = 0.5;

        this.player.position.set(SCREEN_WIDTH/2, SCREEN_HEIGHT/2);
        this.gameContainer.addChild(this.player);

        this.spawnEnemy();

        new Tween({a: 0})
            .to({a: 1}, GameScene.SPAWN_TIME_MS)
            .repeat((GameScene.TIME_LIMIT_MS / GameScene.SPAWN_TIME_MS) - 1)
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
        const newEnemy = new Enemy("Enemy", 300, 28);
        this.enemies.push(newEnemy);
        this.gameContainer.addChild(newEnemy);
    }
    
    private goToGameResultScene(titleText : string, titleColor : string, survivedTime : number) {
        if(sound.isPlaying()) {
            sound.stopAll();
        }
        SceneManager.changeScene(new GameResultScene(titleText, titleColor, survivedTime, GameScene.RECORD_KEY, "normal"));
    }

    public override update(deltaTime : number) : void {
        const deltaSeconds = deltaTime/1000;
        this.player.update(deltaSeconds);
        this.enemies.forEach(enemy => {
            enemy.update(deltaSeconds);

            if(this.player.isColliding(enemy)) {
                if(RecordManager.isRecord(GameScene.RECORD_KEY, this.timer.getSurvivedTime())) {
                    RecordManager.storeRecord(GameScene.RECORD_KEY, this.timer.getSurvivedTime().toString());
                }
                this.goToGameResultScene("You lost!", "red", this.timer.getSurvivedTime());
            }
        });

        if(this.timer.getCounter() <= 0) {
            if(RecordManager.isRecord(GameScene.RECORD_KEY, this.timer.getSurvivedTime())) {
                RecordManager.storeRecord(GameScene.RECORD_KEY, this.timer.getSurvivedTime().toString());
            }
            this.goToGameResultScene("You won!", "green", this.timer.getSurvivedTime());
        }

    }
}