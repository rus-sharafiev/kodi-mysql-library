<?php
header("Content-Type: application/json; charset=UTF-8");

$mysqli = new mysqli("localhost", "kodi", "kodi", "MyVideos119");

if ($mysqli -> connect_errno) {
    echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

if (!$mysqli -> set_charset("utf8")) {
    printf("Ошибка при загрузке набора символов utf8: %s\n", $mysqli->error);
    exit();
}

$output = Array();

if ($_GET['type'] == 'movies') {

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
    
    while ($stmt -> fetch()) {
    
        preg_match('/<thumb aspect="poster"[^>]*>(.*?)<\/thumb>/', $c08, $posters);
        preg_match('/<thumb[^>]*>(.*?)<\/thumb>/', $c20, $fanarts);
        $yt = substr($c19, -11);
        $pg = substr($pg_rating, 6);
    
        $output[$idMovie] = [
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
            'movies_set' => $movies_set, 
            'premiered_date' => $premiered
        ];
    }    
    $stmt -> close();

    $query2 = "SELECT * FROM rating WHERE media_type='movie'";

    if ($stmt = $mysqli -> prepare( $query2 )) {
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

    while ($stmt -> fetch()) {
        $output[$media_id]['rating'] = $rating;
    }

    echo json_encode(array_values($output), JSON_UNESCAPED_UNICODE);
    $stmt -> close();

} elseif ($_GET['type'] == 'tvs') {

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

    while ($stmt -> fetch()) {

        preg_match('/<thumb spoof="" cache="" aspect="poster"[^>]*>(.*?)<\/thumb>/', $c06, $posters);
        preg_match('/<thumb[^>]*>(.*?)<\/thumb>/', $c11, $fanarts);
        $yt = substr($c16, -11);
        $pg = substr($pg_rating, 6);

        $output[$idShow] = [
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
    $stmt -> close();

    $query2 = "SELECT * FROM rating WHERE media_type='tvshow'";

    if ($stmt = $mysqli -> prepare( $query2 )) {
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
    while ($stmt -> fetch()) {
        $output[$media_id]['rating'] = $rating;
    }

    echo json_encode(array_values($output), JSON_UNESCAPED_UNICODE);
    $stmt -> close();

} else {
    printf('Необходимо указать тип медиа');
}
$mysqli -> close();
?>