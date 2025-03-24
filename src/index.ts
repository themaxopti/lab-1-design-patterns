import { PyramidFabric, PyramidValidator } from "./Pyramid";
import { Point } from "./Point";
import { ElipseValidator, EllipseFabric } from "./Ellipse";
import { getElipseData, getPyramidData } from "./utils";

async function bootstrap() {
  try {
    const pyramidData = await getPyramidData();
    const elipseData = await getElipseData();
    const apex = new Point(0, 0, 2);

    const pyramid = PyramidFabric.create(pyramidData, apex);
    const pyramidValidator = new PyramidValidator(pyramid);

    const elipse = EllipseFabric.create(elipseData);
    const elipseValidator = new ElipseValidator(elipse);

    console.log("=== Pyramid ===");
    pyramidValidator.checkIsCorrectShape();
    console.log(pyramidValidator.getVoulume(), "Volume");
    console.log(pyramidValidator.isBaseOnCoordinatePlane(), "Is on plane");
    console.log(pyramidValidator.volumeRatio("xy"), "ratio");
    console.log("=== ====");

    console.log("=== Ellipse ===");
    console.log(elipseValidator.getArea(), "Area");
    console.log(elipseValidator.getPerimeter(), "Perimeter");
    console.log(elipseValidator.isCircle(), "IsCircle");
    console.log(elipseValidator.isOval(), "IsOval");
    console.log(
      elipseValidator.intersectsOnlyOneAxis(),
      "intersectsOnlyOneAxis"
    );
    console.log("=== ===");
  } catch (e) {
    console.log(e);
  }
}

bootstrap();