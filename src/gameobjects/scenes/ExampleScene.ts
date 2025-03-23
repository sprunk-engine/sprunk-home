import {Camera, Color, GameObject, MeshRenderBehavior, ObjLoader, TextRenderBehavior, Vector3} from "sprunk-engine";
import {GridRenderBehavior} from "../../behaviors/debug/GridRenderBehavior.ts";
import {FreeLookCameraController} from "../../behaviors/camera/FreeLookCameraController.ts";
import {FreeLookCameraKeyboardMouseInput} from "../../behaviors/camera/FreeLookCameraKeyboardMouseInput.ts";
import BasicVertexMVPWithUV from "../../shaders/BasicVertexMVPWithUVAndNormals.vert.wgsl?raw";
import BasicTextureSample from "../../shaders/BasicTextureSample-OpenGL-Like.frag.wgsl?raw";
import {RotatingOutputBehavior} from "../../behaviors/RotatingOutputBehavior.ts";

export class ExampleScene extends GameObject{
    protected onEnable() {
        super.onEnable();

        /* --- Camera --- */
        const cameraGo = new GameObject("Camera");
        this.addChild(cameraGo);
        cameraGo.addBehavior(new Camera());
        cameraGo.transform.position.set(0, 0, 10);

        /* --- Text example --- */
        const textGo = new GameObject();
        this.addChild(textGo);

        //You can directly customize a game object's behavior
        const textRenderBehavior = new TextRenderBehavior("assets/fonts/Sprunthrax/Sprunthrax-SemiBold-msdf.json", { centered: true, pixelScale: 1/250, color: [0.5, 0.3, 1, 0.5] });
        textGo.addBehavior(textRenderBehavior);
        textRenderBehavior.text = "Rendered in real-time with Sprunk Engine!";
        textGo.transform.position.y = 2.5;
        textGo.transform.scale.y = 4;
        textGo.transform.rotation.rotateAroundAxis(Vector3.right(), -Math.PI / 4);

        /* --- 3D Model example --- */
        const earth = new GameObject("Earth");
        this.addChild(earth);
        earth.transform.scale.set(2, 2, 2);
        earth.transform.rotation.rotateAroundAxis(Vector3.up(), -Math.PI / 1.5);
        earth.addBehavior(new RotatingOutputBehavior(Vector3.up(), 0.5));

        const moon = new GameObject("Moon");
        earth.addChild(moon);
        moon.transform.position.z = -2;
        moon.transform.scale.set(0.5, 0.5, 0.5);
        moon.addBehavior(new RotatingOutputBehavior(Vector3.up(), 0.5));

        ObjLoader.load("/assets/models/earth.obj").then((obj) => {
            //Then, add a behavior to render the 3d model
            earth.addBehavior(
                //The MeshRenderBehavior is a behavior that renders a 3d model.
                //It requires a 3d model, a texture to render and some vertex and fragment shaders
                //Don't panic! Some general shaders are already provided in the 'shaders' folder
                new MeshRenderBehavior(
                    obj,
                    "/assets/models/earth.jpg",
                    BasicVertexMVPWithUV,
                    BasicTextureSample,
                ),
            )
            moon.addBehavior(
                new MeshRenderBehavior(
                    obj,
                    "/assets/models/moon.jpg",
                    BasicVertexMVPWithUV,
                    BasicTextureSample,
                ),
            )
        })
    }
}