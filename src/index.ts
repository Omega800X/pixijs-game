import { initialize_assets } from "./assets";
import { TitleScreenScene } from "./scenes/TitleScreenScene";
import { SceneManager } from "./utils/SceneManager";

SceneManager.initialize();

initialize_assets().then(() => {
	SceneManager.changeScene(new TitleScreenScene());
});