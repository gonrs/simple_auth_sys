import React, { FC } from 'react'
import s from './style.module.css'
import { Outlet } from 'react-router-dom'

const Admin: FC = ({}) => {
	return (
		<>
			<Outlet />
		</>
	)
}

export default Admin
