import { createBrowserRouter } from "react-router-dom"
// components
import { App } from "../App"

// --------------------------------------------------------------------------------

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "movies", element: null, children: [{ path: ":slug", element: null }] },
            { path: "tvs", element: null, children: [{ path: ":slug", element: null }] }
        ]
    },
])