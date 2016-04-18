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

.controller('DashCtrl', function($scope,Myuser,$location,Balance_history,$state,Account_info) {
        $scope.input = {};
        $scope.curbal = {};
        $scope.avabal = {};
        $scope.profile1 = {};
        $scope.currentUser = Myuser.getCachedCurrent();
        $scope.addAccountid = function(){
          Myuser.prototype$updateAttributes({ id: $scope.currentUser.id }, { account_id: $scope.input.accountid });
        };

        function getBalance() {
          Balance_history.find({filter:{where:{account_id : Myuser.getCachedCurrent().account_id}}},function(list){
          $scope.curbal = list[0].toJSON().curr_balance;
          $scope.avabal = list[0].toJSON().avail_balance;

          });
         }

         function getProfile(){
          Account_info.find({filter:{where:{ id:$scope.currentUser.account_id}}},function(list){
            $scope.profile1 = list[0].toJSON();
            $scope.input = list[0].toJSON();
          });
         }

        getBalance();
        getProfile();

        $scope.ChangeProfile = function(){
          Account_info.prototype$updateAttributes({id: $scope.currentUser.account_id},{routing_number: $scope.input.routing_number,account_number:$scope.input.account_number,fname:$scope.input.fname,lname:$scope.input.lname,email:$scope.input.email,phone_number:$scope.input.phone_number,street_address:$scope.input.street_address,city:$scope.input.city,state:$scope.input.state,zipcode:$scope.input.zipcode});
          getProfile();
          $state.go($state.current, {}, {reload: true});
        };


    $scope.profile = function(){
      $state.go('tab.profile');
    }

    $scope.tax = function(){
      $state.go('tab.tax');
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
    $state.go('tab.usagemonthly2');
  };
  $scope.ReimbHisQua = function(){
    $state.go('tab.usagemonthly1');
  };
  $scope.TransHisYear = function(){
    $state.go('tab.usageyearly2');
  };
  $scope.ReimbHisYear = function(){
    $state.go('tab.usageyearly1');
  };

})

.controller('transHisMonCtrl',function($scope,$state,$ionicPopup,Transactions,Myuser,dataService){
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
      // var alertPopup = $ionicPopup.confirm({
      //           title: $scope.message,
      //           template: "Do you want to claim it ?"
      //       });
      // alertPopup.then(function(res){
      //   if(res){
      //     dataService.addTransaction(i);
      //     $state.go('tab.newClaim');
      //   }
      //     else{
      //     }
      // })
 var alertPopup = $ionicPopup.alert({
                title: "Details",
                template: $scope.message
            });    })
  }

})

.controller('transHisMonCtrl2',function($scope,$state,$ionicPopup,Transactions,Myuser,dataService){
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
      var alertPopup = $ionicPopup.confirm({
                title: $scope.message,
                template: "Do you want to claim it ?"
            });
      alertPopup.then(function(res){
        if(res){
          dataService.addTransaction(i);
          $state.go('tab.newClaim');
        }
          else{
          }
      })
   
})
  }

})

.controller('reimbHisMonCtrl',function($scope,Myuser,$state,$ionicPopup,Reimburse_claim){
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
    }
    });
  }
  getAllClaims();

  $scope.viewGraph = function(){
    $state.go('tab.usagemonthly2');
  }
})




