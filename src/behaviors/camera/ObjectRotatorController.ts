import { LogicBehavior, Vector2, Vector3 } from "sprunk-engine";

/**
 * A logic behavior that controls the rotation of an object using Euler angles.
 */
export class ObjectRotatorController extends LogicBehavior<void> {
    private _rotationSensitivity: Vector2;
    private _targetRotation: Vector3 = Vector3.zero();

    /**
     * Constructor for the ObjectRotatorController.
     * @param rotationSensitivity - A Vector2 where x is the yaw sensitivity and y is the pitch sensitivity.
     */
    constructor(rotationSensitivity: Vector2 = new Vector2(0.001, 0.001)) {
        super();
        this._rotationSensitivity = rotationSensitivity;
    }

    /**
     * Rotate the object based on the given delta (pitch and yaw).
     * @param delta - The change in mouse movement (x and y).
     */
    public rotate(delta: Vector2): void {
        const transform = this.gameObject.transform;

        // Update the target rotation based on the mouse delta and sensitivity
        this._targetRotation.x += delta.y * this._rotationSensitivity.y; // Pitch (Y-axis)
        this._targetRotation.y += delta.x * this._rotationSensitivity.x; // Yaw (X-axis)

        // Clamp the pitch to avoid flipping
        this._targetRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this._targetRotation.x));

        // Convert the Euler angles to a quaternion and apply it to the object's rotation
        transform.rotation.setFromVectorEulerAngles(this._targetRotation);
    }
}