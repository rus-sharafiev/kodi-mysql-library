import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { ReactNode } from "react"
// components
import { App } from "../App"
import { Movies } from "../components/Movies"
import { Tvs } from "../components/Tvs"

// --------------------------------------------------------------------------------

export const AppRoutes: ReactNode =
    <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/movies" replace={true} />} />
        <Route path="movies" element={<Movies />} />
        <Route path="tvs" element={<Tvs />} />
    </Route>

export const router = createBrowserRouter(createRoutesFromElements(AppRoutes))