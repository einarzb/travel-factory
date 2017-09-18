app.factory('usersFactory', function($http, $rootScope){

  var usersFactory = {users: []};
  var lat;

  usersFactory.getLatLng = function(address){
  return $http({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address
        }).then(function (response) {
            console.log(response);
            var lat = response.data.results[0].geometry.location.lat;
            var lng = response.data.results[0].geometry.location.lng;

            var userLocation = {
              lat:lat,
              lng:lng
            }
            usersFactory.addLngLat(userLocation);
            return userLocation;
        }, function errorCallback(response) {
            alert("please fill in correct address");
          });
}

      usersFactory.addLngLat = function(userLocation){
        console.log("im in addlnglat ");
        lat = userLocation.lat;
        lng = userLocation.lng;
return lat      }

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
