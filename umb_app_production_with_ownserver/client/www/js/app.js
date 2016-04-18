angular.module('umb-hsa', ['ionic','ionic.service.core', 'umb-hsa.controllers', 'umb-hsa.services','ngResource','lbServices','chart.js','ngCordova'])

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
    templateUrl: 'templates/tabs.html'
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

.state('tab.usagemonthly1',{
    url:'/monthlyusage',
    views:{
      'tab-usage':{
        templateUrl:'templates/monthlyusage1.html',
        controller:'UsageDetailCtrlmonthly'
      }
    }
  })
.state('tab.usagemonthly2',{
    url:'/weeklyusage',
    views:{
      'tab-usage':{
        templateUrl:'templates/monthlyusage2.html',
        controller:'ExampleController'
      }
    }
  })
  .state('tab.usageyearly1',{
    url:'/yearlyusage',
    views:{
      'tab-usage':{
        templateUrl:'templates/yearlyusage1.html',
        controller:'UsageDetailCtrlyearly'
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