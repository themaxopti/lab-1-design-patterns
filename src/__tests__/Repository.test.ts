import { App } from "..";
import { EllipseFabric, EllipseModel } from "../Ellipse";
import { Point } from "../Point";
import { PyramidFabric, PyramidModel } from "../Pyramid";
import { ShapeRepository } from "../store/repo/Reopsitory";
import { Warehouse } from "../store/repo/WhareHouse";

describe("Repository tests", () => {
  let shapeRepo: ShapeRepository;

  beforeEach(async () => {
    Warehouse.getInstance();
    shapeRepo = new ShapeRepository();
    new App(shapeRepo);
  });

  afterEach(() => {
    Warehouse.getInstance().destroy();
  });

  test("Create Elipse", () => {
    const elipse = EllipseFabric.create([
      { x: 1, y: 1, z: 0 },
      { x: 3, y: 2, z: 0 },
    ]);

    expect(elipse instanceof EllipseModel).toBe(true);
    expect(shapeRepo.shapes.length).toBe(1);
  });

  test("Create Pyramid", () => {
    const pyramid = PyramidFabric.create(
      [
        { x: 0, y: 0, z: -1 },
        { x: 0, y: 1, z: -1 },
        { x: 2, y: 2, z: -1 },
        { x: 0, y: 2, z: -1 },
      ],
      { x: 0, y: 0, z: 2 }
    );

    expect(pyramid instanceof PyramidModel).toBe(true);
    expect(shapeRepo.shapes.length).toBe(1);
  });

  test("should delete figure by id", () => {
    const elipse = EllipseFabric.create([
      { x: 1, y: 1, z: 0 },
      { x: 3, y: 2, z: 0 },
    ]);

    expect(shapeRepo.getAll().length).toBe(1);

    shapeRepo.removeById(elipse.id!);
    expect(shapeRepo.getAll().length).toBe(0);
  });

  test("should find shapes in the first quadrant", () => {
    EllipseFabric.create([
      { x: 1, y: 1, z: 0 },
      { x: 2, y: 2, z: 0 },
    ]);

    EllipseFabric.create([
      { x: -1, y: 1, z: 0 },
      { x: 2, y: 2, z: 0 },
    ]);

    const result = shapeRepo.findInFirstQuadrant();
    expect(result.length).toBe(1);
  });

  test("should find shape by exact coordinates", () => {
    const coords: Point[] = [
      { x: 1, y: 1, z: 0 },
      { x: 2, y: 2, z: 0 },
    ];

    EllipseFabric.create(coords);

    const found = shapeRepo.findByCoordinates(coords);
    expect(found.length).toBe(1);
  });

  test("should sort shapes by id", () => {
    EllipseFabric.create([
      { x: 1, y: 1, z: 0 },
      { x: 2, y: 2, z: 0 },
    ]);
    EllipseFabric.create([
      { x: 3, y: 3, z: 0 },
      { x: 4, y: 4, z: 0 },
    ]);

    const sortedAsc = shapeRepo.sortById("+");
    expect(sortedAsc[0].id).toBeLessThan(sortedAsc[1].id);

    const sortedDesc = shapeRepo.sortById("-");
    expect(sortedDesc[0].id).toBeGreaterThan(sortedDesc[1].id);
  });

  test("should find shapes by type", () => {
    EllipseFabric.create([
      { x: 1, y: 1, z: 0 },
      { x: 2, y: 2, z: 0 },
    ]);

    PyramidFabric.create(
      [
        { x: 0, y: 0, z: -1 },
        { x: 0, y: 1, z: -1 },
        { x: 1, y: 1, z: -1 },
        { x: 1, y: 0, z: -1 },
      ],
      { x: 0.5, y: 0.5, z: 2 }
    );

    const ellipses = shapeRepo.findByType("elipse");
    const pyramids = shapeRepo.findByType("pyramid");

    expect(ellipses?.length).toBe(1);
    expect(pyramids?.length).toBe(1);
  });

  test("Should update warehouse stats when ellipse coordinates change", () => {
    const coords: Point[] = [
      { x: 1, y: 1, z: 0 },
      { x: 2, y: 2, z: 0 },
    ];

    const elipse = EllipseFabric.create(coords);

    const statsPeremeterBefore = Warehouse.getInstance().getStats(
      elipse.id
    ).area;
    expect(statsPeremeterBefore).toBeDefined();

    elipse.coordinates = [
      { x: 1, y: 1, z: 0 },
      { x: 3, y: 2, z: 0 },
    ];

    const statsAfter = Warehouse.getInstance().getStats(elipse.id).area;
    expect(statsAfter).toBeDefined();

    expect(statsAfter).not.toEqual(statsPeremeterBefore);
    expect(statsAfter).not.toEqual(statsPeremeterBefore);
  });
});
