define({ "api": [
  {
    "type": "post",
    "url": "/follow",
    "title": "Follow another user",
    "name": "Follow",
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
    "type": "delete",
    "url": "/follow/:user",
    "title": "Un-follow another user",
    "name": "Follow",
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
    "url": "/friend",
    "title": "Add a friend request",
    "name": "Friends",
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
    "type": "delete",
    "url": "/friend/:user",
    "title": "Remove a friendship",
    "name": "Friends",
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
    "type": "post",
    "url": "/friend/accept",
    "title": "Accept a friend request",
    "name": "Friends",
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
    "url": "/post",
    "title": "Add a post",
    "name": "Posts",
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