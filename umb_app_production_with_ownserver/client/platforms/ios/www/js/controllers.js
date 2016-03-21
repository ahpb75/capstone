angular.module('umb-hsa.controllers', [])

.controller('LoginCtrl', function($scope, BackandService, $ionicPopup, $state, HelpFunction,User,$ionicPlatform,$cordovaTouchID){

  $ionicPlatform.ready(function() {
        $cordovaTouchID.checkSupport().then(function() {
            $cordovaTouchID.authenticate("You must authenticate").then(function() {
                alert("The authentication was successful");
            }, function(error) {
                console.log(JSON.stringify(error));
            });
        }, function(error) {
            console.log(JSON.stringify(error));
        });
    });

  $scope.data = {};
  $scope.login = function(){
    BackandService.getUsers().then(function(result){
      var a = HelpFunction.searchJson(result,'username',$scope.data.username);
      if(a.length != 0){
        if(a[0].password == $scope.data.password)
        {
          User.setUser(a[0]);
          $state.go('tab.dash');
        }
      }
      else{
        var alertPopup = $ionicPopup.alert({title: 'Login Fail!', template: 'Username/Password wrong!'});
      }
    })
  }

  $scope.signup = function(){
    $state.go('signup');
  }
})

.controller('SignupCtrl',function($scope,$state,BackandService,$ionicPopup,HelpFunction){

  $scope.input = {};
  $scope.signup = function(){
    if(!$scope.input.username)
    {
      var alertPopup = $ionicPopup.alert({title: 'Signup Fail!', template: 'No username!'});
    }
    else if(!$scope.input.password){
      var alertPopup = $ionicPopup.alert({title: 'Signup Fail!', template: 'No password!'});
    }
    else{
      BackandService.getUsers().then(function(result){
        var a = HelpFunction.searchJson(result,'username',$scope.input.username);
        if (a.length == 0){
          BackandService.addUser($scope.input);
          var alertPopup = $ionicPopup.alert({title: 'Welcome!', template: 'Successful signup!'});
          $state.go('login');
        }
        else{
          var alertPopup = $ionicPopup.alert({title: 'Signup Fail!', template: 'Username already exists'});
        }
      })
    }
  }
})

.controller('DashCtrl', function($scope,User) {
})

.controller('ClaimCtrl', function($scope,$state,BackandService) {
  $scope.viewClaim = function(){
    $state.go('tab.claimDetails');
  };

  $scope.newClaim = function(){
    $state.go('tab.newClaim');
  };

})

.controller('ClaimDetailCtrl', function($scope, BackandService,User,$state,$ionicPopup) {
  $scope.claims = [];
  $scope.input = {};
 
  function getAllClaims() {
    BackandService.getClaims()
    .then(function (result) {
      for( i = 0; i < result.data.data.length; i++){
        if((result.data.data)[i].created_by == User.getUser().username)
        $scope.claims.push((result.data.data)[i]);
      }
    });
  }

  $scope.addClaim = function() {
    $scope.currDate = new Date();
    $scope.newClaim = {"name":$scope.input.name,"created_by":User.getUser().username,"completed":false,"time":$scope.currDate.toJSON()};
    console.dir($scope.newClaim);
    BackandService.addClaim($scope.newClaim)
    .then(function(result) {
      $scope.input = {};
      getAllClaims();
    });
    var alertPopup = $ionicPopup.alert({title: 'Claim Fired!', template: 'View it in details!'});
    $state.go('tab.claim');

  }
 
  $scope.deleteClaim = function(id) {
    BackandService.deleteClaim(id)
    .then(function (result) {
      getAllClaims();
    });
  }
 
  getAllClaims();
});
