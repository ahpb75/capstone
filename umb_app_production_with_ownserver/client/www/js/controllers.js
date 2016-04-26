angular.module('umb-hsa.controllers', [])

.controller('TabCtrl',function($scope,$state,$window,$http){

 $scope.home = function(){

$state.go('tab.dash', {}, {reload: true});
  // $http.get('#/tab/dash')
  //    .success(function() {
  //     getBalance();
  //     getProfile();
  //    })
  };

  $scope.activity = function(){
    $state.go('tab.usage');
  };
  $scope.claim = function(){

    $state.go('tab.claim');
  }
})

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
                    $state.go('tab.dash');
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

.controller('DashCtrl', function($ionicPopup,$window,$http,$scope,Myuser,$location,Balance_history,$state,Account_info,dataService,Bal_history) {
       $scope.bal_hists = [];
       $scope.doRefresh = function() {
      $http.get('#')
     .success(function() {
      getBalance();
      getProfile();
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
       };

       $scope.logout = function(){
      var alertPopup = $ionicPopup.confirm({
                title: "Logout Confirmation",
                template: "Do you want to logout?",
                scope:$scope,
                buttons:[{text:'No',type:'button-positive'},{text:'Yes',type:'button-assertive',onTap:function(){$state.go('login');
        $window.location.reload(true);}}]
            });
    
       };

       function getBalance() {
          Balance_history.find({filter:{where:{account_id : Myuser.getCachedCurrent().account_id}}},function(list){
          var temp = list[0].toJSON().curr_balance;
          temp = Math.round(temp * 100) / 100;
          dataService.addBalance(temp);
                  $scope.curbal = dataService.getBalance();
        $scope.avabal = dataService.getBalance();
          });
         }
                 getBalance();
        $scope.input = {};
        $scope.currentUser = Myuser.getCachedCurrent();
        $scope.addAccountid = function(){
          Myuser.prototype$updateAttributes({ id: $scope.currentUser.id }, { account_id: $scope.input.accountid });
        };

        

         function getProfile(){
          Account_info.find({filter:{where:{ id:$scope.currentUser.account_id}}},function(list){
            $scope.input = list[0].toJSON();
          });
         }

        getProfile();

        $scope.ChangeProfile = function(){
          Account_info.prototype$updateAttributes({id: $scope.currentUser.account_id},{routing_number: $scope.input.routing_number,account_number:$scope.input.account_number,first_name:$scope.input.first_name,last_name:$scope.input.last_name,email:$scope.input.email,phone:$scope.input.phone,street_address:$scope.input.street_address,city:$scope.input.city,country:$scope.input.country,zipcode:$scope.input.zipcode});
          getProfile();
          $state.go($state.current, {}, {reload: true});
        };

        function getBal_hist(){
          Bal_history.find({filter:{where:{account_id:$scope.currentUser.account_id}}},function(list){
            for(i = 0; i < list.length; i++){
              list[i].date = (new Date(list[i].toJSON().date).toDateString());
            $scope.bal_hists.push(list[i].toJSON());
          }
          })
        }
        getBal_hist();

    $scope.profile = function(){
      $state.go('tab.profile');
    }

    $scope.tax = function(){
      $state.go('tab.tax');
    }

    $scope.bal_hist = function(){
      $state.go('tab.bal_hist');
    }
})

.controller('UsageCtrl',function($scope,$state){
 $scope.TransHisMon = function(){
    $state.go('tab.transHisMon');
  };
  $scope.ReimbHisMon = function(){
    $state.go('tab.reimbHisMon');
  };
  $scope.TransHisQua = function(){
    $state.go('tab.transHisQua');
  };
  $scope.ReimbHisQua = function(){
    $state.go('tab.reimbHisQua');
  };
  $scope.TransHisYear = function(){
    $state.go('tab.transHisYearly');
  };
  $scope.ReimbHisYear = function(){
    $state.go('tab.reimbHisYearly');
  };

})

.controller('transHisMonCtrl',function($scope,$state,$ionicPopup,Transactions,Myuser,dataService){
  $scope.trans = [];
  $scope.message = {};
  $scope.currentUser = Myuser.getCachedCurrent();
  function getAllTrans() {
    Transactions.find({filter:{where:{account_id : Myuser.getCachedCurrent().account_id}}},function(list){
      for(i=0; i<list.length;i++){
         if(new Date(list[i].toJSON().trans_date).getMonth() == new Date().getMonth())
        {
          $scope.trans.push(list[i]);
        }
    }
    });
  }
  getAllTrans();

  $scope.show = function(i){
    Transactions.find({filter:{where:{trans_id : i}}},function(list){
      var t = list[0].toJSON();
      var d = (new Date(list[0].toJSON().trans_date)).toDateString();
      $scope.message = "<strong>Date of Expense : </strong><br>"+d+"<br><strong>Transaction Name : </strong><br>"+t.trans_name+"<br><strong>Transaction Category : </strong><br>"+t.trans_category+"<br><strong>Provider Name : </strong><br>"+t.provider_name+"<br><strong>Note : </strong><br>"+t.note+"<br><strong>Amount : </strong><br>"+t.amount+"<br><strong>Transaction Image : </strong><br>"+t.trans_image;
 var alertPopup = $ionicPopup.alert({
                title: "Details",
                template: $scope.message
            });    })
  }

})

.controller('transHisMonCtrl2',function($scope,$state,$ionicPopup,Transactions,Myuser,dataService){
  $scope.trans = [];
  $scope.t = {};
  $scope.message = {};
  $scope.currentUser = Myuser.getCachedCurrent();
  function getAllTrans() {
    Transactions.find({filter:{where:{account_id : Myuser.getCachedCurrent().account_id,Processed:false}}},function(list){
      for(i=0; i<list.length;i++){
                console.dir(list[i]);

          $scope.trans.push(list[i]);
    }
    });
  }
  getAllTrans();
  console.dir($scope.trans);

  $scope.delete = function(i){
    Transactions.deleteById({_id:i})
    .$promise
    .then(function () {
      $scope.trans = [];
      getAllTrans();
    });
  };
  $scope.show = function(i){
    Transactions.find({filter:{where:{trans_id : i}}},function(list){
       $scope.t = list[0].toJSON();
      var d = (new Date(list[0].toJSON().trans_date)).toDateString();
      $scope.message = "<strong>Date of Expense : </strong><br>"+d+"<br><strong>Transaction Name : </strong><br>"+$scope.t.trans_name+"<br><strong>Transaction Category : </strong><br>"+$scope.t.trans_category+"<br><strong>Provider Name : </strong><br>"+$scope.t.provider_name+"<br><strong>Note : </strong><br>"+$scope.t.note+"<br><strong>Amount : </strong><br>"+$scope.t.amount+"<br><strong>Transaction Image : </strong><br>"+$scope.t.trans_image;
      var alertPopup = $ionicPopup.confirm({
                title: $scope.message,
                template: "Do you want to claim it ?"
            });
      alertPopup.then(function(res){
        if(res){
          dataService.addTransaction($scope.t);
          $state.go('tab.newClaim');
        }
          else{
          }
      })
   
})
  }

})

.controller('reimbHisMonCtrl',function($scope,Myuser,$state,$ionicPopup,Reimburse_claim,Transactions){
   $scope.claims = [];
    $scope.currentUser = Myuser.getCachedCurrent();
    $scope.fi = '-d';
    $scope.oDate = function(){
      $scope.fi = '-d';
    }
    $scope.oAmount = function(){
      $scope.fi = '-total_reimbursement';
    }

  function getAllClaims() {
    Reimburse_claim.find({filter:{where:{account_id : Myuser.getCachedCurrent().account_id}}},function(list){
      for(i=0; i<list.length;i++){
        if(new Date(list[i].toJSON().date_of_claim).getMonth() == new Date().getMonth())
        {
          var temp = {d:list[i].toJSON().date_of_claim,date_of_claim : (new Date(list[i].toJSON().date_of_claim)).toDateString(), total_reimbursement : list[i].toJSON().total_reimbursement};
          $scope.claims.push(temp);
        }
    }
    });
  }
  getAllClaims();

  $scope.viewGraph = function(){
    $state.go('tab.usageyearly2');
  }
})


.controller('transHisQuaCtrl',function($scope,Myuser,$state,$ionicPopup,Reimburse_claim,Transactions){
  $scope.claims = [];
  $scope.temp = [];
  $scope.currentUser = Myuser.getCachedCurrent();
  $scope.count = 1;
   $scope.fi = '-d';
    $scope.oDate = function(){
      $scope.fi = '-d';
    }
    $scope.oAmount = function(){
      $scope.fi = '-total_reimbursement';
    }
  function getAllClaims() {
    Transactions.find({filter:{where:{account_id : Myuser.getCachedCurrent().account_id}}},function(list){
      for(i=0; i<list.length;i++){
        if(new Date(list[i].toJSON().trans_date).getMonth() < 3)
        {
          $scope.temp.push(list[i]);
        }
    }
      $scope.claims.push($scope.temp);
      $scope.temp = [];
       for(i=0; i<list.length;i++){
        if(new Date(list[i].toJSON().trans_date).getMonth() < 6 && new Date(list[i].toJSON().trans_date).getMonth() >=3 )
        {
          $scope.temp.push(list[i]);
        }
    }
      $scope.claims.push($scope.temp);
            $scope.temp = [];
       for(i=0; i<list.length;i++){
        if(new Date(list[i].toJSON().trans_date).getMonth() < 9 && new Date(list[i].toJSON().trans_date).getMonth() >=6)
        {
          $scope.temp.push(list[i]);
        }
    }
      $scope.claims.push($scope.temp);
            $scope.temp = [];
       for(i=0; i<list.length;i++){
        if(new Date(list[i].toJSON().trans_date).getMonth() < 12 && new Date(list[i].toJSON().trans_date).getMonth() >=9)
        {
          $scope.temp.push(list[i]);
        }
    }
      $scope.claims.push($scope.temp);
            $scope.temp = [];
    });

  }
  getAllClaims();

})



.controller('reimbHisQuaCtrl',function($scope,Myuser,$state,$ionicPopup,Reimburse_claim){
  $scope.claims = [];
  $scope.temp = [];
  $scope.currentUser = Myuser.getCachedCurrent();
  $scope.count = 1;

  function getAllClaims() {
    Reimburse_claim.find({filter:{where:{account_id : Myuser.getCachedCurrent().account_id}}},function(list){
      for(i=0; i<list.length;i++){
        if(new Date(list[i].toJSON().date_of_claim).getMonth() < 3)
        {
          var t = {d:list[i].toJSON().date_of_claim,date_of_claim : (new Date(list[i].toJSON().date_of_claim)).toDateString(), total_reimbursement : list[i].toJSON().total_reimbursement};
          $scope.temp.push(t);
        }
    }
      $scope.claims.push($scope.temp);
      $scope.temp = [];
       for(i=0; i<list.length;i++){
        if(new Date(list[i].toJSON().date_of_claim).getMonth() < 6 && new Date(list[i].toJSON().date_of_claim).getMonth() >=3 )
        {
          var t = {d:list[i].toJSON().date_of_claim,date_of_claim : (new Date(list[i].toJSON().date_of_claim)).toDateString(), total_reimbursement : list[i].toJSON().total_reimbursement};
          $scope.temp.push(t);
        }
    }
      $scope.claims.push($scope.temp);
            $scope.temp = [];
       for(i=0; i<list.length;i++){
        if(new Date(list[i].toJSON().date_of_claim).getMonth() < 9 && new Date(list[i].toJSON().date_of_claim).getMonth() >=6)
        {
          var t = {d:list[i].toJSON().date_of_claim,date_of_claim : (new Date(list[i].toJSON().date_of_claim)).toDateString(), total_reimbursement : list[i].toJSON().total_reimbursement};
          $scope.temp.push(t);
        }
    }
      $scope.claims.push($scope.temp);
            $scope.temp = [];
       for(i=0; i<list.length;i++){
        if(new Date(list[i].toJSON().date_of_claim).getMonth() < 12 && new Date(list[i].toJSON().date_of_claim).getMonth() >=9)
        {
          var t = {d:list[i].toJSON().date_of_claim,date_of_claim : (new Date(list[i].toJSON().date_of_claim)).toDateString(), total_reimbursement : list[i].toJSON().total_reimbursement};
          $scope.temp.push(t);
        }
    }
      $scope.claims.push($scope.temp);
            $scope.temp = [];
    });
  }
  getAllClaims();
   $scope.viewGraph = function(){
    $state.go('tab.usageyearly2');
  }

})

.controller('transHisYearlyCtrl',function($scope,$state,$ionicPopup,Transactions,Myuser,dataService){
  $scope.trans = [];
  $scope.message = {};
  $scope.currentUser = Myuser.getCachedCurrent();
  function getAllTrans() {
    Transactions.find({filter:{where:{account_id : Myuser.getCachedCurrent().account_id}}},function(list){
      for(i=0; i<list.length;i++){
        
          $scope.trans.push(list[i]);

    }
    });
  }
  getAllTrans();

  $scope.show = function(i){
    Transactions.find({filter:{where:{trans_id : i}}},function(list){
      var t = list[0].toJSON();
      var d = (new Date(list[0].toJSON().trans_date)).toDateString();
      $scope.message = "<strong>Date of Expense : </strong><br>"+d+"<br><strong>Transaction Name : </strong><br>"+t.trans_name+"<br><strong>Transaction Category : </strong><br>"+t.trans_category+"<br><strong>Provider Name : </strong><br>"+t.provider_name+"<br><strong>Note : </strong><br>"+t.note+"<br><strong>Amount : </strong><br>"+t.amount+"<br><strong>Transaction Image : </strong><br>"+t.trans_image;
 var alertPopup = $ionicPopup.alert({
                title: "Details",
                template: $scope.message
            });    })
  }

})

.controller('reimbHisYearlyCtrl',function($scope,Myuser,$state,$ionicPopup,Reimburse_claim,Transactions){
   $scope.claims = [];
    $scope.currentUser = Myuser.getCachedCurrent();
    $scope.fi = '-d';
    $scope.oDate = function(){
      $scope.fi = '-d';
    }
    $scope.oAmount = function(){
      $scope.fi = '-total_reimbursement';
    }
  function getAllClaims() {
    Reimburse_claim.find({filter:{where:{account_id : Myuser.getCachedCurrent().account_id}}},function(list){
      for(i=0; i<list.length;i++){
          var temp = {date_of_claim : (new Date(list[i].toJSON().date_of_claim)).toDateString(), total_reimbursement : list[i].toJSON().total_reimbursement, d: list[i].toJSON().date_of_claim};
          $scope.claims.push(temp);
        
    }
    });
  }
  getAllClaims();

  $scope.viewGraph = function(){
    $state.go('tab.usageyearly2');
  }
})


.controller('ClaimCtrl', function($scope,$state) {
  $scope.viewClaim = function(){
    $state.go('tab.claimDetails');
  };

  $scope.newClaim = function(){
    $state.go('tab.chooseTrans');
  };
  $scope.newTransactions = function(){
    $state.go('tab.newTransaction');
  }

})

.controller('ClaimDetailCtrl', function($scope,Myuser,$state,$ionicPopup,Reimburse_claim) {
  $scope.claims = [];
  $scope.input = {};
  // $scope.show = 0;
  $scope.currentUser = Myuser.getCachedCurrent();

  function getAllClaims() {
    Reimburse_claim.find({filter:{where:{account_id : Myuser.getCachedCurrent().account_id}}},function(list){
      for(i=0; i<list.length;i++){
                list[i].date_of_claim = (new Date(list[i].toJSON().date_of_claim)).toDateString();

        list[i].date_of_expense = (new Date(list[i].toJSON().date_of_expense)).toDateString();
      // console.dir(list[i]);
      var temp = {s1:list[i].date_of_claim,s6:list[i].date_of_expense,s2:list[i].payment_method,s3:list[i].total_reimbursement,s4:list[i].trans_id,s5:list[i].status,id:list[i].id};
      $scope.claims.push(temp);
    }
    console.dir($scope.claims);
    });

  }

   $scope.show = function (i1,i2,i3,i4,i5,i6) {

        var message = "<strong>Date of Claim : </strong><br>"+i1+"<strong>Date of Expense : </strong><br>"+i6+"<br><strong>Payment Method : </strong><br>"+i2+"<br><strong>Reimbursement : </strong><br>"+i3+"<br><strong>Transaction ID : </strong><br>"+i4+"<br><strong>Status : </strong><br>"+i5;
            var alertPopup = $ionicPopup.alert({
                title: "Details",
                template: message
            });
            };


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

.controller("ExampleController", function(Account_info,$scope,Reimburse_claim,Myuser) {
   $scope.m1 = 1;
  $scope.m2 = 1;
  $scope.m3 = 1;
  $scope.m4 = 1;
  $scope.m5 = 1;
  $scope.m6 = 1;
  $scope.m7 = 1;
  $scope.m8 = 1;
  $scope.m9 = 1;
  $scope.m10 = 1;
  $scope.m11 = 1;
  $scope.m12 = 1;
 
  function getAllClaims(){

    Reimburse_claim.find(
      {filter:{where:{account_id : Myuser.getCachedCurrent().account_id}}},function(list)
      {
      for(i=0; i<list.length;i++){
       if(new Date(list[i].toJSON().date_of_claim).getMonth() == 0)
       {$scope.m1 = $scope.m1 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 1)
          {$scope.m2 = $scope.m2 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 2)
          {$scope.m3 = $scope.m3 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 3)
          {$scope.m4 = $scope.m4 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 4)
          {$scope.m5 = $scope.m5 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 5)
          {$scope.m6 = $scope.m6 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 6)
          {$scope.m7 = $scope.m7 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 7)
          {$scope.m8 = $scope.m8 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 8)
          {$scope.m9 = $scope.m9 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 9)
          {$scope.m10 = $scope.m10 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 10)
          {$scope.m11 = $scope.m11 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 11)
          {$scope.m12 = $scope.m12 + list[i].toJSON().total_reimbursement;}
        else{}}
                  $scope.labels = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"];
    $scope.series = ['A'];
    $scope.data = [
        [$scope.m1, $scope.m2, $scope.m3, $scope.m4, $scope.m5, $scope.m6, $scope.m7, $scope.m8, $scope.m9, $scope.m10 ,$scope.m11, $scope.m12]    ];

  }
  )
        $scope.labels = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"];
    $scope.series = ['A'];
    $scope.data = [
        [$scope.m1, $scope.m2, $scope.m3, $scope.m4, $scope.m5, $scope.m6, $scope.m7, $scope.m8, $scope.m9, $scope.m10 ,$scope.m11, $scope.m12]    ];

  }
  getAllClaims();
    
})

.controller("ExampleController1", function(Account_info,$scope,Reimburse_claim,Myuser) {
  // $scope.claims = [];
  $scope.m1 = 1;
  $scope.m2 = 1;
  $scope.m3 = 1;
  $scope.m4 = 1;
  $scope.m5 = 1;
  $scope.m6 = 1;
  $scope.m7 = 1;
  $scope.m8 = 1;
  $scope.m9 = 1;
  $scope.m10 = 1;
  $scope.m11 = 1;
  $scope.m12 = 1;
  $scope.currentUser = Myuser.getCachedCurrent();

  function getAllClaims() {
    Reimburse_claim.find({filter:{where:{account_id : Myuser.getCachedCurrent().account_id}}},function(list){
      for(i=0; i<list.length;i++){
       if(new Date(list[i].toJSON().date_of_claim).getMonth() == 0)
       {$scope.m1 = $scope.m1 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 1)
          {$scope.m2 = $scope.m2 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 2)
          {$scope.m3 = $scope.m3 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 3)
          {$scope.m4 = $scope.m4 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 4)
          {$scope.m5 = $scope.m5 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 5)
          {$scope.m6 = $scope.m6 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 6)
          {$scope.m7 = $scope.m7 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 7)
          {$scope.m8 = $scope.m8 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 8)
          {$scope.m9 = $scope.m9 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 9)
          {$scope.m10 = $scope.m10 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 10)
          {$scope.m11 = $scope.m11 + list[i].toJSON().total_reimbursement;}
        else if(new Date(list[i].toJSON().date_of_claim).getMonth() == 11)
          {$scope.m12 = $scope.m12 + list[i].toJSON().total_reimbursement;}
        else{}
    }
    
    // $scope.labels = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"];
    // $scope.series = ['A'];
    // $scope.data = [[$scope.m1,
    // $scope.m2,
    // $scope.m3,
    // $scope.m4,
    // $scope.m5,
    // $scope.m6,
    // $scope.m7,
    // $scope.m8,
    // $scope.m9,
    // $scope.m10,
    // $scope.m11,
    // $scope.m12]];

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['A', 'B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];


  })
  }
  
  getAllClaims();

 
    // $scope.data.push($scope.m1);
    //  $scope.data.push($scope.m2);
    //   $scope.data.push($scope.m3);
    //    $scope.data.push($scope.m4);
    //     $scope.data.push($scope.m5);
    //      $scope.data.push($scope.m6);
    //       $scope.data.push($scope.m7);
    //        $scope.data.push($scope.m8);
    //         $scope.data.push($scope.m9);
    //          $scope.data.push($scope.m10);
    //           $scope.data.push($scope.m11);
    //            $scope.data.push($scope.m12);
    //            console.dir($scope.data);
   

}
)

.controller("NewTransactionCtrl", function (dataService,$scope, $state, $cordovaCamera, $http, $cordovaFileTransfer,$ionicPopup,Transactions,Myuser,ionicDatePicker) {
  $scope.input = {};
  $scope.i = {};
  $scope.itemsform= {};
  $scope.datee = {};
  // $scope.file_name = {};
  var ipObj1 = {
      callback: function (val) {  //Mandatory
        // console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        $scope.datee = new Date(val);
        $scope.input.datee = (new Date(val)).toDateString();
      },
      disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],
      from: new Date(2012, 1, 1), //Optional
      to: new Date(2016, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };
  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(ipObj1);
  }
  $scope.currentUser = Myuser.getCachedCurrent();
  $scope.addTransaction = function(){
    $scope.newTransaction = {"trans_image":file_name,"account_id":$scope.currentUser.account_id,"trans_date":$scope.currDate.toJSON(),"trans_category":$scope.input.category,"trans_name":$scope.input.ename,"provider_name":$scope.input.pname,"amount":$scope.input.amount,"Processed":false,"note":$scope.input.note,"payment_method":$scope.input.payment_method};
    Transactions.create($scope.newTransaction);
    var alertPopup = $ionicPopup.alert({title: 'Transaction Sent!', template: 'Go Claim it'});
    $state.go('tab.claim');
  }
   $scope.takePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URI,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };

                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        //$scope.imgsrc = imageData;
                        $scope.imgURI = imageData;
                        console.log(imageData);
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }

                $scope.choosePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };

                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        //$scope.imgURI = "data:image/jpeg;base64," + imageData;
                        $scope.imgURI = imageData;
                        console.log(imageData);
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }

/*
                var apikey = "7de81a17-0390-4d0b-a08a-bf2b6aa59210";
                var postocrurl = "https://api.idolondemand.com/1/api/sync/ocrdocument/v1";
                $scope.fncall = function(){

                  var fd = new FormData();
                  fd.append("file", $scope.imgURI);
                  fd.append("apikey", apikey);

                  xhr = new XMLHttpRequest();
                  xhr.open('POST', postocrurl, true);

                  xhr.onreadystatechange = function() {
                      var r = fnReady();
                  }
                  xhr.onload = function(){ };
                  //xhr.onload = fnSuccess;
                  xhr.send(fd);
                }

                $scope.fnReady = function(){
                  if (xhr.readyState === 4){

                  var r = xhr.responseText;
                  if(r){

                  var json = JSON.parse(r);
                  var text_block = json.text_block;
                  if(text_block){
                    $(text_block).each(function(i) {
                      var txt = text_block[i].text;
                      console.log("responseHtml: "+"<div style=\"background-color:lightgray;\">"+text+"</div><br>");
                    });
                  }
                }else{
                  console.log("Error: no response.<br>");
                }
                }else{
                    console.log("xhr.readyState: "+xhr.readyState);
                }
              }

              */
  function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + '-' + month + '-' + year + '-' + hour + ':' + min + ':' + sec ;
  return time;
}

$scope.uploadForm= function(){
  $scope.items = undefined;
  $scope.a = {};
var i;

  //alert($scope.objForm);
  //alert($scope.objForm[0].value);
  $scope.user_input = [];
  $scope.stringVersion="";
for(i=0; i<$scope.objForm.length; ++i){

  var stri = String($scope.objForm[i].value);
  $scope.user_input.push(stri);
  //alert($scope.user_input[i]);
  $scope.stringVersion = $scope.stringVersion + " \n " + $scope.user_input[i] + " <br>";
}
var alertPopup = $ionicPopup.alert({
                title: "Please Review the Data",
                template: $scope.stringVersion
            });
//alert($scope.stringVersion);


  //alert();

}

$scope.uploadImage = function(imageData){

    // var alertPopup = $ionicPopup.alert({title: 'Transaction Sent!', template: 'Go Claim it'});
    // $state.go('tab.claim');
  var url = "http://capstone.eastus.cloudapp.azure.com/upload/upload2.php";

     //File for Upload
     //var targetPath = cordova.file.externalRootDirectory + "logo_radni.png";
      var targetPath = $scope.imgURI;
      var d = new Date();
      var da = d.getTime();
      var conver_date = new Date(da);
      var string_date = String(conver_date);
      var date_final = string_date.replace(/\s+/g, '-');
      var filename = $scope.currentUser.account_id + "_" + date_final + ".jpg";
      $scope.file_name = filename;
     var options = {
          fileKey: "file",
          fileName: filename,
          chunkedMode: false,
          mimeType: "image/jpg",
          params : {'directory':'upload', 'fileName':filename}
      };

      $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
          alert("Receipt Successfully Uploaded!");
      }, function (err) {
          alert("ERROR: " + JSON.stringify(err));
      }, function (progress) {
          // PROGRESS HANDLING GOES HERE
      });

        var imgData2 = readFileAsBinaryString($scope.imgURI);

         var apikey = "7de81a17-0390-4d0b-a08a-bf2b6aa59210";
         var api_url = "https://api.havenondemand.com/1/api/sync/ocrdocument/v1";
         var options2 = {
           params : { 'apikey': apikey, 'file': imgData2 }
         };
         $cordovaFileTransfer.upload(api_url, targetPath, options2).then(function (result) {
             console.log("SUCCESS: " + JSON.stringify(result.response));
             //$scope.res = JSON.stringify(result.response);
             var js = JSON.parse(result.response);
             console.log(js);
             //alert(js.text_block[0].text);
             var info = js.text_block[0].text;
             var string_info = String(info);
             var array_response = string_info.match(/^.*((\r\n|\n|\r)|$)/gm);
             console.log(array_response[1]);
             $scope.items = array_response;
             $scope.res = js.text_block[0].text;
             $scope.show_form = true;
             $scope.newValues = array_response;
             $scope.jsonform =[];
             $scope.objForm = [];
             //alert($scope.items);
             var index;
             var index2;
             var x = "hi";
             var y = "no";
             for(index=0; index<$scope.items.length; ++index){
               //var data = '{"value" : ' + '"' + x + '"' + '}' ;

               var data = $scope.items[index].replace(/\r?\n|\r/g, " ");
               $scope.jsonform[index] = '{"value" : ' + '"' + data + '"' + '}' ;
                 //$scope.jsonform.push('{"value" : ' + '"' + $scope.items[index] + '"' + '}');
                var data2 = JSON.parse($scope.jsonform[index]);
                $scope.objForm.push(data2);

                 //alert($scope.jsonform);
                 //alert($scope.objForm[index].value);

                // alert(data4);
                 //var data = JSON.parse($scope.jsonform[index]);
                 //alert(data);

               }

             /*
             for(index2=0; index2<$scope.items.size; ++index2){
               var jsonhold = JSON.parse($scope.jsonform[index2]);
               $scope.objForm.push(jsonhold);

             } */

            // var y = eval()



         }, function (err) {
             alert("ERROR: " + JSON.stringify(err));
         }, function (progress) {

         }

         );
         // uses this function
         function readFileAsBinaryString(file) {
               var reader = new FileReader();
               reader.onloadend = function(evt) {
                   var imgData = evt.target.result;
                   return imgData;
               };
               reader.onerror = function(evt) { /** handle error */ };
               reader.readAsBinaryString(file);
           }

}
    $scope.getData = function(imageData) {
      var apikey = "7de81a17-0390-4d0b-a08a-bf2b6aa59210";
        $http.get("https://api.idolondemand.com/1/api/sync/ocrdocument/v1", { params: { "apikey": apikey, "file": $scope.imgURI}})
            .success(function(data) {
                 $scope.questions = [];
                 $scope.questions = data.text_block;
                console.log(data);
                console.log("hi");

                //$scope.text = data;



            })
            .error(function(data, error) {
                alert(error + "error");
            });
    }
}
)

