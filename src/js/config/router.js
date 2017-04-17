angular
  .module('oddJob')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
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
      url: 'jobs/:id/edit',
      templateUrl: 'js/views/jobs/edit.html',
      controller: 'JobsEditCtrl as jobsEdit'
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
    });

    $urlRouterProvider.otherwise('/jobs');
}
