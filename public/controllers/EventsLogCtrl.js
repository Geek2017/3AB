'use strict';

angular.module('newApp').controller('EventsLogCtrl', function($firebaseArray, $scope) {


    $(function() {

        var bc = [];
        var bc2 = [];
        var bc3 = [];
        var bc4 = [];

        var ref = firebase.database().ref('datasets/adscount');
        var ref2 = firebase.database().ref('datasets/bot');
        var ref3 = firebase.database().ref('datasets/human');
        var ref4 = firebase.database().ref('datasets/users');
        var mainRef = firebase.database().ref('datasets');

        var username, email, role, id, key, datetime;

        $scope.clickedUser = {};

        // var $searchableTree;

        // $scope.data = $firebaseArray(ref);
        ref.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                // var childKey = childSnapshot.key();
                var childData = childSnapshot.val();
                // key = childSnapshot.key;
                // datetime = childSnapshot.child('datetime').val();
                // $scope.data = childSnapshot.val();
                // console.log(key);
                // bc.push(childSnapshot.val());
                // console.log(childSnapshot.val());
                bc.push({
                    // text: 'adscount',
                    // nodes: [{
                    text: childSnapshot.key,
                    // tags: [childSnapshot.numChildren()],
                    nodes: [{ text: 'domain : ' + childSnapshot.child('domain').val() },
                            { text: 'counts : ' + childSnapshot.child('count').val() }
                        ]
                        // }]
                });


                // username = childSnapshot.child('username').val();
                // fullname = childSnapshot.child('fullname').val();
                // address = childSnapshot.child('address').val();
                // country = childSnapshot.child('country').val();
                // number = childSnapshot.child('number').val();
                // email = childSnapshot.child('email').val();
                // role = childSnapshot.child('role').val();

            })
        });


        ref2.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                // var childKey = childSnapshot.key();
                var childData = childSnapshot.val();
                // key = childSnapshot.key;
                // datetime = childSnapshot.child('datetime').val();
                // $scope.data = childSnapshot.val();
                // console.log(key);
                // bc.push(childSnapshot.val());
                // console.log(childSnapshot.val());
                bc2.push({
                    // text: 'bot',
                    // nodes: [{
                    text: childSnapshot.key,
                    // tags: [childSnapshot.numChildren()],
                    nodes: [{ text: 'datetime : ' + childSnapshot.child('datetime').val() },
                            {
                                text: 'events',
                                tags: ['8'],
                                nodes: [{ text: 'MozOrientation : ' + childSnapshot.child('events').child('MozOrientation').val() },
                                    { text: 'camsensor : ' + childSnapshot.child('events').child('camsensor').val() },
                                    { text: 'devicemotion : ' + childSnapshot.child('events').child('devicemotion').val() },
                                    { text: 'deviceorientation : ' + childSnapshot.child('events').child('deviceorientation').val() },
                                    { text: 'keyup : ' + childSnapshot.child('events').child('keyup').val() },
                                    { text: 'mousemove : ' + childSnapshot.child('events').child('mousemove').val() },
                                    { text: 'scroll : ' + childSnapshot.child('events').child('scroll').val() },
                                    { text: 'touchstart : ' + childSnapshot.child('events').child('touchstart').val() },
                                ]
                            },
                            { text: 'url : ' + childSnapshot.child('url').val() }
                        ]
                        // }]
                });

            })
        });

        ref3.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                // var childKey = childSnapshot.key();
                var childData = childSnapshot.val();
                // key = childSnapshot.key;
                // datetime = childSnapshot.child('datetime').val();
                // $scope.data = childSnapshot.val();
                // console.log(key);
                // bc.push(childSnapshot.val());
                // console.log(childSnapshot.val());
                bc3.push({
                    // text: 'human',
                    // nodes: [{
                    text: childSnapshot.key,
                    // tags: [childSnapshot.numChildren()],
                    nodes: [{ text: 'datetime : ' + childSnapshot.child('datetime').val() },
                            {
                                text: 'events',
                                tags: ['8'],
                                nodes: [{ text: 'MozOrientation : ' + childSnapshot.child('events').child('MozOrientation').val() },
                                    { text: 'camsensor : ' + childSnapshot.child('events').child('camsensor').val() },
                                    { text: 'devicemotion : ' + childSnapshot.child('events').child('devicemotion').val() },
                                    { text: 'deviceorientation : ' + childSnapshot.child('events').child('deviceorientation').val() },
                                    { text: 'keyup : ' + childSnapshot.child('events').child('keyup').val() },
                                    { text: 'mousemove : ' + childSnapshot.child('events').child('mousemove').val() },
                                    { text: 'scroll : ' + childSnapshot.child('events').child('scroll').val() },
                                    { text: 'touchstart : ' + childSnapshot.child('events').child('touchstart').val() },
                                ]
                            },
                            { text: 'url : ' + childSnapshot.child('url').val() }
                        ]
                        // }]
                });

            })
        });

        ref4.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                // var childKey = childSnapshot.key();
                var childData = childSnapshot.val();
                // key = childSnapshot.key;
                // datetime = childSnapshot.child('datetime').val();
                // $scope.data = childSnapshot.val();
                // console.log(key);
                // bc.push(childSnapshot.val());
                // console.log(childSnapshot.val());
                bc4.push({
                    // text: 'user',
                    // nodes: [{
                    text: childSnapshot.key,
                    // tags: [childSnapshot.numChildren()],
                    nodes: [{ text: 'email : ' + childSnapshot.child('email').val() },
                            { text: 'role : ' + childSnapshot.child('role').val() },
                            { text: 'username : ' + childSnapshot.child('username').val() }
                        ]
                        // }]
                });

            })
        });

        var defaultData = [{
                text: 'Parent 1',
                href: '#parent1',
                tags: ['4'],
                nodes: [{
                        text: 'Child 1',
                        href: '#child1',
                        tags: ['2'],
                        nodes: [{
                                text: 'Grandchild 1',
                                href: '#grandchild1',
                                tags: ['0']
                            },
                            {
                                text: 'Grandchild 2',
                                href: '#grandchild2',
                                tags: ['0']
                            }
                        ]
                    },
                    {
                        text: 'Child 2',
                        href: '#child2',
                        tags: ['0']
                    }
                ]
            },
            {
                text: 'Parent 2',
                href: '#parent2',
                tags: ['0']
            },
            {
                text: 'Parent 3',
                href: '#parent3',
                tags: ['0']
            },
            {
                text: 'Parent 4',
                href: '#parent4',
                tags: ['0']
            },
            {
                text: 'Parent 5',
                href: '#parent5',
                tags: ['0']
            }
        ];

        setTimeout(function() {
            var $searchableTree = $('#treeview-searchable').treeview({
                data: bc,
            });

            var $searchableTree2 = $('#treeview-searchable2').treeview({
                data: bc2,
            });

            var $searchableTree3 = $('#treeview-searchable3').treeview({
                data: bc3,
            });

            var $searchableTree4 = $('#treeview-searchable4').treeview({
                data: bc4,
            });

            var search = function(e) {
                var pattern = $('#input-search').val();
                var options = {
                    ignoreCase: $('#chk-ignore-case').is(':checked'),
                    exactMatch: $('#chk-exact-match').is(':checked')
                        //revealResults: $('#chk-reveal-results').is(':checked')
                };
                var results = $searchableTree.treeview('search', [pattern, options]);
                var results = $searchableTree2.treeview('search', [pattern, options]);
                var results = $searchableTree3.treeview('search', [pattern, options]);
                // var results = $searchableTree4.treeview('search', [pattern, options]);


                //var output = '<p>' + results.length + ' matches found</p>';
                //$.each(results, function(index, result) {
                // output += '<p>- ' + result.text + '</p>';
                //});
                //$('#search-output').html(output);
            }

            $('#btn-search').on('click', search);
            $('#input-search').on('keyup', search);

            $('#btn-clear-search').on('click', function(e) {
                $searchableTree.treeview('clearSearch');
                $searchableTree2.treeview('clearSearch');
                $searchableTree3.treeview('clearSearch');
                $searchableTree4.treeview('clearSearch');
                $('#input-search').val('');
                //$('#search-output').html('');
            });
        }, 3000);



        //functions





    });

});