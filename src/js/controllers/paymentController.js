angular
.module('oddJob')
.controller('PaymentController', PaymentController);

PaymentController.$inject = ['API_URL', '$http', '$window', '$state', '$stateParams', 'Job', 'User'];
function PaymentController(API_URL, $http, $window, $state, $stateParams, Job, User) {
  const vm = this;
  let requester;
  const Stripe = $window.Stripe;

  vm.card = {};
  vm.donation ={};
  vm.currency = 'gbp';
  vm.paymentSuccessful = false;

  Job
    .get($stateParams)
    .$promise
    .then(response =>{
      vm.job = response;
    });

  function paymentTransaction(data){
    $http
        .post(`${API_URL}/charges`, data)
        .then((res) => {
          if(res.status === 200) {
            vm.paymentSuccessful = true;

          } else {
            vm.paymentSuccessful = false;
          }
        });
  }

  vm.pay = function pay() {
    const tokenData = angular.copy(vm.card);
    delete tokenData.amount;
    Stripe.card.createToken(tokenData, (status, response) => {
      const data = {
        card: vm.card,
        token: response.id,
        payee: vm.card.payee,
        amount: vm.card.amount * 100,
        currency: vm.currency,
        job_id: $stateParams.id
      };
      paymentTransaction(data);
    });
  };

  function postPaymentRoute(req, res, next) {
  var token = req.body.token;
  stripe.charges.create({
    amount: req.body.amount,
    currency: req.body.currency,
    source: token,
    description: 'TEST'
  }, function(err) {
    if(err) return res.status(500).json({ message: err });
    res.status(200).json({ message: 'Payment successful' });
  })
  .catch(next);
}
}
