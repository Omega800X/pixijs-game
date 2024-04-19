import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { FONT } from "../utils/constants";
import { Tween } from "tweedle.js";

export class Button extends Container {
    private callback : Function;
    private highlight : Graphics = new Graphics();

    constructor(buttonText : string, buttonColor : number, highlightColor : number, callback : Function) {
        super();

        this.callback = callback;

        const buttonBG = new Graphics();

        buttonBG.lineStyle(5, 0x000000, 1, 1);
        buttonBG.beginFill(buttonColor);
        buttonBG.drawRect(0, 0, 500, 100);
        buttonBG.endFill();

        this.highlight.beginFill(highlightColor);
        this.highlight.drawRect(0, 0, 500, 100);
        this.highlight.endFill();
        this.highlight.alpha = 0;
        this.highlight.width = 0;

        const textStyle = new TextStyle({
            fontSize: 60,
            fontFamily: FONT,
        });

        const text = new Text(buttonText, textStyle);
        text.anchor.set(0.5);
        text.position.set(buttonBG.x + buttonBG.width/2, buttonBG.y + buttonBG.height/2);

        this.eventMode = "static";
        this.on("mouseup", this.onMouseUp, this);
        this.on("mouseover", this.onMouseOver, this);
        this.on("mouseout", this.onMouseOut, this);

        this.addChild(buttonBG);
        this.addChild(this.highlight);
        this.addChild(text);
    }

    private onMouseUp() : void {
        this.callback();
    }

    private onMouseOver() : void {
        new Tween(this.highlight).to({alpha: 1, width:500}, 250).start();
    }

    private onMouseOut() : void {
        new Tween(this.highlight).to({alpha: 0, width:0}, 250).start();
    }
}