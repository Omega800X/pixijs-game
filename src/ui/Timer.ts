import { Container, Text, TextStyle } from "pixi.js";
import { Tween } from "tweedle.js";
import { FONT } from "../utils/constants";

export class Timer extends Container {

    private visibleText : Text;
    private counter : number;
    private survivedTime : number = 0;

    constructor(time : number) {
        super();

        const textStyle = new TextStyle({
            fontSize: 250,
            fontFamily: FONT,
        });

        this.counter = time;
        this.visibleText = new Text(this.counter, textStyle)
        this.visibleText.anchor.set(0.5);

        new Tween({a: 0})
            .to({a: 1}, 1000)
            .repeat(Infinity)
            .onRepeat(this.update.bind(this))
            .start();
        this.addChild(this.visibleText);
    }

    private decrementCounter() : void {
        this.counter--;
    }

    public incrementCounter(increment : number) : void {
        this.counter += increment;
    }

    private incrementSurvivedTime() : void {
        this.survivedTime++;
    }

    private update() : void {
        this.decrementCounter();
        this.incrementSurvivedTime();
        this.visibleText.text = this.counter;
    }

    public getCounter() : number {
        return this.counter;
    }

    public getSurvivedTime() : number {
        return this.survivedTime;
    }
}