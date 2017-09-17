app.factory('usersFactory', function($http, $rootScope){

  var usersFactory = {};

  usersFactory.getUsers = function(){
    return $http.get('/employees')
        .then(function(response){
        return(response.data);
      });
  };

  usersFactory.addToList = function(newUser){
    return $http.post('/employees', newUser)
      .then(function(response){
        return response.data;
        },
        function(err){
          console.error(err);
        });
  };

  usersFactory.removeFromList = function (id) {
    return $http.delete('/employees/' + id).then(function(response){
        usersFactory.getUsers();
       },
         function(err){
          console.error(err);
        });
  };

  usersFactory.saveUser = function(id, updatedUser){
    return $http.put('/employees/' + id, updatedUser).then(function(response){

      usersFactory.getUsers();
      this.editable = false;

      },
        function(err){
          console.error(err);
    });
  };

  return usersFactory;

});
