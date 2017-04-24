angular
  .module('oddJob')
  .controller('JobsIndexCtrl', JobsIndexCtrl)
  .controller('JobsShowCtrl', JobsShowCtrl)
  .controller('JobsEditCtrl', JobsEditCtrl)
  .controller('JobsNewCtrl', JobsNewCtrl)
  .controller('JobsSelectionCtrl', JobsSelectionCtrl);

JobsIndexCtrl.$inject = ['Job', 'Category', 'filterFilter', 'orderByFilter', '$scope'];
function JobsIndexCtrl(Job, Category, filterFilter, orderByFilter, $scope) {
  const vm = this;
  vm.categories = Category.query();
  vm.all = Job.query();

  function filterJob() {
    console.log('filtering!');
    const params = vm.q;
    vm.filtered = filterFilter(vm.all, params);
    vm.filtered = filterFilter(vm.filtered, categoryFilter);
    vm.filtered = orderByFilter(vm.filtered, vm.sort);
  }

  function categoryFilter(job) {
    if (vm.filterCategory && vm.filterCategory.length) {
      return job.categories.find((category) => {
        return vm.filterCategory.find((id) => {
          return id === category.id;
        })
      });
    } else {
      return true;
    }
  }

  $scope.$watchGroup([
    () => vm.q,
    () => vm.all.$resolved,
    () => vm.sort
  ], filterJob);

  $scope.$watch(() => vm.filterCategory, filterJob, true);
  filterJob();
}


JobsShowCtrl.$inject = ['Job', '$stateParams', '$state', 'Category', '$auth', 'User', 'Comment'];
function JobsShowCtrl(Job, $stateParams, $state, Category, $auth, User, Comment) {
  const vm = this;

  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.job = Job.get($stateParams);
  vm.categories = Category.query();

  function addComment() {
    vm.comment.job_id = vm.job.id;
    Comment
      .save({ comment: vm.comment })
      .$promise
      .then((comment) => {
        vm.job.comments.push(comment);
        vm.comment = {};
      });
  }
  vm.addComment = addComment;

  function deleteComment(comment) {
    Comment
      .delete({ id: comment.id })
      .$promise
      .then(() => {
        const index = vm.job.comments.indexOf(comment);
        vm.job.comments.splice(index, 1);
      });
  }
  vm.deleteComment = deleteComment;

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

// this checks if there is a user logged in with a session token and if the job has loaded on the page so we can check it for the array of people applying and then check if that array includes the current user id ie. are you already applying for this job.
  function hasApplied() {
    return $auth.getPayload() && vm.job.$resolved && vm.job.applicant_ids.includes(vm.currentUser.id);
  }
  vm.hasApplied = hasApplied;
}


JobsEditCtrl.$inject = ['Job', '$stateParams', '$state', 'Category'];
function JobsEditCtrl(Job, $stateParams, $state, Category) {
  const vm = this;

  vm.categories = Category.query();

  Job.get($stateParams).$promise.then((job) => {
    vm.job = job;
    vm.job.date = new Date(job.date);
  });

  function jobsUpdate() {
    if(vm.jobsEditForm.$valid) {
      Job.update({ id: vm.job.id, job: vm.job })
      .$promise
      .then(() => $state.go('jobsShow', $stateParams));
    }
  }

  vm.update = jobsUpdate;
}

JobsNewCtrl.$inject = ['Job', '$state', 'Category'];
function JobsNewCtrl(Job, $state, Category) {
  const vm = this;

  vm.categories = Category.query();
  vm.job = {};

  function jobsCreate() {
    if(vm.jobsNewForm.$valid) {
      Job
        .save({ job: vm.job })
        .$promise
        .then(() => $state.go('jobsIndex'));
    }
  }
  vm.create = jobsCreate;
}

JobsSelectionCtrl.$inject = ['Job', '$state', '$stateParams', '$auth', 'User'];
function JobsSelectionCtrl(Job, $state, $stateParams, $auth, User) {
const vm = this;

vm.job = Job.get({ id: $stateParams.id });

User.get({ id: $stateParams.userid })
  .$promise
  .then(user => vm.chosenApplicant = user);

function selectApplicant() {

  vm.job.chosen_applicant = vm.chosenApplicant;
  vm.job.chosen_applicant_id = vm.chosenApplicant.id;

  Job.update({ id: vm.job.id, job: vm.job })
    .$promise
    .then(() => $state.reload());
}

vm.selectApplicant = selectApplicant;
}
