angular
  .module('oddJob', ['ui.router', 'ngResource', 'satellizer', 'checklist-model', 'angularPayments'])
  .constant('API_URL', 'http://localhost:3000/api')
  .config(function() {
    Stripe.setPublishableKey('pk_test_ibj4waUD8wjECtYUk4CMd4pw');
  });
