<?php

$mysqli = new mysqli("localhost", "kodi", "kodi", "MyVideos119");

if ($mysqli -> connect_errno) {
    echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

if (!$mysqli -> set_charset("utf8")) {
    printf("Ошибка при загрузке набора символов utf8: %s\n", $mysqli->error);
    exit();
}

$query = "SELECT * FROM art WHERE media_type IN ('movie','tvshow');";

if ($stmt = $mysqli -> prepare( $query )) {
    $stmt -> execute();
    $stmt -> bind_result(
        $art_id,
        $media_id,
        $media_type,
        $type,
        $url
    );
}

$arts = Array();
while ($stmt -> fetch()) {
    $arts[$media_id][$type] = $url;
}

echo json_encode($arts, JSON_UNESCAPED_UNICODE);

$stmt -> close();
$mysqli -> close();

?>