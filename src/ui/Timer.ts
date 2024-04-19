import { Container, Text, TextStyle } from "pixi.js";
import { Tween } from "tweedle.js";
import { FONT } from "../utils/constants";

export class Timer extends Container {

    private visibleText : Text;
    private counter : number;

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
            .repeat(time)
            .onRepeat(this.update.bind(this))
            .start();
        this.addChild(this.visibleText);
    }

    private decrement() : void {
        this.counter--;
    }

    private update() : void {
        this.decrement();
        this.visibleText.text = this.counter;
    }

    public getCounter() : number {
        return this.counter;
    }
}