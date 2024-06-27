import { FC } from 'react'
import s from './style.module.css'
const LoadingPage: FC = () => {
	return (
		<div className={s.loadingPage}>
			<h1>Loading...</h1>
		</div>
	)
}
export default LoadingPage
