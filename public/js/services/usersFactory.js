app.factory('usersFactory', function($http, $rootScope){

  var usersFactory = {users: []};

  usersFactory.getUsers = function(){
    return $http.get('/travelfactory')
        .then(function(response){
        angular.copy(response.data, usersFactory.users);
        },
        function(err){
            console.error(err)
          });
  };

  usersFactory.addToList = function(newUser){
    return $http.post('/travelfactory', newUser)
      .then(function(response){
         //client
         usersFactory.users.push(response.data);
        },
        function(err){
          console.error(err);
        });
  };

  usersFactory.removeFromList = function (id) {
    return $http.delete('/travelfactory/' + id).then(function(response){
        usersFactory.getUsers();
       },
         function(err){
          console.error(err);
        });
  };

  usersFactory.saveUser = function(id, updatedUser){
    return $http.put('/travelfactory/' + id, updatedUser).then(function(response){
      usersFactory.getUsers();
      this.editable = false;

      },
        function(err){
          console.error(err);
    });
  };

  return usersFactory;

});
