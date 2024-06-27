import { FC, useEffect } from 'react'
import s from './style.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useToast } from '@components/toastMessage'
import { useAuth } from '@hooks/useAuth'
import { instance } from '@api/axios.api'
import { ServerURLS, URLS } from '@enums/URLS'

const Confirm: FC = () => {
	const { token } = useParams()
	const { user, updateUser } = useAuth()
	const navigate = useNavigate()
	const toast = useToast()
	console.log(token)
	//
	async function sendEmailToken() {
		try {
			const data = await instance.get(ServerURLS.GETMAILCONFIRM + '/' + token)
			if (data.status == 200) {
				navigate(URLS.profile)
				updateUser()
				toast?.open.success('Email confirmed successfully.')
			}
		} catch (err) {
			toast?.open.error('Something went wrong')
		}
	}
	useEffect(() => {
		if (user?.emailVerification == true) {
			navigate(URLS.home)
		}
		sendEmailToken()
		navigate(URLS.home)
	}, [])

	return (
		<div className={s.confirmPage}>
			<h1>Confirming...</h1>
		</div>
	)
}

export default Confirm
