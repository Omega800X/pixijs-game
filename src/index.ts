import { initialize_assets } from "./assets";
import { GameScene } from "./scenes/GameScene";
import { SceneManager } from "./utils/SceneManager";

SceneManager.initialize();

initialize_assets().then(() => {
	SceneManager.changeScene(new GameScene());
});