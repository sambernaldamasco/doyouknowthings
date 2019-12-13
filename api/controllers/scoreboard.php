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
    $request_object = json_decode(file_get_contents('php://input'));
    $new_score = new Score(null, $request_object->name, $request_object->score);
    $scoreboard = Scoreboard::create($new_score);

    echo json_encode($scoreboard);
  break;

  case "update":
    echo "updating all the stuff on id ";
  break;

  case "delete":
    echo "deleting all the stuff on id ";
  break;
}


?>
