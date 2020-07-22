'use strict';

angular.module('newApp').controller('DashboardCtrl', function($scope) {
    $(document).ready(function() {
        var username = localStorage.getItem("username");

        var register = localStorage.getItem("register");

        var ref = firebase.database().ref("datasets/users");

        var userVerify = firebase.auth().currentUser;

        ref.orderByChild("role").once("value")
            .then(function(snapshot) {
                var exist = snapshot.exists();
                var role = snapshot.child(userVerify.uid).child("role").val();
                var UID = firebase.auth().currentUser.uid;
                console.log(role)
                    //console.log(UID);
                    //console.log(snapshot.val());   
                    //console.log(role);
                if (role == 'ordinary') {
                    // $("#builder1").show();
                    // $("#builder2").show();
                    // $("#logs").hide();
                    // $("#settings").hide();
                } else if (role == 'super') {
                    // $("#builder1").show();
                    // $("#builder2").show();
                    $("#AI1").show();
                    $("#AI2").show();
                    $("#AI3").show();
                    $("#events").show();
                    // $("#settings").show();
                    // $("#settings").hide();
                } else if (role == 'admin') {
                    // $("#builder1").show();
                    // $("#builder2").show();
                    $("#AI1").show();
                    $("#AI2").show();
                    $("#AI3").show();
                    $("#events").show();
                }

            });


        // $('#botcliks').text(localStorage.getItem('botcliks'));
        // $('#humancliks').text(localStorage.getItem('humancliks'));
        if (register == "custom") {
            var ref2 = firebase.database().ref("datasets/users");
            var current = firebase.auth().currentUser;
            var userId = current.uid;

            ref2.once("value")
                .then(function(snapshot) {
                    //check if exist
                    var r = snapshot.child(userId).exists();
                    if (r !== true) {
                        // console.log("Dont Exists");


                        // console.log(userId);
                        ref2.child(userId).set({
                                username: username,
                                // username: current.displayName,
                                photoURL: current.photoURL,
                                email: current.email,
                                role: "ordinary"
                            })
                            .then(function(ref) {
                                console.log('Added to database');
                            });
                    } else {
                        // console.log("Exists");
                    }

                });
        } else if (register == "gmail") {
            var ref2 = firebase.database().ref("datasets/users");
            var current = firebase.auth().currentUser;
            var userId = current.uid;

            ref2.once("value")
                .then(function(snapshot) {
                    //check if exist
                    var r = snapshot.child(userId).exists();
                    if (r !== true) {
                        // console.log("Dont Exists");


                        // console.log(userId);
                        ref2.child(userId).set({
                                // username: username,
                                username: current.displayName,
                                photoURL: current.photoURL,
                                email: current.email,
                                role: "ordinary"
                            })
                            .then(function(ref) {
                                console.log('Added to database');
                            });
                    } else {
                        // console.log("Exists");
                    }

                });
        }






        var bc = [];
        var hc = [];


        var currentUrl = window.location.hostname;



        var ref = firebase.database().ref("/datasets/human/");
        ref.orderByChild("url").equalTo(currentUrl).on("child_added", function(snapshot) {
            hc.push(snapshot.val());
            console.log('Human:', hc.length)
            $('#humancliks').text(hc.length)
            $('#traffic').text(bc.length + hc.length)
        });

        var ref = firebase.database().ref("/datasets/bot/");
        ref.orderByChild("url").equalTo(currentUrl).on("child_added", function(snapshot) {
            bc.push(snapshot.val());
            console.log('Bot:', bc.length)
            $('#botcliks').text(bc.length)
            $('#traffic').text(bc.length + hc.length)
        });

        var ref = firebase.database().ref("/datasets/adscount");
        ref.orderByChild("domain").equalTo(currentUrl).on("child_added", function(snapshot) {
            console.log("Data:", snapshot.val().count);
            $('#Campaign').text(snapshot.val().count);
        });




    });
});