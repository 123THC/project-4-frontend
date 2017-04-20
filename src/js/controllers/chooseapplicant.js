angular
  .module('oddJob')
  .controller('ChooseApplicantCtrl', ChooseApplicantCtrl);

ChooseApplicantCtrl.$inject = ['Job', '$state', '$stateParams', '$http', 'API_URL'];
function ChooseApplicantCtrl(Job, $state, $stateParams, $http, API_URL) {
  const vm = this;

  vm.job = Job.get($stateParams);

 $http.get(`${API_URL}/users/${$stateParams.userid}`)
  .then(user => vm.chosenApplicant = user);

  function selectApplicant() {
    console.log(vm.job.title, vm.chosenApplicant.data.username );
  }

  vm.selectApplicant = selectApplicant;
}
