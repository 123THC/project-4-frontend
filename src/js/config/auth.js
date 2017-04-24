angular
  .module('oddJob')
  .config(Auth);

Auth.$inject = ['$authProvider', 'API_URL'];
function Auth($authProvider, API_URL) {
  $authProvider.signupUrl = `${API_URL}/register`;
  $authProvider.loginUrl = `${API_URL}/login`;

  $authProvider.github({
    clientId: 'b965602cd0e0a15912b8',
    url: `${API_URL}/oauth/github`
  });
}
