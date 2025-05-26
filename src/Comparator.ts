import { ShapeModel } from "./Shape";

export interface Comparator<T> {
  compareById(a: T, b: T, order: "+" | "-"): number;
  compareByFirstCoordinate(a: T, b: T): number;
  compareByFirstXCoordinate(a: T, b: T): number;
  compareByFirstYCoordinate(a: T, b: T): number;
}

export class ShapeComparator implements Comparator<ShapeModel> {
  compareById(a: ShapeModel, b: ShapeModel, order: "+" | "-"): number {
    if (order === "+") {
      return (a.id ?? 0) - (b.id ?? 0);
    } else {
      return (b.id ?? 0) - (a.id ?? 0);
    }
  }

  compareByFirstCoordinate(a: ShapeModel, b: ShapeModel): number {
    const aCoord = a.coordinates[0];
    const bCoord = b.coordinates[0];
    const aSum = aCoord.x + aCoord.y + (aCoord.z ?? 0);
    const bSum = bCoord.x + bCoord.y + (bCoord.z ?? 0);
    return aSum - bSum;
  }

  compareByFirstXCoordinate(a: ShapeModel, b: ShapeModel): number {
    return a.coordinates[0].x - b.coordinates[0].x;
  }

  compareByFirstYCoordinate(a: ShapeModel, b: ShapeModel): number {
    return a.coordinates[0].y - b.coordinates[0].y;
  }
}

export const shapeComparator = new ShapeComparator();
