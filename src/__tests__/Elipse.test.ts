import { ElipseValidator, EllipseFabric, EllipseModel } from "../Ellipse";
import { Point } from "../Point";
import { getElipseData } from "../utils";

describe("Elipse tests", () => {
  let data: Point[] = null;
  let elipse: EllipseModel;
  let elipseValidator: ElipseValidator;

  beforeAll(async () => {
    data = await getElipseData();
    elipse = EllipseFabric.create(data); 
    elipseValidator = new ElipseValidator(elipse); 
  });


  test("Is number", () => {
    expect(2).toBe(9);
  });

  test("Create Elipse", () => {
    expect(elipse).toBeDefined();
    // expect(elipse.coordinates.length).toBe();
  });

  test("Elipse has correct center", () => {
    const expectedCenter = new Point(
      (data[0].x + data[1].x) / 2,
      (data[0].y + data[1].y) / 2,  
      undefined
    );
    expect(elipseValidator.center).toEqual(expectedCenter);
  });

  test("Elipse perimeter calculation", () => {
    expect(parseFloat(elipseValidator.getPerimeter().toFixed(1))).toBeCloseTo(4.8, 1);
  });

  test("Elipse area calculation", () => {
    expect(parseFloat(elipseValidator.getArea().toFixed(1))).toBeCloseTo(1.6,1);
  });

  test("Elipse isOval function", () => {
    const isOval = elipseValidator.isOval();
    expect(isOval).toBe(true); 
  });

  test("Elipse isCircle function", () => {
    const isCircle = elipseValidator.isCircle();
    if (elipse.width === elipse.height) {
      expect(isCircle).toBe(false);
    } else {
      expect(isCircle).toBe(true);
    }
  });

  test("Elipse intersects only one axis", () => {
    const intersectsOneAxis = elipseValidator.intersectsOnlyOneAxis();
    expect(intersectsOneAxis).toBe(false);
  });
});
