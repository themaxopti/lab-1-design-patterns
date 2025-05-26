import { Point } from "./Point";
import { Observer } from "./store/repo/Observer";

export class ShapeModel {
  id: number | null = null;
  _coordinates: Point[];
  private observers: Observer[] = [];

  constructor(coordinates: Point[]) {
    this._coordinates = [...coordinates];
  }

  get coordinates(): Point[] {
    return this._coordinates;
  }

  set coordinates(newCoordinates: Point[]) {
    this._coordinates = [...newCoordinates];
    this.notify();
  }

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unSubscribe(observer: Observer): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notify(): void {
    for (const o of this.observers) {
      o.update(this.id);
    }
  }

  getValidator(): ShapeValidator {
    throw new Error("You need to change this function");
  }

  setCoordinates(coordinates: Point[]){
    this._coordinates = [...coordinates];
    this.notify()
  }
}

export class ShapeValidator {
  shape: ShapeModel;
  constructor(shape: ShapeModel) {
    this.shape = shape;
  }

  getVoulume() {
    throw new Error("This figure does not have volume");
  }

  checkIsCorrectShape() {
    throw new Error("You need to change this function");
  }

  getArea(): number {
    throw new Error("You need to change this function");
  }

  getPerimeter(): number {
    throw new Error("You need to change this function");
  }
}
