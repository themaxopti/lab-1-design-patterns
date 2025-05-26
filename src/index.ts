import { PyramidFabric } from "./Pyramid";
import { EllipseFabric } from "./Ellipse";
import { ShapeRepoContext, ShapeRepository } from "./store/repo/Reopsitory";
import { Warehouse } from "./store/repo/WhareHouse";

async function bootstrap() {
  try {
    // const elipse = EllipseFabric.create([{x:1,y:1,z:2}]);
    // const elipse2 = EllipseFabric.create([{x:1,y:1,z:2}]);
    // const elipse3 = EllipseFabric.create([{x:1,y:1,z:2}]);
    // console.log(ShapeRepository.getAll());
    // const pyramidData = await getPyramidData();
    // const elipseData = await getElipseData();
    // const apex = new Point(0, 0, 2);
    // const pyramid = PyramidFabric.create(pyramidData, apex);
    // const pyramidValidator = new PyramidValidator(pyramid);
    // const elipse = EllipseFabric.create(elipseData);
    // const elipseValidator = new ElipseValidator(elipse);
    // console.log("=== Pyramid ===");
    // pyramidValidator.checkIsCorrectShape();
    // console.log(pyramidValidator.getVoulume(), "Volume");
    // console.log(pyramidValidator.isBaseOnCoordinatePlane(), "Is on plane");
    // console.log(pyramidValidator.volumeRatio("xy"), "ratio");
    // console.log("=== ====");
    // console.log("=== Ellipse ===");
    // console.log(elipseValidator.getArea(), "Area");
    // console.log(elipseValidator.getPerimeter(), "Perimeter");
    // console.log(elipseValidator.isCircle(), "IsCircle");
    // console.log(elipseValidator.isOval(), "IsOval");
    // console.log(
    //   elipseValidator.intersectsOnlyOneAxis(),
    //   "intersectsOnlyOneAxis"
    // );
    // console.log("=== ===");
  } catch (e) {
    console.log(e);
  }
}

export class App {
  repo: ShapeRepository;
  constructor(repo: ShapeRepository) {
    this.repo = repo;
    ShapeRepoContext.set(repo);
  }

  getRepo() {
    console.log(this.repo);
  }
}

Warehouse.getInstance();
const shapeRepo = new ShapeRepository();
const app = new App(shapeRepo);
const elipse4 = EllipseFabric.create([
  { x: 1, y: 1, z: 0 },
  { x: 3, y: 2, z: 0 },
]);

EllipseFabric.create([
  { x: 1, y: 1, z: 0 },
  { x: 3, y: 2, z: 0 },
]);

PyramidFabric.create(
  [
    { x: 0, y: 0, z: -1 },
    { x: 0, y: 1, z: -1 },
    { x: 2, y: 2, z: -1 },
    { x: 0, y: 2, z: -1 },
  ],
  { x: 0, y: 0, z: 2 }
);

elipse4.coordinates = [
  { x: 1, y: 1, z: 0 },
  { x: 6, y: 2, z: 0 },
];

console.log(app.repo.findByType("elipse"));
