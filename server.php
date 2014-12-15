<?php
require_once 'global.php';

if (isset($_POST['action']) && $_POST['action'] == 'sendUserName') {
    $userName = $_POST['userName'];
    $userExist = checkUser($userName);
    if ($userExist == false) {
        $answer = addUser($userName);
        echo $answer;
    }
}
if (isset($_POST['action']) && $_POST['action'] == 'sendScore') {
    $userName = $_POST['userName'];
    $score = $_POST['score'];
    $returnScore = checkScore($userName);
    if ($score > $returnScore) {
        $answer = addScore($userName, $score);
        echo $answer;
    } else echo " is less than your record";
}
if (isset($_POST['action']) && $_POST['action'] == 'getScores') {
    $arr = getScores();
    $autoJson = json_encode($arr);
    echo $autoJson;
}