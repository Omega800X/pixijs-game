import { AbstractScene } from "./AbstractScene";
import { Player } from "../game/Player";

export class GameScene extends AbstractScene {

    private player: Player;

    constructor() {
        super();

        this.player = new Player("player", 400, 0.8);
        this.player.position.set(500);

        this.addChild(this.player);


    }

    public override update(deltaTime: number): void {
        const deltaSeconds = deltaTime / 1000;
        this.player.update(deltaSeconds);
    }
}