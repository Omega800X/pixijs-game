import { AbstractScene } from "./AbstractScene";
import { SpawnFloor } from "../game/SpawnFloor";
import { Player } from "../game/Player";
import { Enemy } from "../game/Enemy";
import { Container } from "pixi.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/constants";
import { Tween } from "tweedle.js";
import { Timer } from "../ui/Timer";

export class GameScene extends AbstractScene {
    
    private static readonly TIME_LIMIT_MS = 12000; 
    private static readonly SPAWN_TIME_MS = 6000;
    private player : Player = new Player("Player", 350);
    private enemies : Enemy[] = [];
    private gameContainer = new Container();
    private timer = new Timer(GameScene.TIME_LIMIT_MS / 1000);
    

    constructor () {
        super();

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
        this.addChild(this.timer);
        this.addChild(this.gameContainer);

        
    }
    
    private spawnEnemy() : void {
        const newEnemy = new Enemy("Enemy", 300);
        this.enemies.push(newEnemy);
        this.gameContainer.addChild(newEnemy);
    }
    
    public override update(deltaTime : number) : void {
        const deltaSeconds = deltaTime/1000;
        this.player.update(deltaSeconds);
        this.enemies.forEach(enemy => {
            enemy.update(deltaSeconds);

            if(this.player.is_colliding(enemy)) {
                console.log("Collision!"); // TODO
            }
        });
    }
}