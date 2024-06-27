import { FC } from 'react'
import s from './style.module.css'

const ServerNotWorking: FC = () => {
	return (
		<div className={s.serverNotWorking}>
			<h1>The server is down, please try again later.</h1>
			<h2>:(</h2>
		</div>
	)
}

export default ServerNotWorking
