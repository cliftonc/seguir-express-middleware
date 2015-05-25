define({ "api": [
  {
    "type": "del",
    "url": "/feed",
    "title": "Get feed for logged in user",
    "name": "GetFeed",
    "group": "ApiFeeds",
    "version": "1.0.0",
    "description": "<p>Gets a user feed</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>users req.user.seguirId as the user id</p> "
          }
        ]
      }
    },
    "filename": "./index.js",
    "groupTitle": "ApiFeeds"
  },
  {
    "type": "del",
    "url": "/feed",
    "title": "Get user feed for user",
    "name": "GetUserFeed",
    "group": "ApiFeeds",
    "version": "1.0.0",
    "description": "<p>Gets a user feed</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user of feed to view</p> "
          }
        ]
      }
    },
    "filename": "./index.js",
    "groupTitle": "ApiFeeds"
  },
  {
    "type": "post",
    "url": "/follow",
    "title": "Follow another user",
    "name": "AddFollower",
    "group": "ApiFollow",
    "version": "1.0.0",
    "description": "<p>Follows another user</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "req.user",
            "description": "<p>expects req.user to be present, with req.user.seguirId</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>the guid of the user to follow</p> "
          }
        ]
      }
    },
    "filename": "./index.js",
    "groupTitle": "Following"
  },
  {
    "type": "get",
    "url": "/user/:user/followers",
    "title": "Get followers",
    "name": "GetFollowers",
    "group": "ApiFollow",
    "version": "1.0.0",
    "description": "<p>Stops following another user</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "req.user",
            "description": "<p>expects req.user to be present, with req.user.seguirId</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>the guid of the user to get followers for</p> "
          }
        ]
      }
    },
    "filename": "./index.js",
    "groupTitle": "Following"
  },
  {
    "type": "delete",
    "url": "/follow/:user",
    "title": "Un-follow another user",
    "name": "RemoveFollower",
    "group": "ApiFollow",
    "version": "1.0.0",
    "description": "<p>Stops following another user</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "req.user",
            "description": "<p>expects req.user to be present, with req.user.seguirId</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>the guid of the user to stop following</p> "
          }
        ]
      }
    },
    "filename": "./index.js",
    "groupTitle": "Following"
  },
  {
    "type": "post",
    "url": "/friend-request/accept",
    "title": "Accept a friend request",
    "name": "AcceptFriendRequest",
    "group": "ApiFriends",
    "version": "1.0.0",
    "description": "<p>Accepts a friend request sent by another user.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "req.user",
            "description": "<p>expects req.user to be present, with req.user.seguirId</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "friend_request",
            "description": "<p>the request guid to accept</p> "
          }
        ]
      }
    },
    "filename": "./index.js",
    "groupTitle": "Friends"
  },
  {
    "type": "post",
    "url": "/friend-request",
    "title": "Add a friend request",
    "name": "AddFriendRequest",
    "group": "ApiFriends",
    "version": "1.0.0",
    "description": "<p>Creates a friend request</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "req.user",
            "description": "<p>expects req.user to be present, with req.user.seguirId</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>the user to send a friend request to</p> "
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>the message to send with the request</p> "
          }
        ]
      }
    },
    "filename": "./index.js",
    "groupTitle": "Friends"
  },
  {
    "type": "get",
    "url": "/friend-request/active",
    "title": "Get list of friend requests",
    "name": "GetFriendRequests",
    "group": "ApiFriends",
    "version": "1.0.0",
    "description": "<p>Gets a list of users friend requests</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "req.user",
            "description": "<p>expects req.user to be present, with req.user.seguirId</p> "
          }
        ]
      }
    },
    "filename": "./index.js",
    "groupTitle": "Friends"
  },
  {
    "type": "delete",
    "url": "/user/:user/friend/:user_friend",
    "title": "Remove a friendship",
    "name": "RemoveFriend",
    "group": "ApiFriends",
    "version": "1.0.0",
    "description": "<p>Removes a friend relationship</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "req.user",
            "description": "<p>expects req.user to be present, with req.user.seguirId</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>the user to stop being friends with</p> "
          }
        ]
      }
    },
    "filename": "./index.js",
    "groupTitle": "Friends"
  },
  {
    "type": "del",
    "url": "/like/:item",
    "title": "Add a like",
    "name": "AddLike",
    "group": "ApiLikes",
    "version": "1.0.0",
    "description": "<p>Creates a like</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>expects req.user to be present, with req.user.seguirId</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "item",
            "description": "<p>the url of the item they like</p> "
          }
        ]
      }
    },
    "filename": "./index.js",
    "groupTitle": "Likes"
  },
  {
    "type": "post",
    "url": "/like",
    "title": "Add a like",
    "name": "AddLike",
    "group": "ApiLikes",
    "version": "1.0.0",
    "description": "<p>Creates a like</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>expects req.user to be present, with req.user.seguirId</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "item",
            "description": "<p>the url of the item they like</p> "
          }
        ]
      }
    },
    "filename": "./index.js",
    "groupTitle": "Likes"
  },
  {
    "type": "get",
    "url": "/like/item",
    "title": "Check if a user likes an item",
    "name": "CheckLike",
    "group": "ApiLikes",
    "version": "1.0.0",
    "description": "<p>Checks a like</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>expects req.user to be present, with req.user.seguirId</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "item",
            "description": "<p>the url of the item they like</p> "
          }
        ]
      }
    },
    "filename": "./index.js",
    "groupTitle": "Likes"
  },
  {
    "type": "post",
    "url": "/post",
    "title": "Add a post",
    "name": "AddPost",
    "group": "ApiPosts",
    "version": "1.0.0",
    "description": "<p>Creates a post</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>expects req.user to be present, with req.user.seguirId</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>the body of the post</p> "
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isprivate",
            "description": "<p>is the post private</p> "
          }
        ]
      }
    },
    "filename": "./index.js",
    "groupTitle": "Posts"
  },
  {
    "type": "del",
    "url": "/post/:post",
    "title": "Remove a post",
    "name": "DeletePost",
    "group": "ApiPosts",
    "version": "1.0.0",
    "description": "<p>Deletes a post</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>expects req.user to be present, with req.user.seguirId</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "post",
            "description": "<p>the guid of the post</p> "
          }
        ]
      }
    },
    "filename": "./index.js",
    "groupTitle": "Posts"
  },
  {
    "type": "post",
    "url": "/post/:post",
    "title": "get a post",
    "name": "GetPost",
    "group": "ApiPosts",
    "version": "1.0.0",
    "description": "<p>Gets a post</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>expects req.user to be present, with req.user.seguirId</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "post",
            "description": "<p>the guid of the post</p> "
          }
        ]
      }
    },
    "filename": "./index.js",
    "groupTitle": "Posts"
  },
  {
    "type": "get",
    "url": "/user/:user",
    "title": "get a user details",
    "name": "GetUser",
    "group": "ApiUsers",
    "version": "1.0.0",
    "description": "<p>Gets details of a user by guid</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>expects req.user to be present, with req.user.seguirId</p> "
          }
        ]
      }
    },
    "filename": "./index.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/useraltid/:altid",
    "title": "get a user details by altid",
    "name": "GetUserByAltid",
    "group": "ApiUsers",
    "version": "1.0.0",
    "description": "<p>Gets details of a user by username</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>expects req.user to be present, with req.user.seguirId</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "altid",
            "description": "<p>the altid of the user to get details for</p> "
          }
        ]
      }
    },
    "filename": "./index.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/username/:username",
    "title": "get a user details by username",
    "name": "GetUserByName",
    "group": "ApiUsers",
    "version": "1.0.0",
    "description": "<p>Gets details of a user by username</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>expects req.user to be present, with req.user.seguirId</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>the name of the user to get details for</p> "
          }
        ]
      }
    },
    "filename": "./index.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/user/:user/relationship",
    "title": "get a relationship details",
    "name": "GetUserRelationship",
    "group": "ApiUsers",
    "version": "1.0.0",
    "description": "<p>Gets details of a relationship between the logged in user and someone else</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>expects req.user to be present, with req.user.seguirId</p> "
          }
        ]
      }
    },
    "filename": "./index.js",
    "groupTitle": "Users"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p> "
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/client/main.js",
    "group": "_Users_cliftonc_work_seguir_express_middleware_doc_client_main_js",
    "groupTitle": "_Users_cliftonc_work_seguir_express_middleware_doc_client_main_js",
    "name": ""
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p> "
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "_Users_cliftonc_work_seguir_express_middleware_doc_main_js",
    "groupTitle": "_Users_cliftonc_work_seguir_express_middleware_doc_main_js",
    "name": ""
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p> "
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/server/main.js",
    "group": "_Users_cliftonc_work_seguir_express_middleware_doc_server_main_js",
    "groupTitle": "_Users_cliftonc_work_seguir_express_middleware_doc_server_main_js",
    "name": ""
  }
] });