import React, { FC } from 'react'
import s from './style.module.css'
import { useAuth } from '@hooks/useAuth'

const Home: FC = ({}) => {
	const { user } = useAuth()
	console.log(user)
	return (
		<div>
			<p>Name: {user?.userName}</p>
			<p>Emai: {user?.email}</p>
			<p>EmailConfirm: {user?.emailVerification ? 'true' : 'false'}</p>
			<p>Role: {user?.role}</p>
			<p>Id: {user?.id}</p>
		</div>
	)
}

export default Home
