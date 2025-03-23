import {OutputBehavior, Vector3} from "sprunk-engine";

/**
 * RotatingOutputBehavior is a behavior that rotates the object around an axis at a constant speed
 */
export class RotatingOutputBehavior extends OutputBehavior{
    private _axis: Vector3;
    private _speed: number;

    constructor(axis: Vector3, speed: number) {
        super();
        this._axis = axis;
        this._speed = speed;
    }

    tick(_deltaTime: number) {
        super.tick(_deltaTime);
        this.transform.rotation.rotateAroundAxis(this._axis, this._speed * _deltaTime);
    }
}