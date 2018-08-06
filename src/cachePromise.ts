export async function cachePromise<T>(promFunc: (...args: any[]) => Promise<T>, ...args: any[]): Promise<T> {
  let result: T | undefined = undefined;
  if (result !== undefined) {
    return Promise.resolve(result);
  } else {
    return promFunc(...args)
      .then((d) => {
        result = d;
        return d;
      });
  }
}

export function funcWrapper<T>(func: (...args: any[]) => T, ...args: any[]) {
  return (): T => {
    return func(...args);
  };
}
