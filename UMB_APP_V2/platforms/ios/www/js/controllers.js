angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state){
  $scope.data = {};
  $scope.login = function(){
    LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data){
      $state.go('tab.dash');
    }).error(function(data){
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  }

  $scope.signup = function(){
    $state.go('signup');
  }
})

.controller('SignupCtrl',function($scope,$state,SignupService){
  $scope.input = {};
  $scope.signup = function(){
    SignupService.addUser($scope.input);
    $state.go('login');
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
