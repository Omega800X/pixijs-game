import { Container, Sprite } from "pixi.js";

export class ToggleButton extends Container {

    private toggledUp : Sprite;
    private toggledDown : Sprite;
    private callback : Function;
    private static STATE : ("UP" | "DOWN") = "UP";

    constructor(toggledUp : string, toggledDown : string, callback : Function) {
        super();
        this.toggledUp = Sprite.from(toggledUp);
        this.toggledUp.anchor.set(0.5);
        this.toggledDown = Sprite.from(toggledDown);
        this.toggledDown.anchor.set(0.5);
        this.callback = callback;

        if(ToggleButton.STATE === "UP") {
            this.toggledDown.visible = false;
        } else {
            this.toggledUp.visible = false;
        }

        this.eventMode = "static";
        this.on("mouseup", this.onToggle, this);
        this.addChild(this.toggledUp);
        this.addChild(this.toggledDown);

    }

    private onToggle() {
        if(ToggleButton.STATE === "UP") {
            ToggleButton.STATE = "DOWN";
            this.toggledUp.visible = false;
            this.toggledDown.visible = true;
        } else {
            ToggleButton.STATE = "UP";
            this.toggledUp.visible = true;
            this.toggledDown.visible = false;
        }
        this.callback();
    }
}