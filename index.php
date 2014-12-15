<?php

require_once 'global.php';
?>

<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>Game</title>

    <link rel="stylesheet" type="text/css" href="css/design.css"/>
    <script type="text/javascript" src="../jquery/js/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="js/jquery.flipcountdown.js"></script>
    <link rel="stylesheet" type="text/css" href="css/jquery.flipcountdown.css"/>
    <script type="text/javascript" src="js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/functions.js"></script>

</head>
<body>
<div id="visible"></div>

<div id="infoDiv" class="gradi3">
    <div id="image"><img id="icondel" class="icon" src="image/cross-button-icon.png"></div>
    <div id='title'>scores:</div>
    <div id="infoscore"></div>
</div>
<div class="bigestwrapper ">

    <div class="leftWrapper gradi1">
        <div class="rotate"><h1>* DELETE THE NUMBERS *</h1></div>
        <div id="user">
            <p>Hello , what is your name?</p>
            <input type="text" id="userName"/>
            <input type="button" class="button" value="start" id="start"/>
        </div>
        <div id="alert" class="popup">
            please choose level of game
            <input type="button" class="button" value="ok" id="ok"/>
        </div>
        <div id="checking" class="popup">
            <p>do u want to start a new game?</p>
            <input type="button" class="button" value="yes" id="yes"/>
            <input type="button" class="button" value="no" id="no"/>
        </div>
        <div id="answer"></div>
        <div id="Wrapper16">
        </div>
        <div id="Wrapper25">
        </div>
        <div id="Wrapper36">
        </div>
    </div>
    <div id="rightWrapper">
        <input type="button" class="button " value="New Game" id="NewGame"/>
        <a class="  button1" href="index.php">Change player</a>

        <div class="cb"></div>
        <div id="level">
            <p>Chose your level:</p>

            <div> Easy(16):<input type="radio" name="user_option" value="easy"></div>
            <div> Hard(25):<input type="radio" name="user_option" value="hard"></div>
            <div> Extreme!(36):<input type="radio" name="user_option" value="extreme"></div>
            <input type="button" class="button" value="10 highest scores" id="highScore"/>
        </div>
        <div class="cb"></div>
        <div id="timer" class="gradi2">
            <div id="timerCounter"></div>
        </div>
        <div id="nextNumber" class="gradi2">
            <div id="counter"></div>
        </div>
        <div class="cb"></div>
    </div>
</div>
</body>



