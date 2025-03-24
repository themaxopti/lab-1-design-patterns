import fs from "fs";
import path from "path";
import { Point } from "./Point";
import { regex } from "./const";

export function validateLine(line) {
  return regex.test(line);
}

export async function getElipseData(): Promise<Point[]> {
  const filePath = path.resolve(__dirname, "../public/Ellipse.txt");

  const data = await fs.promises.readFile(filePath, "utf8");

  const points = data
    .split("\n")
    .map((line) => {
      if (validateLine(line)) {
        const coords = line.split(" ").map((coord) => parseFloat(coord.trim()));
        return { x: coords[0], y: coords[1], z: coords[2] };
      }
      return null;
    })
    .filter((point) => point !== null);

  return points;
}

export async function getPyramidData(): Promise<Point[]> {
  const filePath = path.resolve(__dirname, "../public/Pyramid.txt");

  const data = await fs.promises.readFile(filePath, "utf8");

  const points = data
    .split("\n")
    .map((line) => {
      if (validateLine(line)) {
        const coords = line.split(" ").map((coord) => parseFloat(coord.trim()));
        return { x: coords[0], y: coords[1], z: coords[2] };
      }
      return null;
    })
    .filter((point) => point !== null);

  return points;
}
