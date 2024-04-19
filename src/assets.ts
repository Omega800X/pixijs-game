import { Assets, AssetsManifest } from "pixi.js";

export const manifest : AssetsManifest = {
    bundles: [
        {
            name: "assets",
            assets:
            {
                "Player" : "./Player.png",
                "Enemy" : "./Enemy.png",
                "SpawnFloor" : "./SpawnFloor.png",
                "AbstractGroovy" : "./AbstractGroovy.ttf"
            }
        },
    ]
}

export async function initialize_assets() {
	// Assets.init must only happen once!
	// Pack all your bundles into one manifest!
	await Assets.init({ manifest: manifest });

	// Load the bundles you need
	await Assets.loadBundle("assets");
}