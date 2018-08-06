export declare function cachePromise<T>(promFunc: (...args: any[]) => Promise<T>, ...args: any[]): Promise<T>;
export declare function funcWrapper<T>(func: (...args: any[]) => T, ...args: any[]): () => T;
