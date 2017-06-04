# Cycle.js storageify

Augments your Cycle.js component (main function) by storing its onion-shaped state in local storage.

## Quick example

```js
import onionify from 'cycle-onionify';
import storageify from 'cycle-storageify';
import storageDriver from '@cycle/storage';
// ...

const wrappedMain = onionify(storageify(main, {key: 'my-local-storage-key'}));

Cycle.run(wrappedMain, {
  DOM: makeDOMDriver('#app'),
  storage: storageDriver,
});
```

## Advanced example

See `onionify` branch of [TodoMVC in Cycle.js](https://github.com/cyclejs/todomvc-cycle/tree/onionify).
