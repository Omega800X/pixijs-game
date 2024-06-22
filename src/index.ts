import { initialize_assets } from "./assets";
import { GameScene } from "./scenes/GameScene";
import { GameManager } from "./utils/GameManager";

GameManager.initialize();

initialize_assets().then(() => {
	GameManager.changeScene(new GameScene());
});