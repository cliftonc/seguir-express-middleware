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

module.exports = function (options, express, seguir, authMiddleware) {

  var router = express.Router();
  var u = seguir.urls; // Url helper

  var defaults = {
    userProperty: 'user',
    seguirIdProperty: 'seguirId',
    user: true,
    post: true,
    friend: true,
    follow: true,
    like: true,
    feed: true
  };

  options = _.defaults(options, defaults);

  var respondWithError = function (err, res) {
    res.status(err.statusCode || 500);
    res.send(err);
  };

  function getSeguirId (req) {

    if (options.userProperty && options.seguirIdProperty && req[options.userProperty] && req[options.userProperty][options.seguirIdProperty]) {
      return req[options.userProperty][options.seguirIdProperty];
    }

    if (options.seguirIdProperty && req[options.seguirIdProperty]) {
      return req[options.seguirIdProperty];
    }

    return null;
  }

  if (options.user) {
    /**
     * @apiDefine ApiUsers Users
     */

    /**
     * @api {get} /user/:user get a user details
     * @apiName GetUser
     * @apiGroup ApiUsers
     * @apiVersion 1.0.0
     *
     * @apiDescription Gets details of a user by guid
     * @apiParam {Object} user expects req.user to be present, with req.user.seguirId
     * @apiParam {String} user the guid of the user to get details for
     *
     */
    router.get(u('getUser'), authMiddleware, function (req, res) {
      var seguirId = getSeguirId(req);
      seguir.getUser(seguirId, req.params.user, function (err, user) {
        if (err) { return respondWithError(err, res); }
        res.send(user);
      });
    });

    /**
     * @api {get} /username/:username get a user details by username
     * @apiName GetUserByName
     * @apiGroup ApiUsers
     * @apiVersion 1.0.0
     *
     * @apiDescription Gets details of a user by username
     * @apiParam {Object} user expects req.user to be present, with req.user.seguirId
     * @apiParam {String} username the name of the user to get details for
     *
     */
    router.get(u('getUserByName'), authMiddleware, function (req, res) {
      var seguirId = getSeguirId(req);
      seguir.getUserByName(seguirId, req.params.username, function (err, user) {
        if (err) { return respondWithError(err, res); }
        res.send(user);
      });
    });

    /**
     * @api {get} /useraltid/:altid get a user details by altid
     * @apiName GetUserByAltid
     * @apiGroup ApiUsers
     * @apiVersion 1.0.0
     *
     * @apiDescription Gets details of a user by username
     * @apiParam {Object} user expects req.user to be present, with req.user.seguirId
     * @apiParam {String} altid the altid of the user to get details for
     *
     */
    router.get(u('getUserByAltId'), authMiddleware, function (req, res) {
      var seguirId = getSeguirId(req);
      seguir.getUserByAltId(seguirId, req.params.altid, function (err, user) {
        if (err) { return respondWithError(err, res); }
        res.send(user);
      });
    });

    /**
     * @api {get} /user/:user/relationship get a relationship details
     * @apiName GetUserRelationship
     * @apiGroup ApiUsers
     * @apiVersion 1.0.0
     *
     * @apiDescription Gets details of a relationship between the logged in user and someone else
     * @apiParam {Object} user expects req.user to be present, with req.user.seguirId
     * @apiParam {String} user the guid of the user to compare to the logged in user
     *
     */
    router.get(u('getUserRelationship'), authMiddleware, function (req, res) {
      var seguirId = getSeguirId(req);
      seguir.getUserRelationship(seguirId, req.params.user, function (err, relationship) {
        if (err) { return respondWithError(err, res); }
        res.send(relationship);
      });
    });

  }

  if (options.post) {
    /**
     * @apiDefine ApiPosts Posts
     */

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
    router.get(u('getPost'), authMiddleware, function (req, res) {
      var seguirId = getSeguirId(req);
      seguir.getPost(seguirId, req.params.post, function (err, post) {
        if (err) { return respondWithError(err, res); }
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
    router.post(u('addPost'), authMiddleware, function (req, res) {
      var isprivate = req.body.isprivate === 'true' || req.body.isprivate === true;
      var ispersonal = req.body.ispersonal === 'true' || req.body.ispersonal === true;
      var seguirId = getSeguirId(req);
      seguir.addPost(seguirId, req.body.content, Date.now(), isprivate, ispersonal, function (err, post) {
        if (err) { return respondWithError(err, res); }
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
    router.delete(u('removePost'), authMiddleware, function (req, res) {
      var seguirId = getSeguirId(req);
      seguir.removePost(seguirId, req.params.post, function (err, result) {
        if (err) { return respondWithError(err, res); }
        res.send(result);
      });
    });

  }

  if (options.friend) {

    /**
     * @apiDefine ApiFriends Friends
     */

    /**
     * @api {get} /friend-request/active Get list of friend requests
     * @apiName GetFriendRequests
     * @apiGroup ApiFriends
     * @apiVersion 1.0.0
     *
     * @apiDescription Gets a list of users friend requests
     * @apiParam {Object} req.user expects req.user to be present, with req.user.seguirId
     *
     */
    router.get(u('getFriendRequests'), authMiddleware, function (req, res) {
      var seguirId = getSeguirId(req);
      seguir.getFriendRequests(seguirId, function (err, friend_requests) {
        if (err) { return respondWithError(err, res); }
        res.send(friend_requests);
      });
    });

    /**
     * @api {post} /friend-request Add a friend request
     * @apiName AddFriendRequest
     * @apiGroup ApiFriends
     * @apiVersion 1.0.0
     *
     * @apiDescription Creates a friend request
     * @apiParam {Object} req.user expects req.user to be present, with req.user.seguirId
     * @apiParam {String} user the user to send a friend request to
     * @apiParam {Boolean} message the message to send with the request
     *
     */
    router.post(u('addFriendRequest'), authMiddleware, function (req, res) {
      var seguirId = getSeguirId(req);
      seguir.addFriendRequest(seguirId, req.body.user, req.body.message, Date.now(), function (err, friend) {
        if (err) { return respondWithError(err, res); }
        res.send(friend);
      });
    });

    /**
     * @api {delete} /user/:user/friend/:user_friend Remove a friendship
     * @apiName RemoveFriend
     * @apiGroup ApiFriends
     * @apiVersion 1.0.0
     *
     * @apiDescription Removes a friend relationship
     * @apiParam {Object} req.user expects req.user to be present, with req.user.seguirId
     * @apiParam {String} user the user to stop being friends with
     *
     */
    router.delete(u('removeFriend'), authMiddleware, function (req, res) {
      var seguirId = getSeguirId(req);
      seguir.removeFriend(seguirId, req.params.user, function (err, result) {
        if (err) { return respondWithError(err, res); }
        res.send(result);
      });
    });

    /**
     * @api {post} /friend-request/accept Accept a friend request
     * @apiName AcceptFriendRequest
     * @apiGroup ApiFriends
     * @apiVersion 1.0.0
     *
     * @apiDescription Accepts a friend request sent by another user.
     * @apiParam {Object} req.user expects req.user to be present, with req.user.seguirId
     * @apiParam {String} friend_request the request guid to accept
     *
     */
    router.post(u('acceptFriendRequest'), authMiddleware, function (req, res) {
      seguir.acceptFriendRequest(req.user.seguirId, req.body.friend_request, function (err, friend_request) {
        if (err) { return respondWithError(err, res); }
        res.send(friend_request);
      });
    });

  }

  if (options.follow) {

    /**
     * @apiDefine ApiFollow Following
     */

    /**
     * @api {post} /follow Follow another user
     * @apiName AddFollower
     * @apiGroup ApiFollow
     * @apiVersion 1.0.0
     *
     * @apiDescription Follows another user
     * @apiParam {Object} req.user expects req.user to be present, with req.user.seguirId
     * @apiParam {String} user the guid of the user to follow
     *
     */
    router.post(u('addFollower'), authMiddleware, function (req, res) {
      var seguirId = getSeguirId(req);
      seguir.followUser(seguirId, req.body.user, Date.now(), function (err, follow) {
        if (err) { return respondWithError(err, res); }
        res.send(follow);
      });
    });

    /**
     * @api {delete} /follow/:user Un-follow another user
     * @apiName RemoveFollower
     * @apiGroup ApiFollow
     * @apiVersion 1.0.0
     *
     * @apiDescription Stops following another user
     * @apiParam {Object} req.user expects req.user to be present, with req.user.seguirId
     * @apiParam {String} user the guid of the user to stop following
     *
     */
    router.delete(u('removeFollower'), authMiddleware, function (req, res) {
      var seguirId = getSeguirId(req);
      seguir.unFollowUser(seguirId, req.params.user, function (err, result) {
        if (err) { return respondWithError(err, res); }
        res.send(result);
      });
    });

    /**
     * @api {get} /user/:user/followers Get followers
     * @apiName GetFollowers
     * @apiGroup ApiFollow
     * @apiVersion 1.0.0
     *
     * @apiDescription Stops following another user
     * @apiParam {Object} req.user expects req.user to be present, with req.user.seguirId
     * @apiParam {String} user the guid of the user to get followers for
     *
     */
    router.get(u('getFollowers'), authMiddleware, function (req, res) {
      var seguirId = getSeguirId(req);
      seguir.getFollowers(seguirId, req.params.user, function (err, result) {
        if (err) { return respondWithError(err, res); }
        res.send(result);
      });
    });

  }

  if (options.like) {
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
    router.post(u('addLike'), authMiddleware, function (req, res) {
      var seguirId = getSeguirId(req);
      seguir.addLike(seguirId, req.body.item, function (err, like) {
        if (err) { return respondWithError(err, res); }
        res.send(like);
      });
    });

    /**
     * @api {get} /like/item Check if a user likes an item
     * @apiName CheckLike
     * @apiGroup ApiLikes
     * @apiVersion 1.0.0
     *
     * @apiDescription Checks a like
     * @apiParam {Object} user expects req.user to be present, with req.user.seguirId
     * @apiParam {String} item the url of the item they like
     *
     */
    router.get(u('checkLike'), authMiddleware, function (req, res) {
      var seguirId = getSeguirId(req);
      seguir.checkLike(seguirId, req.params.item, function (err, like) {
        if (err) { return respondWithError(err, res); }
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
    router.delete(u('removeLike'), authMiddleware, function (req, res) {
      var seguirId = getSeguirId(req);
      seguir.removeLike(seguirId, req.params.item, function (err, like) {
        if (err) { return respondWithError(err, res); }
        res.send(like);
      });
    });

  }

  if (options.feed) {

    /**
     * @api {del} /feed Get feed for logged in user
     * @apiName GetFeed
     * @apiGroup ApiFeeds
     * @apiVersion 1.0.0
     *
     * @apiDescription Gets a user feed
     * @apiParam {Object} user users req.user.seguirId as the user id
     *
     */
    router.get(u('getFeed'), authMiddleware, function (req, res) {
      var seguirId = getSeguirId(req);
      seguir.getFeed(seguirId, req.params.user, 0, 50, function (err, feed) {
        if (err) { return respondWithError(err, res); }
        res.send(feed);
      });
    });

    /**
     * @api {del} /feed Get user feed for user
     * @apiName GetUserFeed
     * @apiGroup ApiFeeds
     * @apiVersion 1.0.0
     *
     * @apiDescription Gets a user feed
     * @apiParam {String} user user of feed to view
     * @apiParam {Object} user expects req.user to be present, with req.user.seguirId
     *
     */
    router.get(u('getUserFeed'), authMiddleware, function (req, res) {
      var seguirId = getSeguirId(req);
      seguir.getUserFeed(seguirId, req.params.user, 0, 50, function (err, feed) {
        if (err) { return respondWithError(err, res); }
        res.send(feed);
      });
    });

  }

  return router;

};
