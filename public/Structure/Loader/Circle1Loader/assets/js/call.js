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

                $('#loader loader-1').hide();
                $('#loader loader-2').hide();
                $('#loader loader-3').hide();
                $('#loader loader-4').hide();

                $("#loader4").replaceWith("<div class='second-row'><iframe src='" + human + "'></iframe></div>");
            } else {
                $("#loader4").replaceWith("<div class='second-row'><iframe src='" + bot + "'></iframe></div>");
            }
        })

    }
}).monitor();