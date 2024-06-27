import React, { FC } from 'react'
import s from './style.module.css'
import { Outlet } from 'react-router-dom'
import Header from '@modules/header/Header'
import { ToastProvider } from '@components/toastMessage'

const LayOut: FC = ({}) => {
	return (
		<ToastProvider>
			<div className={s.layOutContainer}>
				<Header />
				<div className={s.container}>
					<Outlet />
				</div>
			</div>
		</ToastProvider>
	)
}

export default LayOut
