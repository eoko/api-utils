# eoko-api-models [![Build Status][travis-image]][travis-url]
> Eoko base models used for api

## Installation

```sh
$ npm install --save eoko-api-models
```

## Configuration

All configuration must be done using `env` variables. A sample file `.env.dist`
can be found in the project root.

## Usage

```js
var eokoApiModels = require('eoko-api-models');

eokoApiModels('Rainbow');
```

## Test
Test are ran against mongo database. You can use a docker image to do that :

```
$ docker pull mongo
```

All test configuration can be done using `env` variables. A sample file
 is already configured in `/tests/.env`.

## License

MIT © [Romain DARY &lt;romain.dary@eoko.fr&gt;](http://eoko.fr)

[travis-image]: https://travis-ci.com/eoko/eoko-api-models.svg?token=ncotYzyGStjuDrTy46xs&branch=master
[travis-url]: https://travis-ci.com/eoko/eoko-api-models
