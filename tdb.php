<?php

$mysqli = new mysqli("localhost", "kodi", "kodi", "MyVideos119");

if ($mysqli -> connect_errno) {
    echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

if (!$mysqli -> set_charset("utf8")) {
    printf("Ошибка при загрузке набора символов utf8: %s\n", $mysqli->error);
    exit();
}

$query = "SELECT * FROM tvshow";

if ($stmt = $mysqli -> prepare( $query )) {
    $stmt -> execute();
    $stmt -> bind_result(
        $idShow,
        $title,
    	$review,
        $c02,
        $c03,
        $c04,
        $premiered,
        $c06,   //Poster
        $c07,
        $genre,
        $original_title,
        $c10,
        $c11,   //fanart
        $c12,
        $pg_rating,
        $studio,
        $c15,
        $c16,   // yt
        $c17,
        $c18,
        $c19,
        $c20,
        $c21,
        $c22,
        $c23,
        $userrating,
        $duration 
    );
}

$tvshows = Array();
while ($stmt -> fetch()) {

    $tvshows[] = [
        'id' => $idShow,
        'title' => $title,
        'review' => $review,
        'poster' => $posters[1], 
        'pg_rating' => $pg, 
        'genre' => $genre,
        'original_title' => $original_title, 
        'studio' => $studio, 
        'youtube' => 'https://www.youtube.com/watch?v='.$yt, 
        'fanart' => $fanarts[1],
        'premiered_date' => $premiered
    ];
}

echo json_encode($tvshows, JSON_UNESCAPED_UNICODE);

$stmt -> close();
$mysqli -> close();

?>