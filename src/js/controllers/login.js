angular
  .module('oddJob')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$auth', '$state'];
function LoginCtrl($auth, $state) {
  const vm = this;

  function register() {
    if(vm.registerForm.$valid) {
      $auth.signup(vm.user)
      .then(() => $state.go ('login'));
    }
  }

  vm.register = register;

  function login() {
    $auth.login(vm.credentials)
    .then(() => $state.go ('jobsIndex'));
  }

  vm.login = login;

  function authenticate(provider) {
    $auth.authenticate(provider)
    .then(() => $state.go ('jobsIndex'));
  }

  vm.authenticate = authenticate;
}
