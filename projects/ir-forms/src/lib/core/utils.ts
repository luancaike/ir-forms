interface IObserveTarget<T> {
  [prop: string]: any;

  _observers?: {
    [prop: string]: {
      value: T;
      onChange: IObserveFn<T>[];
    };
  };
}

interface IObserveDeep<T> {
  source: IObserveTarget<T>;
  target: IObserveTarget<T>;
  paths: string[];
  setFn: IObserveFn<T>;
}

type IObserveFn<T> = (change?: {
  currentValue: T;
  previousValue?: T;
  firstChange: boolean;
}) => void;

export interface IObserver<T> {
  setValue: (value: T) => void;
  unsubscribe: Function;
}

export function isObject(x: any) {
  return x != null && typeof x === 'object';
}

export function Clone(value: any): any {
  if (Array.isArray(value)) {
    return value.slice(0).map((v) => Clone(v));
  }
  // best way to clone a js object maybe
  // https://stackoverflow.com/questions/41474986/how-to-clone-a-javascript-es6-class-instance
  const proto = Object.getPrototypeOf(value);
  let c = Object.create(proto);
  c = Object.setPrototypeOf(c, proto);
  // need to make a deep copy so we dont use Object.assign
  // also Object.assign wont copy property descriptor exactly
  return Object.keys(value).reduce((newVal, prop) => {
    const propDesc = Object.getOwnPropertyDescriptor(value, prop);
    if (propDesc.get) {
      Object.defineProperty(newVal, prop, propDesc);
    } else {
      newVal[prop] = Clone(value[prop]);
    }

    return newVal;
  }, c);
}

// Observar um Objeto inteiro
export function observeDeep<T>({
  source,
  paths,
  target,
  setFn,
}: IObserveDeep<T>) {
  const observers = [];
  if (paths.length === 0) {
    target = source;
  }

  Object.keys(target).forEach((path) => {
    let unsubscribe = () => {};
    const observer = observe(
      source,
      [...paths, path],
      ({ firstChange, currentValue }) => {
        if (!firstChange) {
          setFn();
        }

        unsubscribe();
        const i = observers.indexOf(unsubscribe);
        if (i > -1) {
          observers.splice(i, 1);
        }

        if (
          isObject(currentValue) &&
          currentValue.constructor.name === 'Object'
        ) {
          unsubscribe = observeDeep({
            source,
            setFn,
            paths: [...paths, path],
            target: currentValue,
          });
          observers.push(unsubscribe);
        }
      }
    );

    observers.push(() => observer.unsubscribe());
  });
  return () => {
    observers.forEach((observer) => observer());
  };
}

// Incrementar um Objeto com _observers
export function observe<T = any>(
  obj: IObserveTarget<T>,
  paths: string[],
  setFn: IObserveFn<T>
): IObserver<T> {
  if (!obj._observers) {
    defineHiddenProp(obj, '_observers', {});
  }

  let target = obj;
  for (let i = 0; i < paths.length - 1; i++) {
    if (!target[paths[i]] || !isObject(target[paths[i]])) {
      // Checa se o caminho resulta em um array
      target[paths[i]] = /^\d+$/.test(paths[i + 1]) ? [] : {};
    }
    target = target[paths[i]];
  }

  const key = paths[paths.length - 1];
  const prop = paths.join('.');
  if (!obj._observers[prop]) {
    obj._observers[prop] = { value: target[key], onChange: [] };
  }

  const state = obj._observers[prop];
  if (state.onChange.indexOf(setFn) === -1) {
    state.onChange.push(setFn);
    setFn({ currentValue: state.value, firstChange: true });
    if (state.onChange.length === 1) {
      const { enumerable } = Object.getOwnPropertyDescriptor(target, key) || {
        enumerable: true,
      };
      Object.defineProperty(target, key, {
        enumerable,
        configurable: true,
        get: () => state.value,
        set: (currentValue) => {
          if (currentValue !== state.value) {
            const previousValue = state.value;
            state.value = currentValue;
            state.onChange.forEach((changeFn) =>
              changeFn({ previousValue, currentValue, firstChange: false })
            );
          }
        },
      });
    }
  }
  return {
    setValue(value: T) {
      state.value = value;
    },
    unsubscribe() {
      state.onChange = state.onChange.filter((changeFn) => changeFn !== setFn);
    },
  };
}

export function defineHiddenProp(field: any, prop: string, defaultValue: any) {
  Object.defineProperty(field, prop, {
    enumerable: false,
    writable: true,
    configurable: true,
  });
  field[prop] = defaultValue;
}
