import { initialize_assets } from "./assets";
import { TitleScreenScene } from "./scenes/TitleScreenScene";
import { SceneManager } from "./utils/SceneManager";

SceneManager.initialize();

SceneManager.addLoadingScreen();

initialize_assets().then(() => {
	SceneManager.removeLoadingScreen();
	SceneManager.changeScene(new TitleScreenScene());
});