.controller('UsageDetailCtrlmonthly',function($scope,Myuser,$state,$ionicPopup,Reimburse_claim){
  $scope.claims = [];
  $scope.temp = [];
  $scope.currentUser = Myuser.getCachedCurrent();
  $scope.count = 1;

  function getAllClaims() {
    Reimburse_claim.find({filter:{where:{account_id : Myuser.getCachedCurrent().account_id}}},function(list){
      for(i=0; i<list.length;i++){
        if(new Date(list[i].toJSON().date_of_expense).getMonth() < 3)
        {
          var t = {date_of_expense : (new Date(list[i].toJSON().date_of_expense)).toDateString(), total_reimbursement : list[i].toJSON().total_reimbursement};
          $scope.temp.push(t);
        }
    }
      $scope.claims.push($scope.temp);
      $scope.temp = [];
       for(i=0; i<list.length;i++){
        if(new Date(list[i].toJSON().date_of_expense).getMonth() < 6 && new Date(list[i].toJSON().date_of_expense).getMonth() >=3 )
        {
          var t = {date_of_expense : (new Date(list[i].toJSON().date_of_expense)).toDateString(), total_reimbursement : list[i].toJSON().total_reimbursement};
          $scope.temp.push(t);
        }
    }
      $scope.claims.push($scope.temp);
            $scope.temp = [];
       for(i=0; i<list.length;i++){
        if(new Date(list[i].toJSON().date_of_expense).getMonth() < 9 && new Date(list[i].toJSON().date_of_expense).getMonth() >=6)
        {
          var t = {date_of_expense : (new Date(list[i].toJSON().date_of_expense)).toDateString(), total_reimbursement : list[i].toJSON().total_reimbursement};
          $scope.temp.push(t);
        }
    }
      $scope.claims.push($scope.temp);
            $scope.temp = [];
       for(i=0; i<list.length;i++){
        if(new Date(list[i].toJSON().date_of_expense).getMonth() < 12 && new Date(list[i].toJSON().date_of_expense).getMonth() >=9)
        {
          var t = {date_of_expense : (new Date(list[i].toJSON().date_of_expense)).toDateString(), total_reimbursement : list[i].toJSON().total_reimbursement};
          $scope.temp.push(t);
        }
    }
      $scope.claims.push($scope.temp);
            $scope.temp = [];
    });
    console.dir($scope.claims);
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
        list[i].date_of_expense = (new Date(list[i].toJSON().date_of_expense)).toDateString();
      // console.dir(list[i]);
      var temp = {s1:list[i].date_of_expense,s2:list[i].payment_method,s3:list[i].total_reimbursement,s4:list[i].trans_id,s5:list[i].status,id:list[i].id};
      $scope.claims.push(temp);
    }
    });

  }
  console.dir($scope.claims);


   $scope.show = function (i1,i2,i3,i4,i5) {

        var message = "<strong>Date of Expense : </strong><br>"+i1+"<br><strong>Payment Method : </strong><br>"+i2+"<br><strong>Reimbursement : </strong><br>"+i3+"<br><strong>Transaction ID : </strong><br>"+i4+"<br><strong>Status : </strong><br>"+i5;
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

.controller("ExampleController", function($scope) {

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['A', 'B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];

})

.controller("NewTransactionCtrl", function ($scope, $state, $cordovaCamera, $http, $cordovaFileTransfer,$ionicPopup,Transactions,Myuser) {
  $scope.input = {};
  $scope.currentUser = Myuser.getCachedCurrent();
  $scope.currDate = new Date();
  $scope.addTransaction = function(){
    $scope.newTransaction = {"account_id":$scope.currentUser.account_id,"trans_date":$scope.currDate.toJSON(),"trans_category":$scope.input.category,"trans_name":$scope.input.ename,"provider_name":$scope.input.pname,"amount":$scope.input.amount};
    Transactions.create($scope.newTransaction);
    var alertPopup = $ionicPopup.alert({title: 'Transaction Fired!', template: 'Go Claim it'});
    $state.go('tab.claim');
  }
})


.controller("NewClaimCtrl", function ($scope, $cordovaCamera, $http, $cordovaFileTransfer,$ionicPopup,Reimburse_claim,Myuser,dataService) {

$scope.claims = [];
  $scope.input = {};
  $scope.trans_id = dataService.getTransaction();
  $scope.currentUser = Myuser.getCachedCurrent();

      $scope.addClaim = function() {
    $scope.currDate = new Date();
    $scope.newClaim = {"trans_id":$scope.trans_id,"account_id":$scope.currentUser.account_id,"date_of_expense":$scope.currDate.toJSON(),"payment_method":$scope.input.payment_method,"total_reimbursement":$scope.input.total_reimbursement,"status":"Processing","description":$scope.input.description};
    console.dir($scope.newClaim);
    Reimburse_claim.create($scope.newClaim);
    var alertPopup = $ionicPopup.alert({title: 'Claim Fired!', template: 'View it in details!'});
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

$scope.uploadImage = function(imageData){
  var url = "http://capstone.eastus.cloudapp.azure.com/upload/upload2.php";

     //File for Upload
     //var targetPath = cordova.file.externalRootDirectory + "logo_radni.png";
      var targetPath = $scope.imgURI;
      var d = new Date();
      var da = d.getTime();
      var date = timeConverter(da);
     // File name only
     var filename = $scope.currentUser.account_id + "_" + date + ".jpg";

     var options = {
          fileKey: "file",
          fileName: filename,
          chunkedMode: false,
          mimeType: "image/jpg",
          params : {'directory':'upload', 'fileName':filename}
      };

      $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
          alert("SUCCESS: " + JSON.stringify(result.response));
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
             alert("SUCCESS: " + JSON.stringify(result.response));
             //$scope.res = JSON.stringify(result.response);
             var js = JSON.parse(result.response);
             console.log(js);
             alert(js.text_block[0].text);
             $scope.res = js.text_block[0].text;

         }, function (err) {
             alert("ERROR: " + JSON.stringify(err));
         }, function (progress) {

         });
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


                alert("data is" + data);
            })
            .error(function(data, error) {
                alert(error + "error");
            });
    }
  })

;
