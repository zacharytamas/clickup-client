export interface EntityRef<TEntity> {
  get(): Promise<TEntity>;

  [x: string | number | symbol]: unknown;
}
