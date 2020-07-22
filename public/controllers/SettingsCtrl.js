'use strict';


angular.module('newApp').controller('SettingsCtrl', function($firebaseArray, $scope) {

    // console.log("Settings");

    // Get the modal
    var modal = document.getElementById('myModal');
    var modal2 = document.getElementById('myModal2');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var accept = document.getElementById("accept");

    $("#editBtn").click(function() {
        modal.style.display = "block";
    });

    var ref = firebase.database().ref('datasets/users');

    var username, email, role, id;

    $scope.clickedUser = {};

    $scope.data = $firebaseArray(ref);
    ref.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            // var childKey = childSnapshot.key();
            var childData = childSnapshot.val();
            // $scope.data = childSnapshot.val();
            // console.log($scope.data);

            username = childSnapshot.child('username').val();
            // fullname = childSnapshot.child('fullname').val();
            // address = childSnapshot.child('address').val();
            // country = childSnapshot.child('country').val();
            // number = childSnapshot.child('number').val();
            email = childSnapshot.child('email').val();
            role = childSnapshot.child('role').val();

        })
    });

    $scope.selectUser = function(users) {
        // console.log(users);
        $scope.clickedUser = users;
        id = users;
        modal.style.display = "block";
    };

    $scope.selectUser2 = function(users) {
        // console.log(users);
        $scope.clickedUser = users;
        id = users;
        modal2.style.display = "block";
    };

    $scope.updateUser = function() {
        var ref2 = firebase.database().ref("datasets/users/" + id.$id);
        ref2.update({
            username: $scope.clickedUser.username,
            email: $scope.clickedUser.email,
            // country: $scope.clickedUser.country,
            // gender: $scope.clickedUser.gender,
            role: $scope.clickedUser.role
        })

        modal.style.display = "none";

    };

    $scope.deleteUser = function() {
        var ref = firebase.database().ref("datasets/users/" + id.$id);
        ref.remove();
        modal2.style.display = "none";
    };

    $scope.close = function() {
        modal.style.display = "none";
    };

    $scope.close2 = function() {
        modal2.style.display = "none";
    };


    // console.log(email);





});