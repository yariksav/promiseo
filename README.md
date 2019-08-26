## promiseo

Library for resolve object with promises

<p align="center">
  <a href="https://npmcharts.com/compare/promiseo?minimal=true">
    <img src="http://img.shields.io/npm/dm/promiseo.svg">
  </a>
  <a href="https://www.npmjs.org/package/promiseo">
    <img src="https://img.shields.io/npm/v/promiseo.svg">
  </a>
  <a href="http://img.badgesize.io/https://unpkg.com/promiseo/dist/promiseo.min.js?compression=gzip&label=gzip%20size:%20JS">
    <img src="http://img.badgesize.io/https://unpkg.com/promiseo/dist/promiseo.min.js?compression=gzip&label=gzip%20size:%20JS">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green.svg">
  </a>
</p>

### Install

``` bash
npm install promiseo --save-dev
```

### Usage

``` js
import promiseo from 'promiseo'
```

``` js
  const somePromiseFunction = new Promise((resolve) => {
    ...
    resolve('test')
  })

  const someAsyncFunction = async () => {
    ...
    return ['1', '2']
  }

  const someAsyncFunctionThatReturnsObject = async () => {
    ...
    return {
      param1: 1
      param2: 2
    }
  }

  const result = promiseo({
    foo: somePromiseFunction(),
    bar: someAsyncFunction(),
    simpleString: 'foo', // simple type param
    simpleObject: { test: 1 }, // simple object
    '...': someAsyncFunctionThatReturnsObject()
  })
```

The result will be 
``` js
  {
    foo: 'test',
    bar: ['1', '2']
    simpleString: 'foo',
    simpleObject: { test: 1 },
    param1: 1,
    param2: 2
  }
```

### License

[MIT](http://opensource.org/licenses/MIT)