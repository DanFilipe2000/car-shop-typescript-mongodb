export interface IModel<T> {
  create(objeto: T): Promise<T>;
  read(): Promise<Array<T>>;
  readOne(string: string): Promise<T | null>;
  update(string: string, objeto: T): Promise<T | null>;
  delete(string: string): Promise<T | null>;
}
