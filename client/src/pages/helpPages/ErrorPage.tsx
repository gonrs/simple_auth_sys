import { FC } from 'react'
import { Link } from 'react-router-dom'
import s from './style.module.css'

const ErrorPage: FC = () => {
	//
	return (
		<div className={s.errorPageCon}>
			<div className={s.errorPage}>
				<h1>404</h1>
				<h2>Page not found</h2>
				<Link className={s.errorLink} to='/'>
					Go to Home
				</Link>
			</div>
		</div>
	)
}
export default ErrorPage
