import { createBrowserRouter } from 'react-router-dom'
import Home from '@pages/home/Home'
import { URLS } from '@enums/URLS'
import Auth from '@pages/auth/Auth'
import ProtectedRoute from './ProtectedRoute'
import ErrorPage from '@pages/helpPages/ErrorPage'
import LayOut from '@pages/helpPages/LayOut'
import Profile from '@pages/profile/Profile'
import Confirm from '@pages/helpPages/Confirm'

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
		],
	},
])
