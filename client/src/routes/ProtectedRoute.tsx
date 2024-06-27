import { URLS } from '@enums/URLS'
import { useAuth } from '@hooks/useAuth'
import { FC } from 'react'
import { Navigate } from 'react-router-dom'
interface IProtectedRouteProps {
	needToBeAuth: boolean
	children: JSX.Element
}
const ProtectedRoute: FC<IProtectedRouteProps> = ({
	needToBeAuth,
	children,
}) => {
	const { isAuth } = useAuth()

	//
	if (needToBeAuth && !isAuth) {
		return <Navigate to={URLS.auth} />
	}
	if (!needToBeAuth && isAuth) {
		return <Navigate to={URLS.home} />
	}
	return children
}
export default ProtectedRoute
