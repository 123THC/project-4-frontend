angular
  .module('oddJob')
  .controller('JobsIndexCtrl', JobsIndexCtrl)
  .controller('JobsShowCtrl', JobsShowCtrl)
  .controller('JobsEditCtrl', JobsEditCtrl)
  .controller('JobsNewCtrl', JobsNewCtrl);

JobsIndexCtrl.$inject = ['Job', 'Category'];
function JobsIndexCtrl(Job, Category) {
  const vm = this;
  vm.categories = Category.query();
  vm.all = Job.query();
}

JobsShowCtrl.$inject = ['Job', '$stateParams', '$state', 'Category', '$auth', 'User'];
function JobsShowCtrl(Job, $stateParams, $state, Category, $auth, User) {
  const vm = this;

  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.job = Job.get($stateParams);
  vm.categories = Category.query();

  function jobsDelete() {
    vm.job
      .$remove()
      .then(() => $state.go ('jobsIndex'));
  }

  vm.delete = jobsDelete;


  function jobsUpdate() {
    Job
      .update({id: vm.job.id, job: vm.job });
  }

  function toggleApplied() {
    const index = vm.job.applicant_ids.indexOf(vm.currentUser.id);
    if (index > -1) {
      vm.job.applicant_ids.splice(index, 1);
      vm.job.applicants.splice(index, 1);
    } else {
      vm.job.applicant_ids.push(vm.currentUser.id);
      vm.job.applicants.push(vm.currentUser);
    }
    jobsUpdate();
  }

  vm.toggleApplied = toggleApplied;

// this checks if there is a user logged in with a session token and if the job has loaded on the page so we can check it for the array of people attending and then check if that array includes the current user id ie. are you already attending.
  function hasApplied() {
    return $auth.getPayload() && vm.job.$resolved && vm.job.applicant_ids.includes(vm.currentUser.id);
  }
  vm.hasApplied = hasApplied;
}


JobsEditCtrl.$inject = ['Job', '$stateParams', '$state', 'Category'];
function JobsEditCtrl(Job, $stateParams, $state, Category) {
  const vm = this;

  vm.categories = Category.query();
  vm.job = Job.get($stateParams);

  function jobsUpdate() {
    Job.update({ id: vm.job.id, job: vm.job })
    .$promise
    .then(() => $state.go('jobsShow', $stateParams));
  }

  vm.update = jobsUpdate;
}

JobsNewCtrl.$inject = ['Job', '$state', 'Category'];
function JobsNewCtrl(Job, $state, Category) {
  const vm = this;

  vm.categories = Category.query();
  vm.job = {};

  function jobsCreate() {
    Job
      .save({ job: vm.job })
      .$promise
      .then(() => $state.go('jobsIndex'));
  }

  vm.create = jobsCreate;
}
