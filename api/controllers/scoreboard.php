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
    $request_object = json_decode(file_get_contents('php://input'));
    $updated_score = new Score($_REQUEST['id'], $request_object->name, $request_object->score);
    $scoreboard = Scoreboard::update($updated_score);

    echo json_encode($scoreboard);
  break;

  case "delete":
    $scoreboard = Scoreboard::delete($_REQUEST['id']);

    echo json_encode($scoreboard);
  break;
}


?>
