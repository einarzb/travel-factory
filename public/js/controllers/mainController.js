app.controller('mainController', function($scope, usersFactory) {
//initializing
  $scope.editable = false;
  $scope.editMode = true;


  $scope.createUserWithAddress = function(user) {
    usersFactory.getLatLng(user.address).then(function(response) {
        user.location = response;
        $scope.addUser(user);
        $scope.closeForm();
      }, function(err) {
        console.error(err);
        $scope.closeForm();
      });
  }

  var userCopy = this.copy;

  $scope.users = usersFactory.users;

  $scope.addUser = function(newUser) {
    usersFactory.addToList(newUser);
  };

  $scope.removeFromList = usersFactory.removeFromList;

  $scope.editItem = function(userCopy){
    this.editable = true;
    $scope.editMode = false;

  };

   $scope.closeForm = function(){
    $('#formModal').modal('hide');
  }

  $scope.saveUser = function(id, updatedUser){
      usersFactory.saveUser(id, updatedUser);
      $scope.editMode = true;
      this.editable = false;

  }

  // $scope.createUserWithAddress = function(newUser) {
  //   $scope.searchAddress(newUser);
  //   setTimeout(function(){ console.log(newUser); $scope.addUser(newUser); }, 1000);
  //   // setTimeout(function(){ console.log(usr.$$state.value.address); $scope.searchAddress(usr.$$state.value.address) }, 1000);
  // }

  usersFactory.getUsers();

});
