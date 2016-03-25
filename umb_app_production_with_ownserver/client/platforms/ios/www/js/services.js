angular.module('umb-hsa.services', ['backand'])

.service('BackandService', function ($http, Backand) {
  var baseUrl = '/1/objects/';
  var claims = 'todos/';
  var users = 'users/';
 
  function getUrl(a) {
    return Backand.getApiUrl() + baseUrl + a;
  }
 
  function getUrlForId(id) {
    return getUrl(claims) + id;
  }
 
  getClaims = function () {
    return $http.get(getUrl(claims));
  };

  getUsers = function(){
    return $http.get(getUrl(users));
  }

  addUser = function(user){
    return $http.post(getUrl(users),user);
  }
 
  addClaim = function(todo) {
    return $http.post(getUrl(claims), todo);
  }
 
  deleteClaim = function (id) {
    return $http.delete(getUrlForId(id));
  };
 
  return {
    getClaims: getClaims,
    getUsers: getUsers,
    addUser: addUser,
    addClaim: addClaim,
    deleteClaim: deleteClaim
  }
})

.service('HelpFunction',function(){

  searchJson = function(obj, key, val) {
            var objects = [];
            for (var i in obj) {
                if (!obj.hasOwnProperty(i)) continue;
                if (typeof obj[i] == 'object') {
                    objects = objects.concat(searchJson(obj[i], key, val));
                } else if (i == key && obj[key] == val) {
                    objects.push(obj);
                }
            }
            return objects;
            }
  return {
    searchJson: searchJson
  }
})

.factory('User',function(){
  var user = {};
  setUser = function(a){
    user = a;
  }
  getUser = function(){
    return user;
  }
  return{
    setUser: setUser,
    getUser: getUser
  }
})
;
