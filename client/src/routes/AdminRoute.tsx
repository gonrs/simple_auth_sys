import { ROLE } from '@enums/ROLE'
import { URLS } from '@enums/URLS'
import { useAuth } from '@hooks/useAuth'
import { FC } from 'react'
import { Navigate } from 'react-router-dom'
interface IAdminRouteProps {
	children: JSX.Element
}
const AdminRoute: FC<IAdminRouteProps> = ({ children }) => {
	const { isAuth, user } = useAuth()

	if (!isAuth || user?.role !== ROLE.ADMIN) {
		return <Navigate to={URLS.home} />
	}
	return children
}
export default AdminRoute
