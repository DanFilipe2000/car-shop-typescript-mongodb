export interface IModel<T> {
  create(objeto: T): Promise<T>;
  read(): Promise<Array<T>>;
  readOne(_id: string): Promise<T | null>;
  update(_id: string, objeto: T): Promise<T | null>;
  delete(_id: string): Promise<T | null>;
}
