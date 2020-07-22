angular.module('newApp').controller('CustomCtrl', function($scope) {

    var adType = "5Sec";
    var loader = "Default";
    var folder = "";

    var modal = document.getElementById('pickModal');

    //radio button functions
    $("#theme1").click(function() {
        adType = "5Sec"
            // console.log(adType);
    });
    $("#theme2").click(function() {
        adType = "Loader"
            // console.log(adType);
    });
    $("#theme3").click(function() {
        adType = "ReadMore"
            // console.log(adType);
    });

    $("#theme4").click(function() {
        loader = "Default"
            // console.log(loader);
    });
    $("#theme5").click(function() {
        loader = "Circle 1"
            // console.log(loader);
    });
    $("#theme6").click(function() {
        loader = "Circle 2"
            // console.log(loader);
    });


    $(document).ready(function() {

        load_folder_list();

        function load_folder_list() {
            var action = "fetch";
            $.ajax({
                url: "action.php",
                method: "POST",
                data: {
                    action: action
                },
                success: function(data) {
                    $('#folder_table').html(data);
                }
            })
        }



        $(document).on('click', '#create_folder', function() {
            $('#action').val('create');
            $('#folder_name').val('');
            $('#folder_button').val('Create');
            $('#old_name').val('');
            $('#change_title').text('Create Folder');
            $('#folderModal').modal('show');
        });

        $(document).on('click', '#folder_button', function() {
            $('#action').val('create');
            $('#old_name').val('');
            $('#folder_button').val('Create');
            var folder_name = $('#folder_name').val();
            var action = $('#action').val();

            var x = document.getElementById("snackbar");




            if (folder_name != '') {
                $.ajax({
                    url: "copy.php",
                    method: "POST",
                    data: {
                        adType: adType,
                        loader: loader,
                        folder_name: folder_name,
                        action: action,
                        copy: "copy"
                    },
                    success: function(data) {
                        // $('#folderModal').modal('hide');
                        load_folder_list();
                        folder = folder_name;
                        // alert(data);
                        $('#folder_name').val("");
                        $('#botPathText').val("public_html/3AB/" + folder_name + "/assets/ads/bot/index.html");
                        $('#humanPathText').val("public_html/3AB/" + folder_name + "/assets/ads/human/index.html");
                        // $('#confirmModal').modal('show');
                        x.className = "show";
                        var currentUrl = window.location.hostname;
                        // console.log(currentUrl);
                        var ref = firebase.database().ref("/datasets/adscount/");

                        ref.orderByChild("domain").equalTo(currentUrl).once("value")
                            .then(function(snapshot) {

                                var exist = snapshot.exists();
                                var val = snapshot.val();
                                // var countNext = snapshot.val();


                                if (!exist) {
                                    ref.push({
                                            domain: currentUrl,
                                            count: 1
                                        })
                                        .then(function(data) {
                                            // console.log(data.key);
                                            ref.child(data.key).update({
                                                key: data.key
                                            })
                                        });
                                } else {


                                    setTimeout(function() {
                                        var valArray = Object.values(val);

                                        var countNext = valArray[0].count + 1;
                                        var key = valArray[0].key;

                                        // console.log(valArray[0].key);
                                        // console.log(countNext);
                                        ref.child(key).update({
                                            count: countNext
                                        }).then(function(data) {
                                            console.log('Updated database!');
                                        });
                                    }, 3000);

                                }
                            });
                        setTimeout(function() {
                            x.className = x.className.replace("show", "");
                            window.location.href = "#native";
                        }, 3000);
                        localStorage.setItem("botpath", folder_name + "/assets/ads/bot/index.html");
                        localStorage.setItem("humanpath", folder_name + "/assets/ads/human/index.html");
                        localStorage.setItem("folder_name", folder_name);
                    }
                });
            } else {
                var y = document.getElementById("snackbar2");
                y.className = "show";
                setTimeout(function() {
                    y.className = y.className.replace("show", "");
                }, 3000);
                // alert("Enter Folder Name");
            }
        });

        $(document).on('click', '#folder_button2', function() {
            $('#action2').val('create');
            $('#old_name2').val('');
            $('#folder_button2').val('Create');
            var folder_name = $('#folder_name2').val();
            var action = $('#action2').val();
            if (folder_name != '') {
                $.ajax({
                    url: "copy2.php",
                    method: "POST",
                    data: {
                        adType: adType,
                        loader: loader,
                        folder_name: folder_name,
                        action: action,
                        copy: "copy"
                    },
                    success: function(data) {
                        // $('#folderModal').modal('hide');
                        load_folder_list();
                        // alert(data);
                        $('#folder_name2').val("");
                        folder = folder_name;

                        // $("#botBrowse").show();
                        // $("#humanBrowse").show();

                        var currentUrl = window.location.hostname;
                        var modal = document.getElementById('pickModal');
                        // console.log(currentUrl);
                        var ref = firebase.database().ref("/datasets/adscount/");

                        ref.orderByChild("domain").equalTo(currentUrl).once("value")
                            .then(function(snapshot) {

                                var exist = snapshot.exists();
                                var val = snapshot.val();
                                // var countNext = snapshot.val();


                                if (!exist) {
                                    ref.push({
                                            domain: currentUrl,
                                            count: 1
                                        })
                                        .then(function(data) {
                                            // console.log(data.key);
                                            ref.child(data.key).update({
                                                key: data.key
                                            })
                                        });
                                } else {

                                    var valArray = Object.values(val);

                                    var countNext = valArray[0].count + 1;
                                    var key = valArray[0].key;

                                    // console.log(valArray[0].key);
                                    // console.log(countNext);
                                    ref.child(key).update({
                                        count: countNext
                                    }).then(function(data) {
                                        console.log('Updated database!');
                                    });
                                }
                            });
                        $('#botPathName2').text("Choose file");
                        $('#humanPathName2').text("Choose file");
                        modal.style.display = "block";
                        $("#customFile").hide();

                        // var a = document.getElementById("snackbar3");
                        // a.className = "show";
                        // setTimeout(function() {
                        //     a.className = a.className.replace("show", "");
                        // }, 3000);

                        $('#botPathName2').text("public_html/" + folder_name + "/assets/ads/bot/");
                        $('#humanPathName2').text("public_html/" + folder_name + "/assets/ads/human/");
                        localStorage.setItem("botpath", folder_name + "/assets/ads/bot/");
                        localStorage.setItem("humanpath", folder_name + "/assets/ads/human/");
                        localStorage.setItem("folder_name", folder_name);
                        var currentUrl = window.location.hostname;


                        // document.cookie = folder_name + "/assets/ads/";
                    }
                });
            } else {
                var b = document.getElementById("snackbar4");
                b.className = "show";
                setTimeout(function() {
                    b.className = b.className.replace("show", "");
                }, 3000);
                // alert("Enter Folder Name");
            }
        });

    });

    // $("#create_folder").click(function() {
    //     $.get("test.php");
    //     // console.log('successully created!')
    //     return false;

    // });


    // $("#default_folder").click(function() {
    //     // $.get("copy.php");
    //     // // console.log('successully created!')
    //     // return false;

    //     $.ajax({
    //         url: "copy.php",
    //         method: "POST",
    //         data: {
    //             copy: "copy"
    //         },
    //         success: function(data) {
    //             console.log(data);
    //             console.log("success");
    //         }
    //     })

    // });


    // $.ajax({
    //     url: 'test.php',
    //     success: function(response) { //response is value returned from php (for your example it's "bye bye"
    //         //alert(response);
    //         console.log(response);
    //     }
    // });

    $("#save1").click(function() {
        // console.log(document.getElementById('picker1').value);
        // $.get("test.php");
        // return false;

    });

    //radio button for Default File
    $("#customRadio1").click(function() {
        $("#customFile").hide();
        $("#defaultFile").show();

        $("#botPath2").hide();
        $("#humanPath2").hide();
        $("#botPath1").show();
        $("#humanPath1").show();
        $("#botBrowse").hide();
        $("#humanBrowse").hide();

        $("#botURL").hide();
        $("#humanURL").hide();
        $("#URLSave").hide();
        $("#uploadSave").hide();
        // $("#botPathText").prop("disabled", true);
        // $("#humanPathText").prop("disabled", true);

    });
    //radio button for Custom File
    $("#customRadio2").click(function() {
        $("#defaultFile").hide();
        $("#customFile").show();

        $("#botPath1").hide();
        $("#humanPath1").hide();

        // $("#botBrowse").show();
        // $("#humanBrowse").show();
        // $("#botPathText").prop("disabled", false);
        // $("#humanPathText").prop("disabled", false);
    });

    $("#uploadPick").click(function() {
        modal.style.display = "none";
        $("#customFile").show();
        $("#botBrowse").show();
        $("#humanBrowse").show();
        $("#uploadSave").show();
        // $("#botPath2").show();
        // $("#humanPath2").show();
        $("#botURL").hide();
        $("#humanURL").hide();
        $("#URLSave").hide();

    });

    $("#urlPick").click(function() {
        modal.style.display = "none";
        $("#customFile").show();
        $("#botPath2").hide();
        $("#humanPath2").hide();
        $("#uploadSave").hide();
        $("#botURL").show();
        $("#humanURL").show();
        $("#URLSave").show();
    });

    $("#close").click(function() {
        modal.style.display = "none";
        $("#customFile").show();

    });

    $("#URLSave").click(function() {
        var botURLPathText = $('#botURLPathText').val();
        var humanURLPathText = $('#humanURLPathText').val();
        if (botURLPathText != '' && humanURLPathText != '') {
            $.ajax({
                url: "dataPath2.php",
                method: "POST",
                data: {
                    folder: folder,
                    botURLPathText: botURLPathText,
                    humanURLPathText: humanURLPathText
                },
                success: function(data) {

                    console.log(data);

                    var a = document.getElementById("snackbar3");
                    a.className = "show";
                    setTimeout(function() {
                        a.className = a.className.replace("show", "");
                    }, 3000);
                }
            });
        } else {
            var b = document.getElementById("snackbar4");
            b.className = "show";
            setTimeout(function() {
                b.className = b.className.replace("show", "");
            }, 3000);

            // alert("Enter Folder Name");
        }

    });

    $("#uploadSave").click(function() {
        var botFileName = $('#botFileName').val();
        var humanFileName = $('#humanFileName').val();
        // console.log(botFileName);
        // console.log(humanFileName);
        if (botFileName != "" && humanFileName != "") {
            $.ajax({
                url: "dataPath.php",
                method: "POST",
                data: {
                    folder: folder,
                    botFileName: botFileName,
                    humanFileName: humanFileName
                },
                success: function(data) {
                    console.log(data);
                    var bothSaved = document.getElementById("snackbar6");
                    bothSaved.className = "show";
                    setTimeout(function() {
                        bothSaved.className = bothSaved.className.replace("show", "");
                    }, 3000);
                    localStorage.setItem("botpath", folder + "/assets/ads/bot/" + botFileName);
                    localStorage.setItem("humanpath", folder + "/assets/ads/human/" + humanFileName);
                }
            });

        } else {
            var bothtml = document.getElementById("snackbar5");
            bothtml.className = "show";
            setTimeout(function() {
                bothtml.className = bothtml.className.replace("show", "");
            }, 3000);
        }

    });

    $('#botFile').on("change", function() {
        console.log(document.getElementById("botFile").files[0].name);
        $("#labelID").text(document.getElementById("botFile").files[0].name);
        $("#botPath2").show();

        var file_name = document.getElementById("botFile").files[0];

        if (file_name != '') {
            var form_data = new FormData();
            form_data.append("botFile", file_name);
            form_data.append('folder', folder);
            $.ajax({
                url: "up.php",
                method: "POST",
                data: form_data,
                contentType: false,
                cache: false,
                processData: false,
                success: function(data) {
                    console.log(data);
                }
            });

        } else {
            console.log("Can't Upload!");
        }
    });

    $('#humanFile').on("change", function() {
        console.log(document.getElementById("humanFile").files[0].name);
        $("#labelID2").text(document.getElementById("humanFile").files[0].name);
        $("#humanPath2").show();

        var file_name = document.getElementById("humanFile").files[0];

        if (file_name != '') {
            var form_data = new FormData();
            form_data.append("humanFile", file_name);
            form_data.append('folder', folder);
            $.ajax({
                url: "up2.php",
                method: "POST",
                data: form_data,
                contentType: false,
                cache: false,
                processData: false,
                success: function(data) {
                    console.log(data);
                }
            });

        } else {
            console.log("Can't Upload!");
        }
    });


    $("#botFileSave").click(function() {

        var bot_name = $('#botPathText2').val();

        if (bot_name == "") {
            var bothtml = document.getElementById("snackbar5");
            bothtml.className = "show";
            setTimeout(function() {
                bothtml.className = bothtml.className.replace("show", "");
            }, 3000);
            // console.log("Enter your bot html file");
        } else {
            // console.log("Saved");
            var bothSaved = document.getElementById("snackbar6");
            bothSaved.className = "show";
            setTimeout(function() {
                bothSaved.className = bothSaved.className.replace("show", "");
            }, 3000);
            localStorage.setItem("botpath", folder + "/assets/ads/bot/" + bot_name);
        }


    });

    $("#humanFileSave").click(function() {
        var human_name = $('#humanPathText2').val();
        if (human_name == "") {
            var humanhtml = document.getElementById("snackbar7");
            humanhtml.className = "show";
            setTimeout(function() {
                humanhtml.className = humanhtml.className.replace("show", "");
            }, 3000);
            // console.log("Enter your human html file");
        } else {
            // console.log("Saved");
            var humanSaved = document.getElementById("snackbar8");
            humanSaved.className = "show";
            setTimeout(function() {
                humanSaved.className = humanSaved.className.replace("show", "");
            }, 3000);
            localStorage.setItem("humanpath", folder + "/assets/ads/human/" + human_name);
        }

        // $('#doneModal').modal('show');

    });

    $("#theme1").click(function() {
        document.getElementById("h3Tag").innerHTML = " ";
        $("#loader2").hide();
        $("#loaderTheme").hide();
    });

    $("#theme2").click(function() {
        document.getElementById("h3Tag").innerHTML = "Choose Loader Themes";
        $("#loader2").show();
        $("#loaderTheme").show();
    });

    $("#theme3").click(function() {
        document.getElementById("h3Tag").innerHTML = " ";
        $("#loader2").hide();
        $("#loaderTheme").hide();
    });

    // if (document.getElementById('customRadio1').checked) {
    //     console.log("default");
    //     $("#customFile").hide();
    //     $("#defaultFile").show();
    // } else if (document.getElementById('customRadio2').checked) {
    //     console.log("custom");
    //     $("#defaultFile").hide();
    //     $("#customFile").show();
    // }

    // document.getElementById("field07").setAttribute("disabled", false);


    $('.my-colorpicker1').colorpicker()

    $('.my-colorpicker2').colorpicker()

    $('.my-colorpicker2').on('colorpickerChange', function(event) {
        $('.my-colorpicker2 .fa-square').css('color', event.color.toString());
    });

    $('.my-colorpicker3').colorpicker()

    $('.my-colorpicker3').on('colorpickerChange', function(event) {
        $('.my-colorpicker3 .fa-square').css('color', event.color.toString());
    });

    $('.my-colorpicker4').colorpicker()

    $('.my-colorpicker4').on('colorpickerChange', function(event) {
        $('.my-colorpicker4 .fa-square').css('color', event.color.toString());
    });

    //color picker with addon circle
    $('.my-colorpicker5').colorpicker()

    $('.my-colorpicker5').on('colorpickerChange', function(event) {
        $('.my-colorpicker5 .fa-square').css('color', event.color.toString());
    });

    $('.my-colorpicker6').colorpicker()

    $('.my-colorpicker6').on('colorpickerChange', function(event) {
        $('.my-colorpicker6 .fa-square').css('color', event.color.toString());
    });

    $('.my-colorpicker7').colorpicker()

    $('.my-colorpicker7').on('colorpickerChange', function(event) {
        $('.my-colorpicker7 .fa-square').css('color', event.color.toString());
    });

    $('.my-colorpicker8').colorpicker()

    $('.my-colorpicker8').on('colorpickerChange', function(event) {
        $('.my-colorpicker8 .fa-square').css('color', event.color.toString());
    });

    //color picker with addon circle2
    $('.my-colorpicker9').colorpicker()

    $('.my-colorpicker9').on('colorpickerChange', function(event) {
        $('.my-colorpicker9 .fa-square').css('color', event.color.toString());
    });

    $('.my-colorpicker10').colorpicker()

    $('.my-colorpicker10').on('colorpickerChange', function(event) {
        $('.my-colorpicker10 .fa-square').css('color', event.color.toString());
    });

    $('.my-colorpicker11').colorpicker()

    $('.my-colorpicker11').on('colorpickerChange', function(event) {
        $('.my-colorpicker11 .fa-square').css('color', event.color.toString());
    });

    $("input[data-bootstrap-switch]").each(function() {
        $(this).bootstrapSwitch('state', $(this).prop('checked'));
    });



});