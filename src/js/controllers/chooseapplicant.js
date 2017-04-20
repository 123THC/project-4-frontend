angular
  .module('oddJob')
  .controller('ChooseApplicantCtrl', ChooseApplicantCtrl);

ChooseApplicantCtrl.$inject = ['Job', '$state', '$stateParams', '$http', 'API_URL', '$auth', 'User'];
function ChooseApplicantCtrl(Job, $state, $stateParams, $http, API_URL, $auth, User) {
  const vm = this;

  vm.job = Job.get($stateParams);

 $http.get(`${API_URL}/users/${$stateParams.userid}`)
  .then(user => vm.chosenApplicant = user);

  function selectApplicant() {
    console.log(vm.job.toJSON(), vm.chosenApplicant.data );
    vm.job.chosen_applicant = vm.chosenApplicant.data;
    console.log(vm.job.toJSON());
    vm.chosenApplicant.data.jobs_to_do.push(vm.job);
  }

  vm.selectApplicant = selectApplicant;
}
