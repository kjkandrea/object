type Brand<T, K> = T & {__brand: K};

export type Second = Brand<number, 'second'>;
