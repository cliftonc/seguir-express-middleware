# Seguir Express Middleware

Part of the Seguir social platform, used to quickly create your own application that uses seguir as a backend.

[http://cliftonc.github.io/seguir/server](http://cliftonc.github.io/seguir)

[![Server API](https://img.shields.io/badge/documentation-server-green.svg)](http://cliftonc.github.io/seguir-express-middleware)

## Middleware

This is express middleware that you can add to your own application, that will expose a set of local endpoints that you can use to build a front end for Seguir.

We have done it this way to enable you to wire up whatever authentication mechanism you like for users, with the only requirement being that the request hits the seguir middleware with a req.user object that has a seguirID (this can be over-ridden).

```js
req.user = {
  seguirId: '92029c7b-0ded-4d4f-b782-b2514c3dbb47'
}
```

## Adding to your application

Assuming your express app is running on /app, you can add the endpoints via:

```js
var express = require('express');
var Seguir = require('seguir/client');
var seguir = new Seguir(config);
var seguirMiddleware = require('seguir-express-middleware');
var authMiddleware = function(req, res, next) {
  // example middleware to retrieve seguirId for your use case
  req.user.seguirId = getSeguirIdFromRequest(req);
  next();
}
app.use('/social', seguirMiddleware(options, express, seguir, authMiddleware));
```

## Configuration options

You can over ride the ```userProperty``` (e.g. req.user), along with the seguirId property ```req.user.seguirId```.

Additionally, you can switch off the elements of the api that you do not want to use.  All are on by default.

```json
{
  userProperty: 'user',
  seguirIdProperty: 'seguirId',
  user: true,
  post: true,
  friend: true,
  follow: true,
  like: true,
  feed: true
}
```
