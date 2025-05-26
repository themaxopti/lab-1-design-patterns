import { shapeComparator } from "../../Comparator";
import { EllipseModel } from "../../Ellipse";
import { Point } from "../../Point";
import { PyramidModel } from "../../Pyramid";
import { ShapeModel } from "../../Shape";

export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

export class ShapeRepository {
  shapes: ShapeModel[] = [];

  add(shape: ShapeModel) {
    shape.id = this.shapes.length;
    this.shapes.push(shape);
  }

  getAll(): ShapeModel[] {
    return [...this.shapes];
  }

  removeById(id: number) {
    this.shapes = this.shapes.filter((shape) => {
      return shape.id !== id;
    });
  }

  findInFirstQuadrant() {
    return this.getAll().filter((shape) =>
      shape.coordinates.every((point) => point.x > 0 && point.y > 0)
    );
  }

  findByCoordinates(coordinates: Point[]) {
    function coordinatesMatch(a: Point[], b: Point[]): boolean {
      if (a.length !== b.length) return false;

      return a.every((pointA, index) => {
        const pointB = b[index];
        return (
          pointA.x === pointB.x &&
          pointA.y === pointB.y &&
          pointA.z === pointB.z
        );
      });
    }

    return this.getAll().filter((shape) =>
      coordinatesMatch(shape.coordinates, coordinates)
    );
  }

  sortById(order: "+" | "-") {
    return this.getAll().sort((a, b) =>
      shapeComparator.compareById(a, b, order)
    );
  }

  findByType(type: "pyramid" | "elipse") {
    if (type === "pyramid") {
      return this.getAll().filter((el) => {
        return el instanceof PyramidModel;
      });
    }
    if (type === "elipse") {
      return this.getAll().filter((el) => {
        return el instanceof EllipseModel;
      });
    }
  }
}

let currentRepo: ShapeRepository | null = null;

export const ShapeRepoContext = {
  set(repo: ShapeRepository) {
    currentRepo = repo;
  },
  get(): ShapeRepository {
    if (!currentRepo) throw new Error("Shape repository is not set");
    return currentRepo;
  },
};
