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
import { MoreTimePowerUp } from "../game/MoreTimePowerUp";
import { FreezePowerUp } from "../game/FreezePowerUp";
import { AbstractPowerUp } from "../game/AbstractPowerUp";
import { MinusOnePowerUp } from "../game/MinusOnePowerUp";

export class EndlessGameScene extends AbstractScene {

    private static readonly TIME_LIMIT_MS = 60000;
    private static readonly SPAWN_TIME_MS = 3000;
    private static readonly RECORD_KEY = "endlessGameRecord";
    private tinyPlayer: Player = new Player("Player", 500, 12);
    private enemies: Enemy[] = [];
    private powerUps: AbstractPowerUp[] = [];
    private gameContainer: Container;
    private powerUpsContainer: Container;
    private hud: HUD;
    private timer = new Timer(EndlessGameScene.TIME_LIMIT_MS / 1000);
    private backgroundMusic = sound.find("GameMusic");

    constructor() {
        super();

        const tutorialContainer = new TutorialContainer();
        this.backgroundMusic.play({ loop: true, volume: 0.1 });
        this.hud = new HUD();
        this.gameContainer = new Container();
        this.powerUpsContainer = new Container();
        const spawnFloor = new SpawnFloor();

        this.tinyPlayer.scale.set(0.5);
        this.tinyPlayer.position.set(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);

        this.timer.position.set(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
        this.timer.alpha = 0.5;

        this.gameContainer.addChild(this.tinyPlayer);

        this.spawnEnemy();

        new Tween({ a: 0 })
            .to({ a: 1 }, EndlessGameScene.SPAWN_TIME_MS)
            .repeat(Infinity)
            .onRepeat(this.spawnEnemy.bind(this))
            .start();

        this.addChild(spawnFloor);
        this.addChild(tutorialContainer);
        this.addChild(this.timer);
        this.addChild(this.powerUpsContainer);
        this.addChild(this.gameContainer);
        this.addChild(this.hud);

        // deleting tutorial after 3s
        new Tween(tutorialContainer)
            .to({ alpha: 0 }, 3000)
            .onComplete(() => { this.removeChild(tutorialContainer) }).start();


        // spawning power-ups periodically
        new Tween({ b: 0 }).to({ b: 1 }, 10000)
            .repeat(Infinity)
            .onRepeat(this.spawnMoreTimePowerUp.bind(this))
            .start();
        new Tween({ c: 0 }).to({ c: 1 }, 5000)
            .repeat(Infinity)
            .onRepeat(this.spawnFreezePowerUp.bind(this))
            .start();
        new Tween({ c: 0 }).to({ c: 1 }, 9000)
            .repeat(Infinity)
            .onRepeat(this.spawnMinusOnePowerUp.bind(this))
            .start();
    }



    private spawnEnemy(): void {
        const newEnemy = new Enemy("Enemy", 300, 12);
        newEnemy.scale.set(0.75);
        this.enemies.push(newEnemy);
        this.gameContainer.addChild(newEnemy);
    }

    private spawnFreezePowerUp(): void {
        const newPowerUp = new FreezePowerUp(this.enemies);
        this.powerUps.push(newPowerUp);
        this.powerUpsContainer.addChild(newPowerUp);
    }

    private spawnMoreTimePowerUp(): void {
        const newPowerUp = new MoreTimePowerUp(this.timer);
        this.powerUps.push(newPowerUp);
        this.powerUpsContainer.addChild(newPowerUp);
    }

    private spawnMinusOnePowerUp(): void {
        const newPowerUp = new MinusOnePowerUp(this.enemies);
        this.powerUps.push(newPowerUp);
        this.powerUpsContainer.addChild(newPowerUp);
    }

    private goToGameResultScene(titleText: string, titleColor: string, survivedTime: number) {
        if (sound.isPlaying()) {
            sound.stopAll();
        }
        SceneManager.changeScene(new GameResultScene(titleText, titleColor, survivedTime, EndlessGameScene.RECORD_KEY, "endless"));
    }

    public override update(deltaTime: number): void {
        const deltaSeconds = deltaTime / 1000;

        this.tinyPlayer.update(deltaSeconds);

        this.powerUps.forEach(powerUp => {
            if (this.tinyPlayer.isColliding(powerUp)) {
                powerUp.powerUpEffect();
                this.powerUps = this.powerUps.filter((pU) => { return pU !== powerUp; });
                powerUp.destroy();
            }
        });

        this.enemies.forEach(enemy => {
            enemy.update(deltaSeconds);
            if (this.tinyPlayer.isColliding(enemy) || this.timer.getCounter() <= 0) {
                if (RecordManager.isRecord(EndlessGameScene.RECORD_KEY, this.timer.getSurvivedTime())) {
                    RecordManager.storeRecord(EndlessGameScene.RECORD_KEY, this.timer.getSurvivedTime().toString());
                }
                this.goToGameResultScene("Game Ended!", "green", this.timer.getSurvivedTime());
            }
        });

    }
}