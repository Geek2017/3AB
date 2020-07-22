new jmbotdetector({
    timeout: 5000,
    callback: function(result) {

        console.log('result:', result.tests)

        $.getJSON("./assets/js/data.json", function(data) {
            console.log(data.bot);
            console.log(data.human);

            var human = data.human;
            var bot = data.bot;

            if (result.cases.mousemove) {
                console.log('MOUSEMOVE', result.cases.mousemove)

                $('#loader').hide();

                $("#preloader").replaceWith("<div class='second-row'><iframe src='" + human + "'></iframe></div>");
            } else {
                $("#preloader").replaceWith("<div class='second-row'><iframe src='" + bot + "'></iframe></div>");
            }
        })

    }
}).monitor();