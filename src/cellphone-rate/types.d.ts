type Brand<T, K> = T & {__brand: K};

export type Seconds = Brand<number, 'seconds'>;
