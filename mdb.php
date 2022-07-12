<?php

$mysqli = new mysqli("localhost", "kodi", "kodi", "MyVideos119");

if ($mysqli -> connect_errno) {
    echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

if (!$mysqli -> set_charset("utf8")) {
    printf("Ошибка при загрузке набора символов utf8: %s\n", $mysqli->error);
    exit();
}

$query = "SELECT * FROM movie;";

if ($stmt = $mysqli -> prepare( $query )) {
    $stmt -> execute();
    $stmt -> bind_result(
        $idMovie,   // id
        $idFile,
        $title,
        $review,
        $c02,
        $subtitle,	
        $c04,
        $c05,
        $writer,
        $c07,
        $c08,	    // posters
        $c09,
        $c10,
        $c11,
        $pg_rating,
        $c13,
        $genre,
        $director,
        $original_title,
        $c17,	
        $studio,
        $c19,	    // YouTube
        $c20,	    // fanarts
        $country,
        $smb_location,
        $c23,
        $movies_set,
        $userrating,	
        $premiered
    );
}

$movies = Array();
while ($stmt -> fetch()) {

    preg_match('/<thumb aspect="poster"[^>]*>(.*?)<\/thumb>/', $c08, $posters);
    preg_match('/<thumb[^>]*>(.*?)<\/thumb>/', $c20, $fanarts);
    $yt = substr($c19, -11);
    $pg = substr($pg_rating, 6);

    $movies[] = [
        'id' => $idMovie,
        'title' => $title,
        'review' => $review, 
        'subtitle' => $subtitle, 
        'writer' => $writer, 
        'poster' => $posters[1], 
        'pg_rating' => $pg, 
        'genre' => $genre, 
        'director' => $director, 
        'original_title' => $original_title, 
        'studio' => $studio, 
        'youtube' => 'https://www.youtube.com/watch?v='.$yt, 
        'fanart' => $fanarts[1], 
        'country' => $country, 
        'smb_location' => $smb_location, 
        'movies_set' => $movies_set, 
        'premiered_date' => $premiered
    ];
}

echo json_encode($movies, JSON_UNESCAPED_UNICODE);

$stmt -> close();
$mysqli -> close();

?>