export interface Observer {
  update(shapeId: number): void;
}

export interface Subscriber {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}
