angular
  .module('oddJob')
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl);

UsersShowCtrl.$inject = ['$stateParams', '$state', 'User'];
function UsersShowCtrl($stateParams, $state, User){
  const vm = this;

  vm.user = User.get($stateParams);

  function usersDelete() {
    vm.user
      .$remove()
      .then(() => $state.go('home'));
  }

  vm.delete = usersDelete;
}

UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersEditCtrl(User, $stateParams, $state) {
  const vm = this;

  vm.user = User.get($stateParams);

  function usersUpdate() {
    User.update({ id: vm.user.id, user: vm.user })
    .$promise
    .then(() => $state.go('usersShow', $stateParams));
  }

  vm.update = usersUpdate;
}
