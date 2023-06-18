import FetchApi from "@russh/fetch-api"

// --------------------------------------------------------------------------------

export const BASE_URL: string = 'http://10.10.10.100:8088'

export enum ApiRoutes {
    MOVIES = '/api/movies',
    TVS = '/api/tvs',
}

export const api = new FetchApi(BASE_URL)
export default api