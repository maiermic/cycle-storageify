<a name="4.0.0"></a>
# [4.0.0](https://github.com/maiermic/cycle-storageify/compare/v3.2.0...v4.0.0) (2017-10-18)


### BREAKING CHANGES

* `xstream` is not a dependency anymore, but a peer dependency.


<a name="3.2.0"></a>
# [3.2.0](https://github.com/maiermic/cycle-storageify/compare/v3.1.0...v3.2.0) (2017-08-04)

### Features

* **storageify:** Add `debounce` option.



<a name="3.1.0"></a>
# [3.1.0](https://github.com/maiermic/cycle-storageify/compare/v3.0.0...v3.1.0) (2017-08-01)

### Bug Fixes

* **storageify:** Other local storage stuff is not overwritten anymore in the `storage` sink.

### Features

* **storageify:** Make `options` optional.



<a name="3.0.0"></a>
# [3.0.0](https://github.com/maiermic/cycle-storageify/compare/v2.0.0...v3.0.0) (2017-05-30)


### BREAKING CHANGES

* **storageify:** If `options.key` does not exist (in storage), `undefined` is emitted on `storage` sink
instead of an empty object `{}`. This change is done because
[cycle-onionify](https://github.com/staltz/cycle-onionify)
treats `undefined` as "no state" and is important for initializing state with defaults.
See commit
[c6f4702](https://github.com/maiermic/cycle-storageify/pull/2/commits/c6f4702ac22ff37ba20214c6a58a9ce6ed21d029).

<a name="2.0.0"></a>
# [2.0.0](https://github.com/maiermic/cycle-storageify/compare/v1.0.0...v2.0.0) (2017-05-19)


### Bug Fixes

* **src:** fix initial reducer logic, avoid take() and drop() ([059cd59](https://github.com/maiermic/cycle-storageify/commit/059cd59))

### BREAKING CHANGES

* **src:** This version of cycle-storageify can only be used with TypeScript v2.3 and xstream v10 or higher.