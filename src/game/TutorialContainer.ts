import { Container, Text, TextStyle } from "pixi.js";
import { FONT, SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/constants";

export class TutorialContainer extends Container {

    constructor() {
        super();

        const textStyle = new TextStyle({
            fontSize: 40,
            fontFamily: FONT,
        });

        const controls = new Text("WASD/Arrow keys to move", textStyle);
        controls.position.set(SCREEN_WIDTH/2, 700);
        controls.anchor.set(0.5);

        const spawnWarning = new Text("Enemies spawn here!", textStyle);
        spawnWarning.anchor.set(0.5);
        spawnWarning.position.set(SCREEN_WIDTH/2, spawnWarning.height);
        
        const spawnWarning2 = new Text("Enemies spawn here!", textStyle);
        spawnWarning2.anchor.set(0.5);
        spawnWarning2.position.set(SCREEN_WIDTH/2, SCREEN_HEIGHT - spawnWarning2.height/2);
        
        const spawnWarning3 = new Text("Enemies spawn here!", textStyle);
        spawnWarning3.anchor.set(0.5);
        spawnWarning3.angle = 90;
        spawnWarning3.position.set(0 + spawnWarning3.height/2, SCREEN_HEIGHT/2);

        const spawnWarning4 = new Text("Enemies spawn here!", textStyle);
        spawnWarning4.anchor.set(0.5);
        spawnWarning4.angle = -90;
        spawnWarning4.position.set(SCREEN_WIDTH - spawnWarning4.height/2, SCREEN_HEIGHT/2);

        this.addChild(controls);
        this.addChild(spawnWarning);
        this.addChild(spawnWarning2);
        this.addChild(spawnWarning3);
        this.addChild(spawnWarning4);
    }
}