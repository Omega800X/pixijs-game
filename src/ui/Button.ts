import { Container, Graphics, Text, TextStyle } from "pixi.js";

export class Button extends Container {

    private callback : Function;
    private pen2 = new Graphics();

    constructor(buttonText : string, callback : Function) {
        super();

        this.callback = callback;

        const tStyle = new TextStyle({
            fontSize: 80,
            fontFamily: "Minercraftory",
        });

        const text = new Text(buttonText, tStyle);
        text.anchor.set(0.5);

        const pen = new Graphics();
        pen.lineStyle(5, 0x020202, 1, 1);
        pen.beginFill("0xf8e9e9");
        pen.drawRect(
            text.position.x - text.width * 1.3 /2, 
            text.position.y - text.height * 1.3 /2, 
            text.width * 1.3, 
            text.height * 1.3,
        );
        pen.endFill();

        
        this.pen2.beginFill("0x87ff65");
        this.pen2.drawCircle(text.x, text.y, 130);
        this.pen2.endFill();
        this.pen2.visible = false;

        this.addChild(pen);
        this.addChild(this.pen2);
        this.addChild(text);

        this.eventMode = "static";
        this.on("mouseup", this.onMouseUp, this);
        this.on("mouseover", this.onMouseOver, this);
        this.on("mouseout", this.onMouseOut, this);
    }

    private onMouseUp() : void {
        this.callback();
    }

    private onMouseOver() : void {
        this.pen2.visible = true;
    }

    private onMouseOut() : void {
        this.pen2.visible = false;
    }
}