<?php
$dbconn = pg_connect("host=localhost dbname=trivia");


class Score {
  public $id;
  public $name;
  public $score;

  public function __construct($id, $name, $score){
    $this->id = $id;
    $this->name = $name;
    $this->score = $score;
  }
} //end of class Score


class Scoreboard {
  static function all() {
    $scores = array();

    $results = pg_query(
      "SELECT *
      FROM scoreboard
      ORDER BY scoreboard.score DESC"
    );

    $row_object = pg_fetch_object($results);

    while($row_object){
      $new_score = new Score(
        intval($row_object->id),
        $row_object->name,
        intval($row_object->score)
      );

      $scores[] = $new_score;

      $row_object = pg_fetch_object($results);
    }

    return $scores;
  } //end of function all


} //end of class Scoreboard







?>
