<?php

$mysqli = new mysqli("localhost", "kodi", "kodi", "MyVideos119");

if ($mysqli -> connect_errno) {
    echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

if (!$mysqli -> set_charset("utf8")) {
    printf("Ошибка при загрузке набора символов utf8: %s\n", $mysqli->error);
    exit();
}

$query = "SELECT * FROM rating";

if ($stmt = $mysqli -> prepare( $query )) {
    $stmt -> execute();
    $stmt -> bind_result(
        $rating_id,
        $media_id,
        $media_type,
        $rating_type,
        $rating,
        $votes,
    );
}

$ratings = Array();
while ($stmt -> fetch()) {
    $ratings[$media_id]['rating'] = $rating;
}

echo json_encode($ratings, JSON_UNESCAPED_UNICODE);

$stmt -> close();
$mysqli -> close();

?>