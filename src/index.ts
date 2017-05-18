import xs, {Stream} from 'xstream';

export type Component<Sources, Sinks> = (sources: Sources) => Sinks;
export type Reducer = (state: any) => any;

export interface OnionSource {
  onion: any
}

export interface OnionSink {
  onion: any
}

export interface StorageSource {
  storage: any
}

export interface StorageSink {
  storage: Stream<Reducer>
}

function serialize(state: any) {
  return JSON.stringify(state);
}

function deserialize(str: string) {
  return JSON.parse(str) || {};
}

export default function storageify<Sources extends OnionSource, Sinks extends OnionSink>(
      Component: Component<Sources, Sinks>,
      options: {
          key: string,
          serialize(state: any): string,
          deserialize(stateStr: string): any,
        }
    ): Component<Sources & StorageSource, Sinks & StorageSink> {
  const _options = {
    // defaults
    key: 'storageify',
    serialize,
    deserialize,
    ...options,
  };
  return function (sources: Sources & StorageSource): Sinks & StorageSink {
    const localStorage$ = sources.storage.local.getItem(_options.key).take(1);
    const storedData$ = localStorage$.map(_options.deserialize);
    const state$ = sources.onion.state$;
    const componentSinks = Component(sources);

    // change initial reducer (first reducer) of component
    // to merge default state with stored state
    const childReducer$ = componentSinks.onion;
    const initialReducer$ =
      xs.combine(
          storedData$,
          childReducer$.take(1)
        )
        .map(([storedState, initialReducerChild]: [any, Reducer]) =>
            prevState =>
              ({...initialReducerChild(prevState), storedState})
          );
    // replace initial reducer
    const parentReducer$ =
      xs.merge(
          initialReducer$,
          childReducer$.drop(1)
        );

    const storage$ = state$.map(_options.serialize)
        .map(value => ({key: _options.key, value}));
    const sinks = {
      ...(componentSinks as any),
      onion: parentReducer$,
      storage: storage$,
    };
    return sinks;
  };
}
