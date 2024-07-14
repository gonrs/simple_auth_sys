import { createBrowserRouter } from 'react-router-dom'
import Home from '@pages/home/Home'
import { URLS } from '@enums/URLS'
import Auth from '@pages/auth/Auth'
import ProtectedRoute from './ProtectedRoute'
import ErrorPage from '@pages/helpPages/ErrorPage'
import LayOut from '@pages/helpPages/LayOut'
import Profile from '@pages/profile/Profile'
import Confirm from '@pages/helpPages/Confirm'
import Admin from '@pages/admin/Admin'
import AdminRoute from './AdminRoute'
import UserAdmin from '@modules/admin/UserAdmin'

export const MainRoute = createBrowserRouter([
	{
		path: '/',
		element: <LayOut />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <ProtectedRoute children={<Home />} needToBeAuth={true} />,
			},
			{
				path: URLS.auth,
				element: <ProtectedRoute children={<Auth />} needToBeAuth={false} />,
			},
			{
				path: URLS.profile,
				element: <ProtectedRoute children={<Profile />} needToBeAuth={true} />,
			},
			{
				path: URLS.confirm,
				element: <ProtectedRoute children={<Confirm />} needToBeAuth={true} />,
			},
			{
				path: URLS.admin,
				element: <AdminRoute children={<Admin />} />,
				children: [
					{
						path: 'user',
						element: <UserAdmin />,
					},
				],
			},
		],
	},
])
