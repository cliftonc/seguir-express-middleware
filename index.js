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
 *  app.use('/social', seguirMiddleware(options, express, seguir, authMiddleware));
 *
 *  authMiddleware is middleware that checks that the user is authorised to use the API and sets req.user.
 *
 *  This middleware assumes that the user exists on 'req.user', with property 'seguirId' (can be over-ridden with options.seguirIdProperty);
 *
 *  Express and Seguir are passed in to avoid the express and seguir dependency outside of testing.
 *
 */
var _ = require('lodash');

module.exports = function(options, express, seguir, authMiddleware) {

  var router = express.Router();
  var u = seguir.urls; // Url helper

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


  // addUser:                    '/user',
  // getUser:                    '/user/:user',
  // getUserByName:              '/username/:username',
  // getUserByAltId:             '/useraltid/:altid',
  // getUserRelationship:        '/user/:user/relationship',

  /**
   * @apiDefine ApiPosts Posts
   */

  // addPost:                    '/post',
  // getPost:                    '/post/:post',
  // removePost:                 '/post/:post',

  /**
   * @api {post} /post/:post get a post
   * @apiName GetPost
   * @apiGroup ApiPosts
   * @apiVersion 1.0.0
   *
   * @apiDescription Gets a post
   * @apiParam {Object} user expects req.user to be present, with req.user.seguirId
   * @apiParam {String} post the guid of the post
   *
   */
  router.get(u('getPost'), authMiddleware, function(req, res) {
    var seguirId = getSeguirId(req);
    seguir.getPost(seguirId, req.params.post, function(err, post) {
      if(err) { return respondWithError(err, res); }
      res.send(post);
    });
  });

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
  router.post(u('addPost'), authMiddleware, function(req, res) {
    var isprivate = req.body.isprivate === 'true' || req.body.isprivate === true;
    var ispersonal = req.body.ispersonal === 'true' || req.body.ispersonal === true;
    console.dir(req.body);
    var seguirId = getSeguirId(req);
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
  router.delete(u('removePost'), authMiddleware, function(req, res) {
      var seguirId = getSeguirId(req);
      seguir.removePost(seguirId, req.params.post, function(err, result) {
        if(err) { return respondWithError(err, res); }
        res.send(result);
      });
  });

  /**
   * @apiDefine ApiFriends Friends
   */

  // addFriend:                  '/friend',
  // getFriend:                  '/friend/:friend',
  // removeFriend:               '/user/:user/friend/:user_friend',
  // getFriends:                 '/user/:user/friends',
  // addFriendRequest:           '/friend-request',
  // getFriendRequests:          '/friend-request/active',
  // acceptFriendRequest:        '/friend-request/accept',

  /**
   * @api {get} /friend Get list of friend requests
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
    router.get(u('getFriendRequests'), authMiddleware, function(req, res) {
      var seguirId = getSeguirId(req);
      seguir.getFriendRequests(seguirId, function(err, friend_requests) {
        if(err) { return respondWithError(err, res); }
        res.send(friend_requests);
      });
    });

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
    router.post(u('addFriendRequest'), authMiddleware, function(req, res) {
      var seguirId = getSeguirId(req);
      seguir.addFriendRequest(seguirId, req.body.user, req.body.message, Date.now(), function(err, friend) {
        if(err) { return respondWithError(err, res); }
        res.send(friend);
      });
    });

    /**
     * @api {delete} /user/:user/friend/:user_friend Remove a friendship
     * @apiName Friends
     * @apiGroup ApiFriends
     * @apiVersion 1.0.0
     *
     * @apiDescription Removes a friend relationship
     * @apiParam {Object} req.user expects req.user to be present, with req.user.seguirId
     * @apiParam {String} user the user to stop being friends with
     *
     */
    router.delete(u('removeFriend'), authMiddleware, function(req, res) {
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
    router.post(u('acceptFriendRequest'), authMiddleware, function(req, res) {
      seguir.acceptFriendRequest(req.user.seguirId, req.body.friend_request, function(err, friend_request) {
        if(err) { return respondWithError(err, res); }
        res.send(friend_request);
      });
    });


    /**
     * @apiDefine ApiFollow Following
     */

    // addFollower:                '/follower',
    // getFollow:                  '/follower/:follow',
    // removeFollower:             '/user/:user/follower/:user_follower',
    // getFollowers:               '/user/:user/followers',

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
    router.post(u('addFollower'), authMiddleware, function(req, res) {
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
    router.delete(u('removeFollower'), authMiddleware, function(req, res) {
      var seguirId = getSeguirId(req);
      seguir.unFollowUser(seguirId, req.params.user, function(err, result) {
        if(err) { return respondWithError(err, res); }
        res.send(result);
      });
    });

    /**
     * @apiDefine ApiLikes Likes
     */

    // addLike:                    '/like',
  // getLike:                    '/like/:like',
  // checkLike:                  '/user/:user/like/:item',
  // removeLike:                 '/user/:user/like/:item',


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
    router.post(u('addLike'), authMiddleware, function(req, res) {
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
    router.get(u('checkLike'), authMiddleware, function(req, res) {
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
    router.delete(u('removeLike'), authMiddleware, function(req, res) {
      var seguirId = getSeguirId(req);
      seguir.removeLike(seguirId, req.params.item, function(err, like) {
        if(err) { return respondWithError(err, res); }
        res.send(like);
      });
    });


    // getFeed:                    '/feed/:user',
    // getUserFeed:                '/feed/:user/direct'

    /**
     * @api {del} /feed Get feed for logged in user
     * @apiName GetFeed
     * @apiGroup ApiFeeds
     * @apiVersion 1.0.0
     *
     * @apiDescription Gets a user feed
     * @apiParam {Object} user expects req.user to be present, with req.user.seguirId
     *
     */
    router.get(u('getFeed'), authMiddleware, function(req, res) {
      var seguirId = getSeguirId(req);
      seguir.getFeedForUser(seguirId, seguirId, 0, 50, function(err, feed) {
        if(err) { return respondWithError(err, res); }
        res.send(feed);
      });
    });

    /**
     * @api {del} /feed Get user feed for user
     * @apiName GetFeed
     * @apiGroup ApiFeeds
     * @apiVersion 1.0.0
     *
     * @apiDescription Gets a user feed
     * @apiParam {String} user user of feed to view
     * @apiParam {Object} user expects req.user to be present, with req.user.seguirId
     *
     */
    router.get(u('getUserFeed'), authMiddleware, function(req, res) {
      var seguirId = getSeguirId(req);
      seguir.getUserFeedForUser(seguirId, req.params.user, 0, 50, function(err, feed) {
        if(err) { return respondWithError(err, res); }
        res.send(feed);
      });
    });

    return router;

}
