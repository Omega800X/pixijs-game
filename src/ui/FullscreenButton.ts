import { Container, Sprite } from "pixi.js";
import { IS_TAURI } from "../utils/constants";
import { appWindow } from "@tauri-apps/api/window";

export class FullscreenButton extends Container {

    constructor() {
        super();
        const sprite = Sprite.from("ToggleFullscreen");
        sprite.anchor.set(0.5);
        this.eventMode = "static";
        this.on("mouseup", this.toggleFullscreen, this);

        this.addChild(sprite);

    }

    private async toggleFullscreen() {

        if(IS_TAURI) {
            const isFull = await appWindow.isFullscreen();
            await appWindow.setFullscreen(!isFull);
        }
        

    }
}