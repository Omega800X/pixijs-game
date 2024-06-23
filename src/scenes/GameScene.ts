import { AbstractScene } from "./AbstractScene";
import { Player } from "../game/Player";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/constants";
import { Enemy } from "../game/Enemy";
import { Tween } from "tweedle.js";
import { Container } from "pixi.js";

export class GameScene extends AbstractScene {

    private player: Player;
    private enemies: Enemy[] = [];

    private gameContainer: Container = new Container();

    constructor() {
        super();

        this.player = new Player("player", 400, 0.8);
        this.player.position.set(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);

        this.spawnEnemy();

        new Tween({ a: 0 })
            .to({ a: 1 }, 6000)
            .repeat(Infinity)
            .onRepeat(this.spawnEnemy.bind(this))
            .start();

        this.gameContainer.addChild(this.player);
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

    public override update(deltaTime: number): void {
        const deltaSeconds = deltaTime / 1000;
        this.player.update(deltaSeconds);

        for (let index = 0; index < this.enemies.length; index++) {
            this.enemies[index].update(deltaSeconds);
            console.log(this.enemies[index].isColliding(this.player));
        }
    }
}