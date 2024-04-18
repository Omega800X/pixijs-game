import { TitleScreenScene } from "./scenes/TitleScreenScene";
import { SceneManager } from "./utils/SceneManager";

SceneManager.initialize();
SceneManager.changeScene(new TitleScreenScene());