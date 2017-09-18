app.controller('mainController', function($scope, usersFactory) {
//initializing
  $scope.editable = false;
  $scope.editMode = true;

  $scope.searchAddress = function(address){
    usersFactory.getLatLng(address);
    $scope.closeForm();
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

    usersFactory.getUsers();

});
