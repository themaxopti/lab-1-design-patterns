import { logger } from "./logger";
import { Point } from "./Point";
import { ShapeModel, ShapeValidator } from "./Shape";

export class EllipseFabric {
  static create(coordinates: Point[]) {
    return new EllipseModel(coordinates);
  }
}

export class EllipseModel extends ShapeModel {
  center: Point;
  width: number;
  height: number;

  constructor(coordinates: Point[]) {
    super(coordinates);
    logger.info(`Created Ellipse`);
  }
}

export class ElipseValidator extends ShapeValidator {
  center: Point;
  width: number;
  height: number;

  constructor(shape: EllipseModel) {
    super(shape);
    this.center = new Point(
      (shape.coordinates[0].x + shape.coordinates[1].x) / 2,
      (shape.coordinates[0].y + shape.coordinates[1].y) / 2
    );
    this.width = Math.abs(shape.coordinates[1].x - shape.coordinates[0].x) / 2; 
    this.height = Math.abs(shape.coordinates[1].y - shape.coordinates[0].y) / 2; 
  }

  getArea() {
    return Math.PI * this.width * this.height;
  }

  getPerimeter() {
    return (
      Math.PI *
      (3 * (this.width + this.height) -
        Math.sqrt(
          (3 * this.width + this.height) * (this.width + 3 * this.height)
        ))
    );
  }

  intersectsOnlyOneAxis() {
    const intersectsX =
      this.center.x >= -this.width && this.center.x <= this.width;
    const intersectsY =
      this.center.y >= -this.height && this.center.y <= this.height;
    return intersectsX !== intersectsY;
  }

  isOval() {
    return this.width !== this.height;
  }

  isCircle() {
    return this.width === this.height;
  }
}
