import { Point } from "./Point";
import { ShapeModel, ShapeValidator } from "./Shape";

export class PyramidFabric {
  static create(coordinates: Point[], apex: Point) {
    return new PyramidModel(coordinates, apex);
  }
}

export class PyramidModel extends ShapeModel {
  apex: Point;

  constructor(coordinates: Point[], apex: Point) {
    super(coordinates);
    this.apex = apex;
  }
}

export class PyramidValidator extends ShapeValidator {
  declare shape: PyramidModel;
  constructor(shape: PyramidModel) {
    super(shape);
  }

  getHeight(): number {
    const zValues = this.shape.coordinates.map((p) => p.z);
    const minZ = Math.min(...zValues);
    return Math.abs(this.shape.apex.z - minZ);
  }

  getBaseArea() {
    let area = 0;
    const coordinates = this.shape.coordinates;
    const n = coordinates.length;

    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      area +=
        coordinates[i].x * coordinates[j].y -
        coordinates[j].x * coordinates[i].y;
    }

    return Math.abs(area) / 2;
  }

  getVoulume(): number {
    const baseArea = this.getBaseArea();
    const height = this.getHeight();
    return (1 / 3) * baseArea * height;
  }

  checkIsCorrectShape(): void {
    const zValues = this.shape.coordinates.map((el) => el.z);
    if (zValues.find((el) => el === this.shape.apex.z)) {
      throw new Error("This is not Pyramid");
    }
  }

  isBaseOnCoordinatePlane() {
    const z = this.shape.coordinates.reduce((acc, val) => {
      return acc + val.z;
    }, 0);

    if (z > 0 || z < 0) {
      return false;
    }

    return true;
  }

  volumeRatio(plane: string) {
    const planeAxes = { xy: "z", xz: "y", yz: "x" };
    if (!planeAxes[plane]) throw new Error("Incorrect coordinate plane");

    const height = this.getHeight();
    const apexCoord = this.shape.apex[planeAxes[plane]];
    if (apexCoord === 0)
      return "The pyramid is cut at the top, there is no relationship";

    const topVolume =
      (1 / 3) * this.getBaseArea() * (height - this.shape.apex.z);

    const bottomVolume = this.getVoulume() - topVolume;

    return topVolume / bottomVolume;
  }
}
