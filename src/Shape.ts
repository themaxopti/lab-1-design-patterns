import { Point } from "./Point";

export class ShapeModel {
  id: string;
  coordinates: Point[];

  constructor(coordinates: Point[]) {
    this.coordinates = [...coordinates];
    this.id = "id";
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
}
