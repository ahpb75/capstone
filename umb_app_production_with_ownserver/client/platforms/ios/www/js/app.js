angular.module('umb-hsa', ['ionic','ionic.service.core', 'umb-hsa.controllers', 'umb-hsa.services','ngCordova','backand'])

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

//   $cordovaTouchID.checkSupport().then(function() {
//     //2
//     $cordovaTouchID.authenticate("Please authenticate with your fingerprint!").then(function() {
//         // 3
//         alert("You are a trusty mate! Come in and find out...")
//     }, function (error) { // 4
//         // Hopefully, there will be a better callback code in future releases
//         if (error == "Fallback authentication mechanism selected.") {
//             // User selected to enter a password 
//         } else {
//             alert("Sorry, we are not able to grant access.");
//         }
//     });
// }, function (error) { // 5
//     alert(error); // TouchID not supported
// });

})

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})


.config(function($stateProvider, $urlRouterProvider,BackandProvider) {

  BackandProvider.setAppName('todo208240');
  // BackandProvider.setSignUpToken('14e14c05-daee-4e2c-934d-471380117e89');
  BackandProvider.setAnonymousToken('c23325f4-7213-48e9-961b-ee4dda31a7a9');

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

  .state('tab.usage', {
      url: '/usage',
      views: {
        'tab-usage': {
          templateUrl: 'templates/tab-usage.html',
          // controller: 'UsageCtrl'
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

  .state('tab.newClaim',{
    url:'/newClaim',
    views:{
      'tab-claim':{
        templateUrl:'templates/newClaim.html',
        controller: 'ClaimDetailCtrl'
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

});
