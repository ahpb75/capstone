angular.module('umb-hsa.controllers', [])

.controller('LoginCtrl', function($scope, $ionicPopup, $state, $location, Myuser){

    $scope.credentials = {};

 $scope.showAlert = function (title, errorMsg) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: errorMsg
            });
            alertPopup.then(function (res) {
                console.log($scope.loginError);
            });
        };

        /**
         * @name login()
         * @description
         * sign-in function for users which created an account
         */
        $scope.login = function () {
            $scope.loginResult = Myuser.login({include: 'user', rememberMe: true}, $scope.credentials,
                function () {
                    var next = $location.nextAfterLogin || 'tab/dash';
                    $location.nextAfterLogin = null;
                    $location.path(next);
                },
                function (err) {
                    $scope.loginError = err;
                    $scope.showAlert(err.statusText, err.data.error.message);
                }
            );
        };

  $scope.signup = function(){
    $state.go('signup');
  }
})

.controller('SignupCtrl',function($scope,$state,$ionicPopup,Myuser,$location){

        $scope.registration = {};

  $scope.register = function () {
            $scope.registration.created = new Date().toJSON();
            $scope.user = Myuser.create($scope.registration)
                .$promise
                .then(function (res) {
                    /**
                     * Save avatar
                     */
                     // console.dir(res);
    
                            Myuser.login({include: 'user', rememberMe: true}, $scope.registration)
                                .$promise
                                .then(function (res) {
                                    $location.path('tab/dash')
                                }, function (err) {
                                    $scope.loginError = err;
                                    $scope.showAlert(err.statusText, err.data.error.message);
                                })


                        
                }, function (err) {
                    $scope.registerError = err;
                    $scope.showAlert(err.statusText, err.data.error.message);
                });
        };

         $scope.showAlert = function (title, errorMsg) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: errorMsg
            });
            alertPopup.then(function () {
                console.log($scope.loginError);
            });
        };
})

.controller('DashCtrl', function($scope,Myuser,$location) {
        $scope.input = {};
        $scope.currentUser = Myuser.getCachedCurrent();
        $scope.addAccountid = function(){
          Myuser.prototype$updateAttributes({ id: $scope.currentUser.id }, { account_id: $scope.input.accountid }); 
          // Myuser.logout({},$scope.currentUser.id);
          // $location.path('login');
        };
       
})

.controller('UsageCtrl',function($scope,$state){
 $scope.Graph7 = function(){
    $state.go('tab.usageweekly1');
  };
  $scope.Detail7 = function(){
    $state.go('tab.usageweekly2');
  };
  $scope.Graph30 = function(){
    $state.go('tab.usagemonthly2');
  };
  $scope.Detail30 = function(){
    $state.go('tab.usagemonthly1');
  };
  $scope.Graph365 = function(){
    $state.go('tab.usageyearly2');
  };
  $scope.Detail365 = function(){
    $state.go('tab.usageyearly1');
  };

})

.controller('UsageDetailCtrlweekly',function($scope,Myuser,$state,$ionicPopup,Reimburse_claim){

  $scope.claims = [];
    $scope.currentUser = Myuser.getCachedCurrent();

  function getAllClaims() {
    Reimburse_claim.find({filter:{where:{account_id : Myuser.getCachedCurrent().account_id}}},function(list){
      for(i=0; i<list.length;i++){
        if(new Date(list[i].toJSON().date_of_expense).getMonth() == new Date().getMonth() && (new Date().getDate() - new Date(list[i].toJSON().date_of_expense).getDate()) <= 7)
        {
          var temp = {date_of_expense : (new Date(list[i].toJSON().date_of_expense)).toDateString(), total_reimbursement : list[i].toJSON().total_reimbursement};
          $scope.claims.push(temp);
        }
    }
    });
  }
  getAllClaims();

})

.controller('UsageDetailCtrlmonthly',function($scope,Myuser,$state,$ionicPopup,Reimburse_claim){
  $scope.claims = [];
  $scope.currentUser = Myuser.getCachedCurrent();

  function getAllClaims() {
    Reimburse_claim.find({filter:{where:{account_id : Myuser.getCachedCurrent().account_id}}},function(list){
      for(i=0; i<list.length;i++){
        if(new Date(list[i].toJSON().date_of_expense).getMonth() == new Date().getMonth())
        {
          var temp = {date_of_expense : (new Date(list[i].toJSON().date_of_expense)).toDateString(), total_reimbursement : list[i].toJSON().total_reimbursement};
          $scope.claims.push(temp);
        }
      //   list[i].date_of_expense = (new Date(list[i].toJSON().date_of_expense)).toDateString();
      // $scope.claims.push(list[i].toJSON());
    }
    });
  }
  getAllClaims();

})

.controller('UsageDetailCtrlyearly',function($scope,Myuser,$state,$ionicPopup,Reimburse_claim){
  $scope.claims = [];
  $scope.currentUser = Myuser.getCachedCurrent();

  function getAllClaims() {
    Reimburse_claim.find({filter:{where:{account_id : Myuser.getCachedCurrent().account_id}}},function(list){
      for(i=0; i<list.length;i++){        
          var temp = {date_of_expense : (new Date(list[i].toJSON().date_of_expense)).toDateString(), total_reimbursement : list[i].toJSON().total_reimbursement};
          $scope.claims.push(temp);

      //   list[i].date_of_expense = (new Date(list[i].toJSON().date_of_expense)).toDateString();
      // $scope.claims.push(list[i].toJSON());
    }
    });
  }
  getAllClaims();

})

.controller('ClaimCtrl', function($scope,$state) {
  $scope.viewClaim = function(){
    $state.go('tab.claimDetails');
  };

  $scope.newClaim = function(){
    $state.go('tab.newClaim');
  };

})

.controller('ClaimDetailCtrl', function($scope,Myuser,$state,$ionicPopup,Reimburse_claim) {
  $scope.claims = [];
  $scope.input = {};
  $scope.currentUser = Myuser.getCachedCurrent();

  function getAllClaims() {
    Reimburse_claim.find({filter:{where:{account_id : Myuser.getCachedCurrent().account_id}}},function(list){
      for(i=0; i<list.length;i++){
        // console.dir((new Date()).getMonth())
        list[i].date_of_expense = (new Date(list[i].toJSON().date_of_expense)).toDateString();
      $scope.claims.push(list[i].toJSON());
    }
    });
   
  }

  $scope.addClaim = function() {
    $scope.currDate = new Date();
    $scope.newClaim = {"trans_id":$scope.input.trans_id,"account_id":$scope.currentUser.account_id,"date_of_expense":$scope.currDate.toJSON(),"payment_method":$scope.input.payment_method,"total_reimbursement":$scope.input.total_reimbursement,"status":"Processing","description":$scope.input.description};
    console.dir($scope.newClaim);
    Reimburse_claim.create($scope.newClaim);
    var alertPopup = $ionicPopup.alert({title: 'Claim Fired!', template: 'View it in details!'});
    $state.go('tab.claim');

  }
 
  $scope.deleteClaim = function(idt) {
    Reimburse_claim.deleteById({id:idt})
    .$promise
    .then(function () {
      $scope.claims = [];
      getAllClaims();
    });
  }
 
  getAllClaims();
})

.controller("ExampleController", function($scope) {
 
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['A', 'B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
 
})
;
