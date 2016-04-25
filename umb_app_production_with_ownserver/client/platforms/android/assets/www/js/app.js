angular.module('umb-hsa', ['ionic','ionic.service.core', 'umb-hsa.controllers', 'umb-hsa.services','ngResource','lbServices','chart.js','ngCordova','ionic-datepicker'])

.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      // disableWeekdays: [6]
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })

.config(function($stateProvider, $urlRouterProvider) {

  
  $stateProvider

  .state('login', {
      url: '/login',
      templateUrl:"templates/login.html",
      controller: 'LoginCtrl'
  })

  .state('signup',{
    url: '/signup',
    templateUrl:"templates/signup.html",
    controller: 'SignupCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller:'TabCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.profile',{
    url: '/profile',
    views: {
      'tab-dash':{
        templateUrl: 'templates/profile.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.tax',{
    url: '/tax',
    views: {
      'tab-dash':{
        templateUrl: 'templates/tax.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.bal_hist',{
    url:'/bal_hist',
    views:{
      'tab-dash':{
        templateUrl:'templates/bal_hist.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.usage', {
      url: '/usage',
      views: {
        'tab-usage': {
          templateUrl: 'templates/tab-usage.html',
          controller: 'UsageCtrl'
        }
      }
    })

  .state('tab.transHisMon',{
    url:'/transHisMon',
    views:{
      'tab-usage':{
        templateUrl:'templates/transHisMon.html',
        controller:'transHisMonCtrl'
      }
    }
  })

  .state('tab.reimbHisMon',{
    url:'/reimbHisMon',
    views:{
      'tab-usage':{
        templateUrl:'templates/reimbHisMon.html',
        controller:'reimbHisMonCtrl'
      }
    }
  })

.state('tab.transHisQua',{
    url:'/transHisQua',
    views:{
      'tab-usage':{
        templateUrl:'templates/transHisQua.html',
        controller:'transHisQuaCtrl'
      }
    }
  })
.state('tab.reimbHisQua',{
    url:'/reimbHisQua',
    views:{
      'tab-usage':{
        templateUrl:'templates/reimbHisQua.html',
        controller:'reimbHisQuaCtrl'
      }
    }
  })
 .state('tab.transHisYearly',{
    url:'/transHisYearly',
    views:{
      'tab-usage':{
        templateUrl:'templates/transHisMon.html',
        controller:'transHisYearlyCtrl'
      }
    }
  })
.state('tab.reimbHisYearly',{
    url:'/reimbHisYearly',
    views:{
      'tab-usage':{
        templateUrl:'templates/reimbHisYearly.html',
        controller:'reimbHisYearlyCtrl'
      }
    }
  })
  .state('tab.usageyearly2',{
    url:'/weeklyusage',
    views:{
      'tab-usage':{
        templateUrl:'templates/yearlyusage2.html',
        controller:'ExampleController'
      }
    }
  })

  .state('tab.claim', {
    url: '/claim',
    views: {
      'tab-claim': {
        templateUrl: 'templates/tab-claim.html',
        controller: 'ClaimCtrl'
      }
    }
  })

   .state('tab.newTransaction',{
    url:'/newTransaction',
    views:{
      'tab-claim':{
        templateUrl:'templates/newTransactions.html',
        controller: 'NewTransactionCtrl'
      }
    }
  })

   .state('tab.chooseTrans',{
    url:'/chooseTrans',
    views:{
      'tab-claim':{
        templateUrl:'templates/transHisMon.html',
        controller:'transHisMonCtrl2'
      }
    }
   })

  .state('tab.newClaim',{
    url:'/newClaim',
    views:{
      'tab-claim':{
        templateUrl:'templates/newClaim.html',
        controller: 'NewClaimCtrl'
      }
    }
  })

  .state('tab.claimDetails',{
    url: '/claimDetails',
    views:{
      'tab-claim':{
        templateUrl: 'templates/claimDetails.html',
        controller: 'ClaimDetailCtrl'
    }
  }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

})