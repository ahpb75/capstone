angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state){

  function getObjects(obj, key, val) {
            var objects = [];
            for (var i in obj) {
                if (!obj.hasOwnProperty(i)) continue;
                if (typeof obj[i] == 'object') {
                    objects = objects.concat(getObjects(obj[i], key, val));
                } else if (i == key && obj[key] == val) {
                    objects.push(obj);
                }
            }
            return objects;
            }


  $scope.data = {};

  $scope.login = function(){
    LoginService.getUsers().then(function(result){

      var a = getObjects(result,'username',$scope.data.username);

      if(a[0].password == $scope.data.password)
      {
        $state.go('tab.dash');
      }
      else{
        var alertPopup = $ionicPopup.alert({
        title: 'Login Fail!',
        template: 'Username/Password wrong!'
      });
      }
    })
  }

  $scope.signup = function(){
    $state.go('signup');
  }
})

.controller('SignupCtrl',function($scope,$state,SignupService,$ionicPopup){

  function getObjects(obj, key, val) {
            var objects = [];
            for (var i in obj) {
                if (!obj.hasOwnProperty(i)) continue;
                if (typeof obj[i] == 'object') {
                    objects = objects.concat(getObjects(obj[i], key, val));
                } else if (i == key && obj[key] == val) {
                    objects.push(obj);
                }
            }
            return objects;
            }

  $scope.input = {};
  $scope.signup = function(){
    if(!$scope.input.username)
    {
      var alertPopup = $ionicPopup.alert({
        title: 'Signup Fail!',
        template: 'No username!'
      });
    }
    else if(!$scope.input.password){
      var alertPopup = $ionicPopup.alert({
        title: 'Signup Fail!',
        template: 'No password!'
      });
    }
    else{
  SignupService.getUsers().then(function(result){

    var a = getObjects(result,'username',$scope.input.username);
    
    console.dir(a);

    if (a.length == 0){
      SignupService.addUser($scope.input);
      var alertPopup = $ionicPopup.alert({
        title: 'Welcome!',
        template: 'Successful signup!'
      });
      $state.go('login');
    }
    else{
      var alertPopup = $ionicPopup.alert({
        title: 'Signup Fail!',
        template: 'Username already exists'
      });
    }
  })
    // SignupService.addUser($scope.input);

  }
}
})

.controller('DashCtrl', function($scope) {
})


.controller('TestCtrl', function($scope, TodoService) {
  $scope.todos = [];
  $scope.input = {};
 
  function getAllTodos() {
    TodoService.getTodos()
    .then(function (result) {
      // console.dir(result);
      $scope.todos = result.data.data;
    });
  }

  $scope.addTodo = function() {
    // $scope.newClaim = '{"name":$scope.input, "time":Date(), "completed":false}';
    $scope.currDate = new Date();
    $scope.newClaim = {"name":$scope.input.name,"completed":false,"time":$scope.currDate.toJSON()};
    TodoService.addTodo($scope.newClaim)
    .then(function(result) {
      $scope.input = {};
      // Reload our todos, not super cool
      getAllTodos();
    });
  }
 
  $scope.deleteTodo = function(id) {
    TodoService.deleteTodo(id)
    .then(function (result) {
      // Reload our todos, not super cool
      getAllTodos();
    });
  }
 
  getAllTodos();
})


.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope,$state,TodoService) {
  $scope.viewClaim = function(){
    $state.go('tab.claimDetails');
  };

  $scope.newClaim = function(){
    $state.go('tab.newClaim');
  };

});
