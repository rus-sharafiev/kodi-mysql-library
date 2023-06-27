import { createApi } from '@reduxjs/toolkit/query/react'
import fatchApi, { ApiRoutes } from '../../utils/api'
// @types
import { Movie } from '../../@types/movie'
import { Tv } from '../../@types/tv'

// --------------------------------------------------------------------------------

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fatchApi.baseQuery,
    keepUnusedDataFor: 10 * 60,
    tagTypes: ['Movie', 'Tv'],
    endpoints: (builder) => ({

        getMovies: builder.query<Movie[], ''>({
            query: () => ({ url: ApiRoutes.MOVIES }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Movie' as const, id })), 'Movie']
                    : ['Movie']
        }),

        getTvs: builder.query<Tv[], ''>({
            query: () => ({ url: ApiRoutes.TVS }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Tv' as const, id })), 'Tv']
                    : ['Tv']
        }),

    }),
})

export const {
    useGetMoviesQuery,
    useGetTvsQuery
} = api