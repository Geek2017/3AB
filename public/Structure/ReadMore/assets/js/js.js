$(function() {





    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var datetime = today + '/' + time;


    $("div").mouseout(function() {
        console.log("Mouse Out the Div Element.", '\n\n', datetime);
    })
    count = 0;
    $("body").keypress(function() {
        var char = event.which || event.keyCode;
        console.log('Key Press Count is"', count = count + 1, char);
    });

    $("body").scroll(function() {
        console.log("Scroll Mouse Mouse Detected!", '\n\n', datetime);
    });


    $('div').click(function() {
        // var text = $(this);
        var v = $(this).closest("div").text();
        console.log(v);
    });



    $('button').click(function() {
        var bval = $(this).closest("button").text();
        console.log(bval);
    });

    function scrollToBottom() {
        $('#logs').scrollTop($('#logs')[0].scrollHeight);
    }

    $(document).mousemove(function() {
        var msg = "Handler for  called at ";
        msg += event.pageX + ", " + event.pageY;


        if ($(".body:hover").length != 0) {
            console.log("Mouse Over the Dom Element.", '\n\n', datetime, '\n\n', msg);

            // $("#logs").append("Mouse is Over the Nav Element.", '\n\n', datetime, '\n\n');
            // scrollToBottom();
        }
    });

    $(document).mousemove(function() {
        if ($(".navbar .container:hover").length != 0) {
            console.log("Mouse is Over the Nav Container Div", datetime);
            $("#logs").append("Mouse is Over the Nav Container Div", '\n\n', datetime, '\n\n');
            scrollToBottom();
        }
    });

    $(document).mousemove(function() {
        if ($(".container .jumbotron:hover").length != 0) {
            console.log("Mouse is Over the Container jumbotron", datetime);
            $("#logs").append("Mouse is Over the Container jumbotron", '\n\n', datetime, '\n\n');
            scrollToBottom();
        }
    });

    $('a').on('click', function(e) {


        e.preventDefault();
        var $e = $(e.currentTarget);

        var category = $e.attr('data-gaCategory');
        var action = $e.attr('data-gaAction');
        var label = $e.attr('data-gaLabel');

        console.log(category, action, label);
        if (category && action && label) {
            ga('send', 'event', category, action, label, null);

            $("#logs").append("Dropdown-menu Clicked", category, '-', action, '-', label, '\n\n', datetime, '\n\n');
            scrollToBottom();
        }

    });


    $('.btn-buy').on('click', function(e) {

        e.preventDefault();
        var $e = $(e.currentTarget);
        var category = $e.attr('data-gaCategory');
        var action = $e.attr('data-gaAction');
        var label = $e.attr('data-gaLabel');
        var value = parseInt($e.attr('data-gaValue'), 10);

        console.log(category, action, label, value);
        if (category && action && label && value) {
            ga('send', 'event', category, action, label, value);

            $("#logs").append("Button Click ", category, '-', action, '-', label, '-', value, '\n\n', datetime, '\n\n');

            scrollToBottom();
        }

    });
})