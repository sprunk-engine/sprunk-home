import { GameEngineWindow, Sprunk } from "sprunk-engine";
import {ExampleScene} from "./gameobjects/scenes/ExampleScene.ts";

const canvas: HTMLCanvasElement =
    document.querySelector<HTMLCanvasElement>("#app")!;

//This will enable debug features in the engine (like the hierarchy debugger window in the top left corner)
const debug = true;

//GameEngineWindow is the main class that manages the game loop and the game objects
//It is the main entry point for the engine
//You can add components / capabilities to the engine by adding them to the list here
const gameEngineWindow: GameEngineWindow = Sprunk.newGame(canvas, debug, [
    "InputGameEngineComponent",
    "RenderGameEngineComponent",
]);

//Go see what's in ExampleScene.ts !
const startScene = new ExampleScene();
gameEngineWindow.root.addChild(startScene);