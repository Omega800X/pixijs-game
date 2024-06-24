import { Container, Graphics, NineSlicePlane, Text, TextStyle, Texture } from "pixi.js";
import { FONT, SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/constants";
import { AbstractScene } from "./AbstractScene";
import { Enemy } from "../game/Enemy";

export class GameResultScene extends AbstractScene {

    private backgroundBalls: Enemy[] = [];
    private backgroundContainer: Container = new Container();

    constructor(titleText: string, titleColor: number, result: ("win" | "lose")) {
        super();

        this.backgroundContainer.alpha = 0.5;
        for (let index = 0; index < 40; index++) {
            this.spawnBackgroundBalls(result);
        }
        const pen = new Graphics();
        pen.beginFill(0x000000, 0.1);
        pen.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        pen.endFill();

        const titleBackground = new NineSlicePlane(
            Texture.from("square"),
            35,
            35,
            35,
            35
        );
        titleBackground.width = 500;
        titleBackground.height = 200;
        titleBackground.scale.set(2);
        titleBackground.position.set(SCREEN_WIDTH / 2 - titleBackground.width, SCREEN_HEIGHT / 4 - titleBackground.height);

        const textStyle = new TextStyle({
            fontSize: 250,
            fontFamily: FONT,
            fill: titleColor,
        });

        const title = new Text(titleText, textStyle);
        title.anchor.set(0.5);
        title.position.set(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 4);


        this.addChild(this.backgroundContainer);
        this.addChild(pen);
        this.addChild(titleBackground);
        this.addChild(title);
    }

    private spawnBackgroundBalls(result: ("win" | "lose")): void {

        const sprite = (result == "win") ? "player" : "enemy";
        const newEnemy = new Enemy(sprite, 0.8);

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


        this.backgroundBalls.push(newEnemy);
        this.backgroundContainer.addChild(newEnemy);
    }


    public override update(deltaTime: number): void {
        const deltaSeconds = deltaTime / 1000;

        this.backgroundBalls.forEach(ball => {
            ball.update(deltaSeconds);
        });
    }
}