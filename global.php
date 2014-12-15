<?php
define('ACCESS', true);
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'toor');
define('DB_SCHEMA', 'Game');

require_once 'db.php';

function addUser($username)
{
    global $mysqli;
    $score = 0;
    $created_at = 0;
    $sql = 'INSERT INTO score(s_userName, s_created_at,s_score) VALUES ("' . $username . '","' . $created_at . '","' . $score . '")';
    $answer = $mysqli->query($sql);
    if (!$answer) {
        return false;
    } else {
        return $mysqli->insert_id;
    }
}

function addScore($userName, $score)
{
    global $mysqli;

    $createdAt = time();
    $sql = "UPDATE score SET  s_created_at = FROM_UNIXTIME($createdAt,'%Y %D %M %h:%i:%s %x') ,s_score = '$score' WHERE s_userName='$userName';";
    $answer = $mysqli->query($sql);
    if (!$answer) {
        return false;
    } else {
        return $score;
    }

}

function checkUser($userName)
{
    global $mysqli;

    $sql = "SELECT * FROM score WHERE  s_userName = '$userName' ";
    $res = $mysqli->query($sql);
    if (!$res) {
        echo 'Error in SQL: ' . $mysqli->error;
        return false;
    }

    $answer = $res->fetch_assoc();
    if ($answer) {
        return $answer;
    } else {
        return false;
    }
}

function getScores()
{
    global $mysqli;
    $sql = "SELECT * FROM  score ORDER BY  s_score DESC LIMIT 10 ";
    $res = $mysqli->query($sql);
    if (!$res) {
        echo 'Error in SQL: ' . $mysqli->error;
        return false;
    }

    $scores = array();
    while ($row = $res->fetch_assoc()) {
        $scores[] = $row;
    }

    return $scores;

}

function checkScore($userName)
{
    global $mysqli;
    $sql = "SELECT s_score FROM  score WHERE s_userName='$userName';";
    $res = $mysqli->query($sql);
    if (!$res) {
        echo 'Error in SQL: ' . $mysqli->error;
        return false;
    }

    $answer = $res->fetch_assoc();
    if ($answer) {
        return $answer['s_score'];
    } else {
        return false;
    }

}