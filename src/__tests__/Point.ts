import { Point } from "../Point";

describe("Point tests", () => {
  test("Create point", () => {
    const point = new Point(1, 2, 3);
    expect(point.x).toBe(1);
    expect(point.y).toBe(2);
    expect(point.z).toBe(3);
  });
});
