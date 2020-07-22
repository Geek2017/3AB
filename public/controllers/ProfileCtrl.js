'use strict';


angular.module('newApp').controller('ProfileCtrl', function($firebaseArray, $scope) {
    // var modal = document.getElementById('myModal');
    // $("#close2").click(function() {
    //     modal.style.display = "none";
    //     // $("#customFile").show();

    // });

    // console.log(user);
    // var temp = firebase.auth().currentUser.photoURL;
    // // console.log(firebase.auth().currentUser.photoURL);
    // // console.log(firebase.auth().currentUser.displayName);
    // if (temp == null) {
    //     document.getElementById("photoURL").src = "./assets/libraries/dist/img/user2-160x160.jpg";
    // } else {
    //     document.getElementById("photoURL").src = temp;
    // }
    // if (firebase.auth().currentUser.displayName == null) {
    //     document.getElementById("username").innerHTML = firebase.auth().currentUser.email;
    // } else {
    //     document.getElementById("username").innerHTML = firebase.auth().currentUser.displayName;
    // }

    // var bc = [];
    // var hc = [];


    // var currentUrl = window.location.hostname;



    // var ref = firebase.database().ref("/datasets/human/");
    // ref.orderByChild("url").equalTo(currentUrl).on("child_added", function(snapshot) {
    //     hc.push(snapshot.val());
    //     console.log('Human:', hc.length)
    //     $('#humancliks').text(hc.length)
    //     $('#traffic').text(bc.length + hc.length)
    // });

    // var ref = firebase.database().ref("/datasets/bot/");
    // ref.orderByChild("url").equalTo(currentUrl).on("child_added", function(snapshot) {
    //     bc.push(snapshot.val());
    //     console.log('Bot:', bc.length)
    //     $('#botcliks').text(bc.length)
    //     $('#traffic').text(bc.length + hc.length)
    // });

    // var ref = firebase.database().ref("/datasets/adscount");
    // ref.orderByChild("domain").equalTo(currentUrl).on("child_added", function(snapshot) {
    //     console.log("Data:", snapshot.val().count);
    //     $('#Campaign').text(snapshot.val().count);
    // });


});