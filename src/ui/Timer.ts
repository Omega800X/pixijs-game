import { Container, Text, TextStyle } from "pixi.js";
import { Tween } from "tweedle.js";
import { FONT } from "../utils/constants";

export class Timer extends Container {

    private visibleText: Text;
    private counter: number;

    constructor() {
        super();

        const textStyle = new TextStyle({
            fontSize: 300,
            fontFamily: FONT,
        });

        this.counter = 0;
        this.visibleText = new Text(this.counter, textStyle)
        this.visibleText.anchor.set(0.5);
        this.visibleText.alpha = 0.75;

        new Tween({ a: 0 })
            .to({ a: 1 }, 1000)
            .repeat(Infinity)
            .onRepeat(this.update.bind(this))
            .start();
        this.addChild(this.visibleText);
    }

    public incrementCounter(increment: number): void {
        this.counter += increment;
    }

    private update(): void {
        this.incrementCounter(1);
        this.visibleText.text = this.counter;
    }

    public getCounter(): number {
        return this.counter;
    }
}