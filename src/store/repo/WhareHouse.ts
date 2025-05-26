import { ShapeModel } from "../../Shape";
import { Observer } from "./Observer";

type ShapeStats = {
  area?: number;
  perimeter?: number;
};

export class Warehouse implements Observer {
  private static instance: Warehouse;
  private storage = new Map<number, ShapeStats>();

  private constructor() {}

  static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  subscribeShape(shape: ShapeModel) {
    shape.subscribe(this);
    this.update(shape.id);
  }

  update(shapeId: number) {
    const shape = this.shapeMap.get(shapeId);
    if (!shape) return;

    const validator = shape.getValidator();

    this.storage.set(shapeId, {
      area: validator.getArea?.(),
      perimeter: validator.getPerimeter?.(),
    });
  }

  getStats(shapeId: number): ShapeStats | undefined {
    return this.storage.get(shapeId);
  }

  private shapeMap = new Map<number, ShapeModel>();

  addShapeInstance(shape: ShapeModel) {
    this.shapeMap.set(shape.id, shape);
    this.subscribeShape(shape);
  }

  destroy() {
    Warehouse.instance = null;
  }
}
