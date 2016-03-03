angular.module('starter.services', ['backand'])

.service('LoginService', function($http, Backand) {
        
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
           
          

    return{
          // loginUser: loginUser
          getUsers: getUsers
        }
      })



.service('SignupService',function($http, Backand){
  var baseUrl = '/1/objects/';
  var objectName = 'users/';

  function getUrl() {
    return Backand.getApiUrl() + baseUrl + objectName;
  }
  getUsers = function () {
              return $http.get(getUrl());
            }

  addUser = function(user){

    return $http.post(getUrl(),user);
  }

  return{
    addUser: addUser,
    getUsers: getUsers
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
});
