import { store } from './store'
import { router } from './routes'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

// --------------------------------------------------------------------------------

createRoot(document.getElementById('root') as HTMLElement)
    .render(
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    )