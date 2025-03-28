import {Camera, GameObject, MeshRenderBehavior, ObjLoader, TextRenderBehavior, Vector2, Vector3} from "sprunk-engine";
import BasicVertexMVPWithUV from "../../shaders/BasicVertexMVPWithUVAndNormals.vert.wgsl?raw";
import BasicTextureSample from "../../shaders/BasicTextureSample-OpenGL-Like.frag.wgsl?raw";
import {RotatingOutputBehavior} from "../../behaviors/RotatingOutputBehavior.ts";
import {ObjectRotatorController} from "../../behaviors/camera/ObjectRotatorController.ts";
import {ObjectRotatorMouseInput} from "../../behaviors/camera/ObjectRotatorMouseInput.ts";

export class ExampleScene extends GameObject{
    protected onEnable() {
        super.onEnable();

        /* --- Camera --- */
        const orbitGo = new GameObject("Orbit");
        this.addChild(orbitGo);
        orbitGo.addBehavior(new ObjectRotatorController(new Vector2(0.0015, 0)));
        orbitGo.addBehavior(new ObjectRotatorMouseInput());

        const cameraGo = new GameObject("Camera");
        orbitGo.addChild(cameraGo);
        cameraGo.addBehavior(new Camera(Math.PI / 3.5));
        cameraGo.transform.position.set(-4, 0, 10);

        const canvas = document.querySelector("canvas")!;
        //Watch for canvas resize
        const resize = () => {
            cameraGo.transform.position.x = canvas.clientWidth < 992 ? -1 : -4;
        }
        resize();
        window.addEventListener("resize", resize);


        /* --- Text example --- */
        const textGo = new GameObject();
        orbitGo.addChild(textGo);

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

        const stars = new GameObject("Stars");
        this.addChild(stars);
        stars.addBehavior(new RotatingOutputBehavior(Vector3.up(), 0.05));
        ObjLoader.load("/assets/models/stars.obj").then((obj) => {
            stars.addBehavior(
                new MeshRenderBehavior(
                    obj,
                    "/assets/models/stars.png",
                    BasicVertexMVPWithUV,
                    BasicTextureSample,
                    {
                        addressModeU: "repeat",
                        addressModeV: "repeat",
                        magFilter: "linear",
                        minFilter: "linear",
                    }
                ),
            )
        })
    }
}