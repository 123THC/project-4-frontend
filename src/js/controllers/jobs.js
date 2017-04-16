angular
  .module('oddJob')
  .controller('JobsIndexCtrl', JobsIndexCtrl)
  .controller('JobsShowCtrl', JobsShowCtrl)
  .controller('JobsEditCtrl', JobsEditCtrl)
  .controller('JobsNewCtrl', JobsNewCtrl);

JobsIndexCtrl.$inject = ['Job'];
function JobsIndexCtrl(Job) {
  const vm = this;

  vm.all = Job.query();
}

JobsShowCtrl.$inject = ['Job', '$stateParams', '$state'];
function JobsShowCtrl(Job, $stateParams, $state) {
  const vm = this;

  vm.job = Job.get($stateParams);

  function jobsDelete() {
    vm.job
      .$remove()
      .then(() => $state.go ('jobsIndex'));
  }

  vm.delete = jobsDelete;
}

JobsEditCtrl.$inject = ['Job', '$stateParams', '$state'];
function JobsEditCtrl(Job, $stateParams, $state) {
  const vm = this;

  vm.job = Job.get($stateParams);

  function jobsUpdate() {
    Job.update({ id: vm.job.id, job: vm.job })
    .$promise
    .then(() => $state.go('jobsShow', $stateParams));
  }

  vm.update = jobsUpdate;
}

JobsNewCtrl.$inject = ['Job', '$state'];
function JobsNewCtrl(Job, $state) {
  const vm = this;

  vm.job = {};

  function jobsCreate() {
    Job
      .save({ job: vm.bird })
      .$promise
      .then(() => $state.go('jobsIndex'));
  }

  vm.create = jobsCreate;
}