// .controller("imageformCtrl",function($scope,dataService,$state){
//   $scope.objForm = dataService.getImagedata;
//   $scope.uploadForm = function(){
//     $state.go('tab.newClaim');
//   }
// })

.controller("NewClaimCtrl", function ($scope, $state,$cordovaCamera, $http, $cordovaFileTransfer,$ionicPopup,Reimburse_claim,Myuser,dataService,Transactions,Balance_history,dataService,Bal_history) {

$scope.claims = [];
  $scope.input = dataService.getTransaction();
  $scope.adate = $scope.input.trans_date;
  $scope.input.trans_date = (new Date($scope.input.trans_date)).toDateString();
  $scope.currentUser = Myuser.getCachedCurrent();
    $scope.curbal = dataService.getBalance();
        $scope.avabal = dataService.getBalance();
        $scope.bal = {};
function getBalance() {
          Balance_history.find({filter:{where:{account_id : Myuser.getCachedCurrent().account_id}}},function(list){
          $scope.bal = list[0].toJSON().id;
          });
         }
getBalance();

      $scope.addClaim = function() {
    $scope.currDate = new Date();
    $scope.newClaim = {"trans_id":$scope.input.trans_id,"account_id":$scope.currentUser.account_id,"date_of_claim":$scope.currDate.toJSON(),"date_of_expense":$scope.adate,"payment_method":$scope.input.payment_method,"total_reimbursement":$scope.input.amount,"description":$scope.input.description,"status":"Processed"};
    Reimburse_claim.create($scope.newClaim);
    Transactions.prototype$updateAttributes({id:$scope.input.trans_id},{Processed:true});
    $scope.curbal = $scope.curbal - $scope.input.amount;
        $scope.avabal = $scope.avabal - $scope.input.amount;
        dataService.addBalance($scope.curbal);
    Balance_history.prototype$updateAttributes({id:$scope.bal},{curr_balance:$scope.curbal,avail_balance:$scope.avabal});
    $scope.track = {"date":$scope.currDate,"account_id":$scope.currentUser.account_id,"trans_id":$scope.input.trans_id,"amount":$scope.input.amount,"note":$scope.input.description,"balance":$scope.curbal};
    Bal_history.create($scope.track);
    var alertPopup = $ionicPopup.alert({title: 'Claim Sent!', template: 'View it in details!'});
    $state.go('tab.claim');

  }
               
  })

;
