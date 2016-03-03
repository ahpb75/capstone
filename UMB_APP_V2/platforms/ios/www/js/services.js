angular.module('starter.services', ['backand'])

.service('LoginService', function($http, Backand) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var baseUrl = '/1/objects/';
            var objectName = 'users/';
            // var user = {"username":name,"password":pw};
            function getUrl() {
              return Backand.getApiUrl() + baseUrl + objectName;
            }

            function getUrlForId(id) {
              return getUrl() + id;
            }
           
            getUsers = function () {
              return $http.get(getUrl());
            };
           
            addUser = function(user) {
              return $http.post(getUrl(), user);
            }

            if (name.toLowerCase() == 'admin' && pw == 'pass') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.service('SignupService',function($http, Backand){
  var baseUrl = '/1/objects/';
  var objectName = 'users/';

  function getUrl() {
    return Backand.getApiUrl() + baseUrl + objectName;
  }

  addUser = function(user){
    return $http.post(getUrl(),user);
  }

  return{
    addUser: addUser
  }
})

.service('TodoService', function ($http, Backand) {
  var baseUrl = '/1/objects/';
  var objectName = 'todos/';
 
  function getUrl() {
    return Backand.getApiUrl() + baseUrl + objectName;
  }
 
  function getUrlForId(id) {
    return getUrl() + id;
  }
 
  getTodos = function () {
    return $http.get(getUrl());
  };
 
  addTodo = function(todo) {
    return $http.post(getUrl(), todo);
  }
 
  deleteTodo = function (id) {
    return $http.delete(getUrlForId(id));
  };
 
  return {
    getTodos: getTodos,
    addTodo: addTodo,
    deleteTodo: deleteTodo
  }
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
