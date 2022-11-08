export default interface IService<T> {
  create(body: T): Promise<T>;
}
