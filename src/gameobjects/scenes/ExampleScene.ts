import {Camera, Color, GameObject, TextRenderBehavior, Vector3} from "sprunk-engine";
import {GizmoGameObject} from "../GizmoGameObject.ts";
import {GridRenderBehavior} from "../../behaviors/debug/GridRenderBehavior.ts";
import {FreeLookCameraController} from "../../behaviors/camera/FreeLookCameraController.ts";
import {FreeLookCameraKeyboardMouseInput} from "../../behaviors/camera/FreeLookCameraKeyboardMouseInput.ts";

export class ExampleScene extends GameObject{
    protected onEnable() {
        super.onEnable();

        /* --- Camera --- */
        const cameraGo = new GameObject("Camera");
        this.addChild(cameraGo);
        cameraGo.addBehavior(new Camera());
        cameraGo.transform.position.set(0, 1, 10);

        //You can add any behaviors that you want to any game object
        //For example, a free look camera controller
        cameraGo.addBehavior(new FreeLookCameraController());
        //Because the camera controller is a logic behavior, it needs to receive input
        //For example, a keyboard and mouse input (this enforces separation of concerns)
        cameraGo.addBehavior(new FreeLookCameraKeyboardMouseInput());

        /* --- Text example --- */
        const textGo = new GameObject();
        this.addChild(textGo);

        //You can directly customize a game object's behavior
        const textRenderBehavior = new TextRenderBehavior("assets/fonts/Sprunthrax/Sprunthrax-SemiBold-msdf.json", { centered: true, pixelScale: 1/128, color: [0, 1, 0.3, 1] });
        textGo.addBehavior(textRenderBehavior);
        textRenderBehavior.text = "This is rendered with Sprunk!";
        textGo.transform.position.y = 2;
        textGo.transform.rotation.rotateAroundAxis(Vector3.up(), Math.PI / 8);

        //You can also attach a gameobject to another gameobject
        const textGo2 = new GameObject();
        textGo.addChild(textGo2);
        //This will make the textGo2's position relative to textGo
        textGo2.transform.position.y = -1;

        const textRenderBehavior2 = new TextRenderBehavior("assets/fonts/Sprunthrax/Sprunthrax-SemiBold-msdf.json", { centered: true, pixelScale: 1/32, color: [0, 0, 0, 0.3] });
        textGo2.addBehavior(textRenderBehavior2);
        textRenderBehavior2.text = "Indeed!";

        /* --- 3D Model example --- */
        //If a particular game object is going to be reused or is too complex,
        //you can create a class for it that extends GameObject (like a prefab)
        //this is used to glue frequent components combinations together (and wire them up)
        //go see how GizmoGameObject is implemented!
        const gizmoGameObject = new GizmoGameObject("World 0,0,0");
        this.addChild(gizmoGameObject);

        /* --- Custom behavior example --- */
        const gridGameObject = new GameObject("Grid");
        this.addChild(gridGameObject);
        gridGameObject.addBehavior(new GridRenderBehavior(100, 1, Color.fromHex("#999")));
        gridGameObject.transform.rotation.setFromEulerAngles(Math.PI / 2, 0, 0);

        /* --- Scene additional text --- */
        const go3 = this.createSmapleSceneText(new Color(0, 0, 0, 0.7), 1/256, "Try to move the camera with WASD and look around with the mouse!", this);
        go3.transform.position.y = 3;
        const go4 = this.createSmapleSceneText(new Color(0, 0, 0, 1), 1/2028, "Look at src/main.ts and src/gameobjects/scenes/HighwayScene.ts to start!", cameraGo);
        go4.transform.position.set(0, -0.4, -1);
    }

    private createSmapleSceneText(color: Color, pixelScale : number, text : string, parent : GameObject) : GameObject{
        const textGo = new GameObject("Text");
        parent.addChild(textGo);

        const colorArray : [number, number, number, number] = [color.r, color.g, color.b, color.a];
        const textRenderBehavior3 = new TextRenderBehavior("assets/fonts/Sprunthrax/Sprunthrax-SemiBold-msdf.json", { centered: true, pixelScale: pixelScale, color:colorArray });
        textGo.addBehavior(textRenderBehavior3);
        textRenderBehavior3.text = text;

        return textGo;
    }
}