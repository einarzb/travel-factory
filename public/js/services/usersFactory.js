app.factory('usersFactory', function($http, $rootScope){

  var usersFactory = {users: []};

  usersFactory.getLatLng = function(address){
  console.log(address);
  $http({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address
        }).then(function (response) {
            console.log('im working')
            console.log(response.data)
            // var titleMovie = response.data.Title;
            // var plot = response.data.Plot;
            // var movieYear = response.data.Year;
            // var actors = response.data.Actors;
            // var poster = response.data.Poster;
            // var priceTag = Math.floor(Math.random() * (20-5) + 5); //math.random
            //
            // console.log(titleMovie,plot,actors,poster,priceTag);
            // console.log(movieYear);

        //     var movieInfo = {
        //       titleMovie:titleMovie,
        //       plot:plot,
        //       movieYear:movieYear,
        //       actors:actors,
        //       poster:poster,
        //       priceTag:priceTag
        //     };
        //
        //     console.log(movieInfo);
        //     addMovie(movieInfo);
        //     return movieInfo;
        //
        // }, function errorCallback(response) {
        //     alert("please fill in correct name");
    });
}
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
