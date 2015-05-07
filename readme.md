# Seguir Express Middleware

Part of the Seguir social platform

[http://cliftonc.github.io/seguir/server](http://cliftonc.github.io/seguir)

## Middleware

This is express middleware that you can add to your own application, that will expose a set of local endpoints that you can use to build a front end for Seguir.

We have done it this way to enable you to wire up whatever authentication mechanism you like for users, with the only requirement being that the request hits the seguir middleware with a req.user object that has a seguirID (this can be over-ridden).

```
req.user = {
  seguirId: '92029c7b-0ded-4d4f-b782-b2514c3dbb47'
}
```

## Adding to your application

Assuming your express app is running on /app, you can add the endpoints via:

```
var Seguir = require('seguir/client');
var seguir = new Seguir(config);
var seguirMiddleware = require('seguir-express-middleware');
app.use('/social', seguirMiddleware(seguir, authApi));
```

[Pronounced: seh-geer]
