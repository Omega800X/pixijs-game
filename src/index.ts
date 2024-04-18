import { Application, Sprite } from 'pixi.js'
import { BACKGROUND_COLOR, SCREEN_HEIGHT, SCREEN_WIDTH } from './utils/constants';

const app = new Application<HTMLCanvasElement>({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: BACKGROUND_COLOR,
	width: SCREEN_WIDTH,
	height: SCREEN_HEIGHT
});

const clampy: Sprite = Sprite.from("clampy.png");

clampy.anchor.set(0.5);

clampy.x = app.screen.width / 2;
clampy.y = app.screen.height / 2;

app.stage.addChild(clampy);