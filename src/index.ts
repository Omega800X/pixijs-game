import { Application } from 'pixi.js'
import { GAME_BACKGROUND_COLOR, GAME_HEIGHT, GAME_WIDTH } from './utils/constants';
import { Keyboard } from './utils/Keyboard';
import { initialize_assets } from './assets';
import { GameScene } from './scenes/GameScene';

const app = new Application<HTMLCanvasElement>({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: GAME_BACKGROUND_COLOR,
	width: GAME_WIDTH,
	height: GAME_HEIGHT
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

initialize_assets().then(() => {
	const currentScene = new GameScene();

	app.stage.addChild(currentScene);
});