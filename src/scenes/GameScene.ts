import { AbstractScene } from "./AbstractScene";
import { Player } from "../game/Player";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/constants";
import { Enemy } from "../game/Enemy";
import { Tween } from "tweedle.js";
import { Container } from "pixi.js";
import { GameManager } from "../utils/GameManager";
import { GameResultScene } from "./GameResultScene";
import { Timer } from "../ui/Timer";

export class GameScene extends AbstractScene {

    private timer: Timer;

    private player: Player;
    private enemies: Enemy[] = [];
    private gameContainer: Container = new Container();

    constructor() {
        super();

        this.timer = new Timer();
        this.timer.position.set(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);

        this.player = new Player("player", 400, 0.8);
        this.player.position.set(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);

        this.spawnEnemy();

        new Tween({ a: 0 })
            .to({ a: 1 }, 6000)
            .repeat(Infinity)
            .onRepeat(this.spawnEnemy.bind(this))
            .start();

        this.gameContainer.addChild(this.player);
        this.addChild(this.timer);
        this.addChild(this.gameContainer);
    }

    private spawnEnemy(): void {
        const newEnemy = new Enemy("enemy", 0.8);

        const spawnSide = Math.floor(Math.random() * 4);

        switch (spawnSide) {
            case 0: {
                const positionX = SCREEN_WIDTH - newEnemy.getRadius();
                const positionY = SCREEN_HEIGHT * Math.random();

                newEnemy.position.set(positionX, positionY);
                break;
            }
            case 1: {
                const positionX = SCREEN_WIDTH * Math.random();
                const positionY = SCREEN_HEIGHT - newEnemy.getRadius();

                newEnemy.position.set(positionX, positionY);
                break;
            }
            case 2: {
                const positionX = 0 + newEnemy.getRadius();
                const positionY = SCREEN_HEIGHT * Math.random();

                newEnemy.position.set(positionX, positionY);
                break;
            }
            case 3: {
                const positionX = SCREEN_WIDTH * Math.random();
                const positionY = 0 + newEnemy.getRadius();

                newEnemy.position.set(positionX, positionY);
                break;
            }
        }


        this.enemies.push(newEnemy);
        this.gameContainer.addChild(newEnemy);
    }

    private goToResultScene(titleText: string, titleColor: number, result: ("win" | "lose")): void {
        GameManager.changeScene(new GameResultScene(titleText, titleColor, result));
    }

    public override update(deltaTime: number): void {

        const deltaSeconds = deltaTime / 1000;
        this.player.update(deltaSeconds);

        for (let index = 0; index < this.enemies.length; index++) {
            const enemy = this.enemies[index];
            enemy.update(deltaSeconds);

            if (enemy.isColliding(this.player)) {
                this.goToResultScene("¡Perdiste!", 0xd84f58, "lose");
            }
        }

        if (this.timer.getCounter() == 5) {
            this.goToResultScene("¡Ganaste!", 0x6cc47c, "win");
        }
    }
}