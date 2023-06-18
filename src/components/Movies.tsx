import { useGetMoviesQuery } from "../store/api/api"

// --------------------------------------------------------------------------------

const proxyImage = (url: string) => {
    if (!url) return;
    let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';

    return (googleProxyURL + encodeURIComponent(url));
}

export const Movies: React.FC = () => {
    const { data: movies, isFetching } = useGetMoviesQuery()
    console.log(movies)

    return (
        <>
            {movies && movies.map(movie =>
                <div className="card" key={`movie-${movie.id}`}>
                    <img src={proxyImage(movie.art.poster.replace('original', 'w185'))} />
                </div>
            )}
        </>
    )
}