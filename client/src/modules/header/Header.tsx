import React, { FC } from 'react'
import s from './style.module.css'
import { Link } from 'react-router-dom'
import { URLS } from '@enums/URLS'
import { Button } from '@ui'
import { useAuth } from '@hooks/useAuth'

const Header: FC = ({}) => {
	const { isAuth, logOut, user } = useAuth()
	return (
		<header className={s.header}>
			<Link to={URLS.home}>
				<h2>App</h2>
			</Link>
			<div>
				{isAuth ? (
					<div className={s.headerInfo}>
						<Link to={URLS.profile}>
							<Button color='primary'>{user?.userName}</Button>
						</Link>
						<Button onClick={logOut}>LogOut</Button>
					</div>
				) : (
					<Link to={URLS.auth}>
						<Button>Login</Button>
					</Link>
				)}
			</div>
		</header>
	)
}

export default Header
