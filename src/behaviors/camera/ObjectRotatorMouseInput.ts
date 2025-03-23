import { DeviceInputBehavior, Vector2 } from "sprunk-engine";
import { ObjectRotatorController } from "./ObjectRotatorController.ts";

/**
 * A logic behavior that controls the rotation of an object with mouse input.
 */
export class ObjectRotatorMouseInput extends DeviceInputBehavior {
    private _rotator: ObjectRotatorController | null = null;

    protected override onEnable() {
        super.onEnable();
        this._rotator = this.getLogicBehavior(ObjectRotatorController)!;
    }

    public override onMouseMove({ delta }: { delta: Vector2 }): void {
        if (!this._rotator) return;
        this._rotator.rotate(delta);
    }
}