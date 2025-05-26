import { App } from "..";
import { ElipseValidator, EllipseFabric, EllipseModel } from "../Ellipse";
import { Point } from "../Point";
import { ShapeRepository } from "../store/repo/Reopsitory";
import { getElipseData } from "../utils";

describe("Repository tests", () => {
  let app: App;

  beforeAll(async () => {
    const shapeRepo = new ShapeRepository();
    app = new App(shapeRepo);
  });

  test("Create Elipse", () => {
    EllipseFabric.create([
      { x: 1, y: 1, z: 0 },
      { x: 3, y: 2, z: 0 },
    ]);

    expect(elipse).toBeDefined();
    expect(elipse.coordinates.length).toBeGreaterThan(1);
  });
});
