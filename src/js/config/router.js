angular
  .module('oddJob')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/'
    })
    .state('jobsIndex', {
      url: '/jobs',
      templateUrl: 'js/views/jobs/index.html',
      controller: 'JobsIndexCtrl as jobsIndex'
    })
    .state('jobsNew', {
      url: '/jobs/new',
      templateUrl: 'js/views/jobs/new.html',
      controller: 'JobsNewCtrl as jobsNew'
    })
    .state('jobsShow', {
      url: '/jobs/:id',
      templateUrl: 'js/views/jobs/show.html',
      controller: 'JobsShowCtrl as jobsShow'
    })
    .state('jobsEdit', {
      url: '/jobs/:id/edit',
      templateUrl: 'js/views/jobs/edit.html',
      controller: 'JobsEditCtrl as jobsEdit'
    })
    .state('applicantSelection', {
      url: '/jobs/:id/applicant/:userid',
      templateUrl: 'js/views/jobs/selection.html',
      controller: 'JobsSelectionCtrl as jobsSelection'
    })
    .state('payment', {
      url: '/jobs/:id/payment',
      templateUrl: 'js/views/jobs/payment.html',
      controller: 'PaymentController as payment'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/authentications/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/authentications/register.html',
      controller: 'LoginCtrl as login'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: 'js/views/users/show.html',
      controller: 'UsersShowCtrl as usersShow'
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: 'js/views/users/edit.html',
      controller: 'UsersEditCtrl as usersEdit'
    });

    $urlRouterProvider.otherwise('/');
}
