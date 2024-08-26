import { createHashRouter} from 'react-router-dom'

import Login from '@/pages/Login'
import Layout from '@/pages/Layout'

const router = createHashRouter([
    {
        path: '/',
        element: <Layout />,
    },
    {
        path: '/login',
        element: <Login />,
    },
])

export default router
