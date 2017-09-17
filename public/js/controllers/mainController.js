app.controller('mainController', function($scope, usersFactory) {
//initializing
  $scope.editable = false;
  $scope.editMode = true;


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

// app.controller('mainController', function($scope, usersFactory) {
// //initializing
//   $scope.editable = false;
//   $scope.editMode = true;
//   $scope.users = [];
//
//   var userCopy = this.copy;
//
//   //getting items from db
//   $scope.getUsers = usersFactory.getUsers;
//
//   $scope.getUsers()
//     .then(function(response){
//       $scope.users = response;
//     })
//     .catch(function(error){
//       console.log(error);
//     })
//
//   $scope.addUser = function(newUser) {
//     usersFactory.addToList(newUser)
//     .then(function(response){
//     $scope.users.push(response);
//     })
//     .catch(function(error){
//       console.log(error);
//     })
//   };
//
//   $scope.removeFromList = usersFactory.removeFromList;
//
//   $scope.editItem = function(userCopy){
//     this.editable = true;
//     $scope.editMode = false;
//
//   };
//
//    $scope.closeForm = function(){
//     $('#formModal').modal('hide');
//   }
//
//   $scope.saveUser = function(id, updatedUser){
//       usersFactory.saveUser(id, updatedUser);
//       $scope.editMode = true;
//       this.editable = false;
//
//   }
//
//     usersFactory.getUsers();
//
// });
