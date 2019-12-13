<?php
// ------------ DEPENDENCIES
header('Content-Type: application/json');
include_once __DIR__ . '/../models/scoreboard.php';

// ------------ REQUEST ROUTING
switch ($_REQUEST['action']){
  case "index":
    echo json_encode(Scoreboard::all());
  break;

  case "post":
    echo "it me posting some stuff";
  break;

  case "update":
    echo "updating all the stuff on id ";
  break;

  case "delete":
    echo "deleting all the stuff on id ";
  break;
}


?>
