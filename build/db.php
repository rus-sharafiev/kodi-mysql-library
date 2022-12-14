<?php
header("Content-Type: application/json; charset=UTF-8");

try {
    $mysqli = new mysqli("localhost", "kodi", "kodi", "MyVideos119");
} catch (mysqli_sql_exception $e) {
    exit(json_encode(['status' => 'error', 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE));
}

if (!$mysqli -> set_charset("utf8")) {
    exit();
}

$output = Array();

if (($_GET['type'] ?? NULL) === 'movies') {

    $query = "  SELECT idMovie, c00, c01, c03, c06, c12, c14, c15, c16, c18, c19, c21, premiered, tmdb.rating, poster.url, fanart.url
                FROM movie
                JOIN rating tmdb ON movie.idMovie = tmdb.media_id AND tmdb.rating_type = 'themoviedb'
                JOIN art poster ON movie.idMovie = poster.media_id AND poster.type = 'poster'
                JOIN art fanart ON movie.idMovie = fanart.media_id AND fanart.type = 'fanart'
            ";

    if ($stmt = $mysqli -> prepare( $query )) {
        $stmt -> execute();
        $stmt -> bind_result(
            $idMovie,
            $title,
            $review,
            $subtitle,
            $writer,
            $pg_rating,
            $genre,
            $director,
            $original_title,
            $studio,
            $youtube,
            $country,	
            $premiered,
            $rating,
            $poster,
            $fanart
        );
    }
    
    while ($stmt -> fetch()) {
    
        $output[] = [
            'id' => $idMovie,
            'poster' => str_replace('original', 'w342', $poster),
            'fanart' => str_replace('original', 'w780', $fanart),
            'title' => $title,
            'review' => $review, 
            'subtitle' => $subtitle, 
            'writer' => $writer,
            'pg_rating' => substr($pg_rating, 6), 
            'genre' => $genre, 
            'director' => $director, 
            'original_title' => $original_title, 
            'studio' => $studio, 
            'youtube' => 'https://www.youtube.com/watch?v='. substr($youtube, -11),
            'country' => $country,
            'premiered_date' => $premiered,
            'rating' => $rating
        ];
    }
    echo json_encode($output, JSON_UNESCAPED_UNICODE);
    $stmt -> close();

} elseif (($_GET['type'] ?? NULL) === 'tvs') {

    $query = "  SELECT idShow, c00, c01, c05, c08, c09, c13, c14, c16, tmdb.rating, poster.url, fanart.url
                FROM tvshow
                JOIN rating tmdb ON tvshow.idShow = tmdb.media_id AND tmdb.rating_type = 'tmdb'
                JOIN art poster ON tvshow.idShow = poster.media_id AND poster.type = 'poster' AND poster.media_type = 'tvshow'
                JOIN art fanart ON tvshow.idShow = fanart.media_id AND fanart.type = 'fanart' AND fanart.media_type = 'tvshow'
            ";

    if ($stmt = $mysqli -> prepare( $query )) {
        $stmt -> execute();
        $stmt -> bind_result(
            $id,
            $title,
            $review,
            $premiered,
            $genre,
            $original_title,
            $pg_rating,
            $studio,
            $youtube,
            $rating,
            $poster,
            $fanart
        );
    }

    while ($stmt -> fetch()) {

        $output[] = [
            'id' => $id,
            'poster' => str_replace('original', 'w342', $poster),
            'fanart' => str_replace('original', 'w780', $fanart),
            'title' => $title,
            'review' => $review,
            'pg_rating' => substr($pg_rating, 6), 
            'genre' => $genre, 
            'original_title' => $original_title, 
            'studio' => $studio, 
            'youtube' => 'https://www.youtube.com/watch?v='. substr($youtube, -11),
            'premiered_date' => $premiered,
            'rating' => $rating
        ];
    }

    echo json_encode($output, JSON_UNESCAPED_UNICODE);
    $stmt -> close();

} else {
    printf('Необходимо указать тип медиа');
}
$mysqli -> close();
?>