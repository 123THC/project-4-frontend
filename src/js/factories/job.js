angular
  .module('oddJob')
  .factory('Job', Job);

Job.$inject = ['$resource', 'API_URL'];
function Job($resource, API_URL) {
  date = Date.now();
  return new $resource(`${API_URL}/jobs/:id`, { id: '@id'}, {
    update: { method: 'PUT' }
  });
}
