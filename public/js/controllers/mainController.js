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

  $scope.updateUser = function(id, updatedUser) {
    usersFactory.getLatLng(updatedUser.address).then(function(response) {
      updatedUser.location = response;
      usersFactory.saveUser(id, updatedUser);
      $scope.editMode = true;
      this.editable = false;

  }

  usersFactory.getUsers();

});
