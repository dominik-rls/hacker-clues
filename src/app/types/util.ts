export type Action<T> = (t: T) => void;

export type Either<R, L> = {
  value: R | undefined,
  error: L | false
}
