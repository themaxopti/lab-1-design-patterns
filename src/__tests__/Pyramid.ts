import { Point } from "../Point";
import { PyramidFabric, PyramidModel, PyramidValidator } from "../Pyramid";
import { getPyramidData } from "../utils";

describe("Pyramid Tests", () => {
  let apex: Point;
  let pyramid: PyramidModel;
  let validator: PyramidValidator;
  let data: Point[];

  beforeEach(async () => {
    data = await getPyramidData();
    apex = new Point(1, 1, 1);

    pyramid = PyramidFabric.create(data, apex);
    validator = new PyramidValidator(pyramid);
  });

  test("should correctly calculate the volume of the pyramid", () => {
    const volume = validator.getVoulume();

    expect(volume).toBe(2);
  });

  test("should correctly calculate the base area of the pyramid", () => {
    const baseArea = validator.getBaseArea();

    expect(baseArea).toBeCloseTo(3, 1);
  });

  test("should correctly calculate the height of the pyramid", () => {
    const height = validator.getHeight();

    expect(height).toBe(2);
  });

  test("should check if the pyramid is correct shape", () => {
    expect(() => validator.checkIsCorrectShape()).not.toThrow();
  });

  test("should check if the base is on the coordinate plane", () => {
    const isBaseOnPlane = validator.isBaseOnCoordinatePlane();
    expect(isBaseOnPlane).toBe(false);
  });

  test("should throw error if the pyramid has an invalid shape", () => {
    const invalidApex = new Point(1, 1, -1);
    const invalidPyramid = PyramidFabric.create(data, invalidApex);
    const invalidValidator = new PyramidValidator(invalidPyramid);

    expect(() => invalidValidator.checkIsCorrectShape()).toThrow(
      "This is not Pyramid"
    );
  });

  test("should return correct volume ratio for the xy plane", () => {
    const ratio = validator.volumeRatio("xy");

    expect(ratio).toBeCloseTo(1, 1);
  });

  test("should throw error for invalid plane when calculating volume ratio", () => {
    expect(() => validator.volumeRatio("invalidPlane")).toThrow(
      "Incorrect coordinate plane"
    );
  });
});
