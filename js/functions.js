$(function () {
    $('#visible').show();
    $('#user').show();


    $('#yes').click(function () {
        $('#NewGame').val('New game');
        $('#checking').hide();
        $('#visible').hide();
        resetValues();
    });

    $('#no').click(function () {
        $('#visible').hide();
        $('#checking').hide();
        $("#timer").flipcountdown({
            tzoneOffset: 3,
            showHour: false,
            showMinute: true,
            showSecond: true,
            size: "xs",
            tick: function () {
                GameTime = GameTime + 1000;
                return new Date(GameTime);
            }
        });
    });
    //10 highest scores
    $('#highScore').click(function () {
        $('#visible').hide();
        var objScores = {
            action: 'getScores'
        };

        $.ajax({
            url: 'server.php',
            type: 'post',
            data: objScores,
            cache: false
        }).done(function (data) {
            try {
                var dataObj = jQuery.parseJSON(data);
                $('#title').show();
                var text = '<br>';
                for (var i = 0; i < dataObj.length; i++) {
                    text +=
                        dataObj[i]['s_userName'] + ' ---> ' +
                            dataObj[i]['s_score'] + '<br>';
                }

                $('#infoscore').html(text);
                $('#infoDiv').show();
            }
            catch (error) {
                console.dir(error);
            }


        });

    });
    // delete scores wrapper
    $('#icondel').click(function () {
        $('#infoDiv').hide();

    });

    // user name login and ajax to database
    $('#start').click(function () {
        $('#visible').hide();

        var uName = $('#userName').val();
        $('#user').hide();

        var objName = {
            action: 'sendUserName',
            userName: uName
        };

        $.ajax({
            url: 'server.php',
            type: 'post',
            data: objName,
            cache: false
        }).done(function (data) {
            try {
                $('#answer').text('hello ' + uName + ' ,u can start the game');
            }

            catch (error) {
                console.dir(error);
            }
        });
    });

    var GameTime;
    var score;
    var next = 0;
    var level;

    $('#NewGame').click(function () {

        if ($('#NewGame').val() == 'reset game' && GameTime > 0) {
            pause();
            $('#visible').show();
            $('#checking').show();
        } else {
            resetValues();
        }

    });

    function stopMe() {

        $("#timer").flipcountdown({
            tick: function () {
                return new Date(0);
            }
        });
    }

    function pause() {

        $("#timer").flipcountdown({
            tick: function () {
                return new Date(GameTime);
            }
        });
    }


    function resetValues() {

        $('#answer').text('');
        level = $('input[name = user_option]:checked').val();
        var i;
        var j;
        var array = [];
        var array1 = [];
        var arrayNums = [];
        var m;
        var numcolom;

        $('#Wrapper16').html("");
        $('#Wrapper25').html("");
        $('#Wrapper36').html("");
        $('#counter').css({
            'padding-left': '28px',
            'font-size': '30px'
        });
        $('#counter').text(1);

        if (level == undefined) {
            $('#visible').show();
            $('#alert').show();

            $('#ok').click(function () {
                $('#alert').hide();
                $('#visible').hide();

            });
        }
        else if (level == "easy") {
            m = 16;
            numcolom = 4;
            $('#NewGame').val('reset game');
        }

        else if (level == "hard") {
            m = 25;
            numcolom = 5;
            $('#NewGame').val('reset game');
        }

        else if (level == "extreme") {
            m = 36;
            numcolom = 6;
            $('#NewGame').val('reset game');
        }

        if (level !== undefined) {
            GameTime = -1000;
            $("#timer").flipcountdown({
                tzoneOffset: 3,
                showHour: false,
                showMinute: true,
                showSecond: true,
                size: "xs",
                tick: function () {
                    GameTime = GameTime + 1000;
                    return new Date(GameTime);
                }
            });
        }
        for (j = 1; j <= m; j++) {
            array[array.length] = j;
        }

        arrayNums = shuffle(array);
        for (i = 1; i <= m; i++) {
            if ((i - 1) % numcolom == 0) {
                $('#Wrapper' + m).append('<div HM="cb" ></div>');
            }

            $('#Wrapper' + m).append('<div id="box' + i + '_' + m + '"></div>');
            $('#box' + i + '_' + m).attr('class', 'boxes gradi3');
            $('#box' + i + '_' + m).html(arrayNums[i - 1]);

            $('#Wrapper' + m).on('click', '#box' + i + '_' + m, function () {

                if ($('#counter').text() == $(this).text()) {
                    for (i = 0; i <= array1.length; i++) {
                        $(array1[i]).css('background', ' -webkit-radial-gradient(white, lightblue)');
                    }

                    $(this).css('visibility', 'hidden');
                    next = parseInt($('#counter').text());
                    $('#counter').text(next + 1);

                }
                else {
                    $(this).css('background', 'rgb(218, 175, 175)');
                    array1[array1.length] = this;
                    $(this).effect("bounce", "slow");
                }

                if (next == m) {

                    stopMe();
                    $('#NewGame').val('New game');
                    $('#counter').css({
                        'padding-left': '17px',
                        'font-size': '24px',
                        'padding-top': '22px'
                    });
                    $('#counter').text("game over");
                    var userName = $('#userName').val();
                    score = Math.round(numcolom * (1000 - (GameTime / 1000)));

                    var objScore = {
                        action: 'sendScore',
                        userName: userName,
                        score: score
                    };
                    console.dir(objScore);
                    $.ajax({
                        url: 'server.php',
                        type: 'post',
                        data: objScore,
                        cache: false
                    }).done(function (data) {
                        try {
                            if (data > 0) {
                                $('#answer').text(' your current score  ' + data);
                            }
                            else {
                                $('#answer').text(' your current score  ' + score + data);
                            }
                        }
                        catch (error) {
                            console.dir(error);
                        }

                    });
                }

            });

        }
        $('#Wrapper16').hide();
        $('#Wrapper25').hide();
        $('#Wrapper36').hide();

        $('#Wrapper' + m).show();
    }

// stack overflow
    function shuffle(array) {
        var currentIndex = array.length
            , temporaryValue
            , randomIndex
            ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
});


