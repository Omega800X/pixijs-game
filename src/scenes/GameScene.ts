import { Container } from "pixi.js";
import { Player } from "../game/Player";
import { IUpdateable } from "../utils/interfaces/IUpdateable";
import { GAME_HEIGHT, GAME_WIDTH } from "../utils/constants";
import { EnemyBall } from "../game/EnemyBall";
import { are_colliding } from "../utils/collisions";
import { AbstractMob } from "../game/AbstractMob";

export class GameScene extends Container implements IUpdateable {

    private static readonly ENEMY_SPAWN_TIME : number = 6;
    private enemies : AbstractMob[] = [];
    private player : Player = new Player();
    private enemySpawnCounter : number = 0;

    constructor() {
        super();


        this.player.position.set(GAME_WIDTH/2, GAME_HEIGHT/2);

        this.addEnemy();
        this.addChild(this.player);
    }

    update(deltaTime: number, _deltaFrame?: number | undefined): void {
        
        if(!this.player.destroyed) {
            const deltaSeconds = deltaTime / 1000;

            this.enemySpawnCounter += deltaSeconds;

            if(this.enemySpawnCounter >= GameScene.ENEMY_SPAWN_TIME) {
                this.addEnemy();
                this.enemySpawnCounter = 0;
            }
            
            this.player.move(deltaSeconds);

            for (const enemy of this.enemies) {
                enemy.move(deltaSeconds);

                if(are_colliding(this.player, enemy)) {
                    this.player.destroy();
                    break;
                }
            }
        }
        
    }

    private addEnemy() : void {
        const enemy = new EnemyBall();

        const spawn = Math.floor(Math.random() * 4);

        switch(spawn) {
            case 0: {
                const positionX = GAME_WIDTH - enemy.getRadius();
                const positionY = GAME_HEIGHT * Math.random();

                enemy.position.set(positionX, positionY);
                break;
            }
            case 1: {
                const positionX = GAME_WIDTH * Math.random();
                const positionY = GAME_HEIGHT - enemy.getRadius();

                enemy.position.set(positionX, positionY);
                break;
            }
            case 2: {
                const positionX = 0 + enemy.getRadius();
                const positionY = GAME_HEIGHT * Math.random();

                enemy.position.set(positionX, positionY);
                break;
            }
            case 3: {
                const positionX = GAME_WIDTH * Math.random();
                const positionY = 0 + enemy.getRadius();

                enemy.position.set(positionX, positionY);
                break;
            }
        }

        
        this.enemies.push(enemy);
        this.addChild(enemy);
    }
}