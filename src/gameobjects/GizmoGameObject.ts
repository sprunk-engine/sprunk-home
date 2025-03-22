import {GameObject, MeshRenderBehavior, ObjLoader} from "sprunk-engine";
import BasicVertexMVPWithUV from "../shaders/BasicVertexMVPWithUVAndNormals.vert.wgsl?raw";
import BasicTextureSample from "../shaders/BasicTextureSample-OpenGL-Like.frag.wgsl?raw";

/**
 * A GameObject that represents a 3d gizmo.
 */
export class GizmoGameObject extends GameObject{
    //The constructor can be overridden to pass parameters / configuration to a game object
    //But remember! The constructor is not the place to add behaviors or children to the game object
    //The 'onEnable' serves that purpose! Children and behaviors should be added when the game object is attached in the hierarchy!
    protected onEnable() {
        super.onEnable();
        //First, load the 3d model
        ObjLoader.load("/assets/models/gizmo.obj").then((obj) => {
            //Then, add a behavior to render the 3d model
            this.addBehavior(
                //The MeshRenderBehavior is a behavior that renders a 3d model.
                //It requires a 3d model, a texture to render and some vertex and fragment shaders
                //Don't panic! Some general shaders are already provided in the 'shaders' folder
                new MeshRenderBehavior(
                    obj,
                    "/assets/models/gizmo.png",
                    BasicVertexMVPWithUV,
                    BasicTextureSample,
                ),
            )
        });
    }
}