<?php
$mysqli = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_SCHEMA);

if($mysqli->connect_errno){
    echo 'Mysql Error! Error('.$mysqli->connect_errno.'): '.$mysqli->connect_error;
    exit();
}