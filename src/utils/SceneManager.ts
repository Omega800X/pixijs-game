import { Application, Ticker } from "pixi.js";
import { BACKGROUND_COLOR, SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";
import { Keyboard } from "./Keyboard";
import { AbstractScene } from "../scenes/AbstractScene";
import { Group } from "tweedle.js";

export namespace SceneManager {
    let currentScene : AbstractScene;

    let app : Application<HTMLCanvasElement>;

    export function initialize() {

        if(app != undefined) {
            console.error("Don't call initialize twice!");
            return;
        }


        app = new Application<HTMLCanvasElement>({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: BACKGROUND_COLOR,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT
        });

        Keyboard.initialize();

        // code for centering the game on screen
        window.addEventListener("resize", () => {
            const scaleX = window.innerWidth / app.screen.width;
            const scaleY = window.innerHeight / app.screen.height;
            const scale = Math.min(scaleX, scaleY);

            const gameWidth = Math.round(app.screen.width * scale);
            const gameHeight = Math.round(app.screen.height * scale);

            const marginHorizontal = Math.floor((window.innerWidth - gameWidth) / 2);
            const marginVertical = Math.floor((window.innerHeight - gameHeight) / 2);

            app.view.style.width = gameWidth + "px";
            app.view.style.height = gameHeight + "px";

            app.view.style.marginLeft = marginHorizontal + "px";
            app.view.style.marginRight = marginHorizontal + "px";

            app.view.style.marginTop = marginVertical + "px";
            app.view.style.marginBottom = marginVertical + "px";
        });

        // throw a resize event once on game start so the game gets centered
        window.dispatchEvent(new Event("resize"));

        Ticker.shared.add(update);
    }

    export function changeScene(newScene: AbstractScene) {
        // destroy currentScene
        if(currentScene) {
            currentScene.destroy();
        }

        // change to new scene
        currentScene = newScene;

        app.stage.addChild(currentScene);
    }

    function update() {
        Group.shared.update();
        currentScene?.update(Ticker.shared.elapsedMS);
    }

}
