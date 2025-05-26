import { ShapeModel } from "../../Shape";
import { ShapeRepoContext, ShapeRepository } from "../repo/Reopsitory";
import { Warehouse } from "../repo/WhareHouse";

// export function RegisterShape<T extends new (...args: any[]) => ShapeModel>(
//   constructor: T
// ) {
//   return class extends constructor {
//     constructor(...args: any[]) {
//       super(...args);
//       ShapeRepository.add(this);
//     }
//   };
// }


export function RegisterShape<T extends new (...args: any[]) => ShapeModel>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        ShapeRepoContext.get().add(this);
        Warehouse.getInstance().addShapeInstance(this);
        this.notify(); 
      }
    };
  }