import { Container } from "pixi.js";
import { IS_TAURI, SCREEN_WIDTH } from "../utils/constants";
import { FullscreenButton } from "../ui/FullscreenButton";
import { ToggleButton } from "./ToggleButton";
import { sound } from "@pixi/sound";

export class HUD extends Container {

    constructor() {
        super();

        const toggleSoundButton = new ToggleButton("SoundOn", "SoundOff", this.toggleMute);
        toggleSoundButton.position.set(SCREEN_WIDTH - 32, 35);

        this.addChild(toggleSoundButton);

        if(IS_TAURI) {
            const fullscreenButton = new FullscreenButton();
            fullscreenButton.position.set(SCREEN_WIDTH - 32, 90);
            this.addChild(fullscreenButton);
        }
        
    }

    private toggleMute() {
        sound.toggleMuteAll();
    }
}