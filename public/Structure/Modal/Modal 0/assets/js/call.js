new jmbotdetector({
    timeout: 5000,
    callback: function(result) {

        console.log('result:', result.tests)

        $.getJSON("../js/data.json", function(data) {
            console.log(data.bot);
            console.log(data.human);

            var human = data.human;
            var bot = data.bot;

            if (result.cases.mousemove) {

                var currentUrl = window.location.hostname;
                console.log(currentUrl);

                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

                var datetime = today + '/' + time;

                var uid = firebase.database().ref().child('users').push().key;

                var data = {
                    'datetime': datetime,
                    'events': result.cases,
                    'url': currentUrl

                };

                var updates = {};
                updates['/datasets/human/' + uid] = data;
                firebase.database().ref().update(updates, console.log('Human Events Click Save!'));
                setTimeout(function() {

                    console.log('MOUSEMOVE', result.cases.mousemove)

                    localStorage.setItem('adsurl', human)

                    $(window).attr('location', human)
                }, 3000);

            } else {
                var currentUrl = window.location.hostname;
                console.log(currentUrl);

                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

                var datetime = today + '/' + time;

                var uid = firebase.database().ref().child('users').push().key;

                var data = {
                    'datetime': datetime,
                    'events': result.cases,
                    'url': currentUrl

                };

                var updates = {};
                updates['/datasets/bot/' + uid] = data;
                firebase.database().ref().update(updates, console.log('Bot Events Click Save!'));
                setTimeout(function() {

                    localStorage.setItem('adsurl', bot)

                    $(window).attr('location', bot)

                }, 3000);
            }
        })

    }
}).monitor();