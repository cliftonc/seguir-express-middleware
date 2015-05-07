/**
 * @apiDefine ApiMiddleware Seguir Express Middleware
 *
 * This is a pre-built set of express routes that allow you to add seguir to your Node application very quickly and simply.
 *
 * You still create a Seguir client instance, but pass that in to this default middleware to expose the 'standard'
 * collection of client endpoints within your application.
 *
 * This middleware expects you to pass in two additional types of middleware, but does assume that your authentication
 * middleware has run first, and so will attempt to access req.user by the usual convention.
 *
 * Usage:
 *  var Seguir = require('seguir/client');
 *  var seguir = new Seguir(config);
 *  var seguirMiddleware = require('seguir-express-middleware');
 *  app.use('/social', seguirMiddleware(seguir, authApi, authForm));
 *
 *  authApi is middleware that checks that the user is authorised to use the API.
 *
 *  This middleware assumes that the user exists on 'req.user', with property 'seguirId' (TODO: can be over-ridden with options.seguirIdProperty);
 *
 *  Express and Seguir are passed in to avoid the express and seguir dependency outside of testing.
 *
 */
var _ = require('lodash');

module.exports = function(options, express, seguir, authApi) {

  var router = express.Router();

  var defaults = {
    userProperty: 'user',
    seguirIdProperty: 'seguirId',
    post: true,
    friend: true,
    follow: true,
    like: true
  }

  options = _.defaults(options, defaults);

  var respondWithError = function(err, res) {
    res.status(err.statusCode || 500);
    res.send(err);
  }

  function getSeguirId(req) {

    if(options.userProperty && options.seguirIdProperty && req[options.userProperty] && req[options.userProperty][options.seguirIdProperty]) {
      return req[options.userProperty][options.seguirIdProperty];
    }

    if(options.seguirIdProperty && req[options.seguirIdProperty]) {
      return req[options.seguirIdProperty];
    }

    return null;
  }

  /**
   * @apiDefine ApiPosts Posts
   */

  /**
   * @api {post} /post Add a post
   * @apiName AddPost
   * @apiGroup ApiPosts
   * @apiVersion 1.0.0
   *
   * @apiDescription Creates a post
   * @apiParam {Object} user expects req.user to be present, with req.user.seguirId
   * @apiParam {String} content the body of the post
   * @apiParam {Boolean} isprivate is the post private
   *
   */
  router.post('/post', authApi, function(req, res) {
    var isprivate = req.body.isprivate === 'true';
    var ispersonal = req.body.ispersonal === 'true';
    var seguirId = getSeguirId(req);
    console.dir(req.user);
    console.dir(seguirId);
    seguir.addPost(seguirId, req.body.content, Date.now(), isprivate, ispersonal, function(err, post) {
      if(err) { return respondWithError(err, res); }
      res.send(post);
    });
  });

  /**
   * @api {del} /post/:post Remove a post
   * @apiName DeletePost
   * @apiGroup ApiPosts
   * @apiVersion 1.0.0
   *
   * @apiDescription Deletes a post
   * @apiParam {Object} user expects req.user to be present, with req.user.seguirId
   * @apiParam {String} post the guid of the post
   *
   */
  router.delete('/post/:post', authApi, function(req, res) {
      var seguirId = getSeguirId(req);
      seguir.removePost(seguirId, req.params.post, function(err, result) {
        if(err) { return respondWithError(err, res); }
        res.send(result);
      });
  });

  /**
   * @apiDefine ApiFriends Friends
   */

  /**
   * @api {post} /friend Add a friend request
   * @apiName Friends
   * @apiGroup ApiFriends
   * @apiVersion 1.0.0
   *
   * @apiDescription Creates a friend request
   * @apiParam {Object} req.user expects req.user to be present, with req.user.seguirId
   * @apiParam {String} user the user to send a friend request to
   * @apiParam {Boolean} message the message to send with the request
   *
   */
    router.post('/friend', authApi, function(req, res) {
      var seguirId = getSeguirId(req);
      seguir.addFriendRequest(seguirId, req.body.user, req.body.message, Date.now(), function(err, friend) {
        if(err) { return respondWithError(err, res); }
        res.send(friend);
      });
    });

    /**
     * @api {delete} /friend/:user Remove a friendship
     * @apiName Friends
     * @apiGroup ApiFriends
     * @apiVersion 1.0.0
     *
     * @apiDescription Removes a friend relationship
     * @apiParam {Object} req.user expects req.user to be present, with req.user.seguirId
     * @apiParam {String} user the user to stop being friends with
     *
     */
    router.delete('/friend/:user', authApi, function(req, res) {
      var seguirId = getSeguirId(req);
      seguir.removeFriend(seguirId, req.params.user, function(err, result) {
        if(err) { return respondWithError(err, res); }
        res.send(result);
      });
    });

    /**
     * @api {post} /friend/accept Accept a friend request
     * @apiName Friends
     * @apiGroup ApiFriends
     * @apiVersion 1.0.0
     *
     * @apiDescription Accepts a friend request sent by another user.
     * @apiParam {Object} req.user expects req.user to be present, with req.user.seguirId
     * @apiParam {String} friend_request the request guid to accept
     *
     */
    router.post('/friend/accept', authApi, function(req, res) {
      seguir.acceptFriendRequest(req.user.seguirId, req.body.friend_request, function(err, friend_request) {
        if(err) { return respondWithError(err, res); }
        res.send(friend_request);
      });
    });

    /**
     * @apiDefine ApiFollow Following
     */

    /**
     * @api {post} /follow Follow another user
     * @apiName Follow
     * @apiGroup ApiFollow
     * @apiVersion 1.0.0
     *
     * @apiDescription Follows another user
     * @apiParam {Object} req.user expects req.user to be present, with req.user.seguirId
     * @apiParam {String} user the guid of the user to follow
     *
     */
    router.post('/follow', authApi, function(req, res) {
      var seguirId = getSeguirId(req);
      seguir.followUser(seguirId, req.body.user, Date.now(), function(err, follow) {
        if(err) { return respondWithError(err, res); }
        res.send(follow);
      });
    });

    /**
     * @api {delete} /follow/:user Un-follow another user
     * @apiName Follow
     * @apiGroup ApiFollow
     * @apiVersion 1.0.0
     *
     * @apiDescription Stops following another user
     * @apiParam {Object} req.user expects req.user to be present, with req.user.seguirId
     * @apiParam {String} user the guid of the user to stop following
     *
     */
    router.delete('/follow/:user', authApi, function(req, res) {
      var seguirId = getSeguirId(req);
      seguir.unFollowUser(seguirId, req.params.user, function(err, result) {
        if(err) { return respondWithError(err, res); }
        res.send(result);
      });
    });

    /**
     * @apiDefine ApiLikes Likes
     */

    /**
     * @api {post} /like Add a like
     * @apiName AddLike
     * @apiGroup ApiLikes
     * @apiVersion 1.0.0
     *
     * @apiDescription Creates a like
     * @apiParam {Object} user expects req.user to be present, with req.user.seguirId
     * @apiParam {String} item the url of the item they like
     *
     */
    router.post('/like', authApi, function(req, res) {
      var seguirId = getSeguirId(req);
      seguir.addLike(seguirId, req.body.item, function(err, like) {
        if(err) { return respondWithError(err, res); }
        res.send(like);
      });
    });

    /**
     * @api {get} /like/item Check if a user likes an item
     * @apiName GetLike
     * @apiGroup ApiLikes
     * @apiVersion 1.0.0
     *
     * @apiDescription Checks a like
     * @apiParam {Object} user expects req.user to be present, with req.user.seguirId
     * @apiParam {String} item the url of the item they like
     *
     */
    router.get('/like/:item', authApi, function(req, res) {
      var seguirId = getSeguirId(req);
      seguir.checkLike(seguirId, req.params.item, function(err, like) {
        if(err) { return respondWithError(err, res); }
        res.send(like);
      });
    });

    /**
     * @api {del} /like/:item Add a like
     * @apiName AddLike
     * @apiGroup ApiLikes
     * @apiVersion 1.0.0
     *
     * @apiDescription Creates a like
     * @apiParam {Object} user expects req.user to be present, with req.user.seguirId
     * @apiParam {String} item the url of the item they like
     *
     */
    router.delete('/like/:item', authApi, function(req, res) {
      var seguirId = getSeguirId(req);
      seguir.removeLike(seguirId, req.params.item, function(err, like) {
        if(err) { return respondWithError(err, res); }
        res.send(like);
      });
    });

    return router;

}
