export function Entity(model: any) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      model = model;
    };
  };
}
