import React, { FC, useState } from 'react'
import s from './style.module.css'
import InputWithError from '@components/inputWithError/inputWithError'
import { useProfile } from '@hooks/useProfile'
import { Button } from '@ui'
import { validateHelper } from '@helper/validateHelper'

interface IChangeEmailModalProps {
	close: () => void
}

const ChangeEmailModal: FC<IChangeEmailModalProps> = ({ close }) => {
	const [isSubmite, setIsSubmite] = useState(false)
	const [password, setpPassword] = useState<string>('')
	const [newEmail, setNewEmail] = useState<string>('')
	const { changeEmail } = useProfile()
	function checkIsPassword(password: string) {
		if (!validateHelper.checkPassword(password) && isSubmite) {
			return 'Password must be at least 6 characters.'
		}
		return ''
	}
	function checkIsEmail(email: string) {
		if (!validateHelper.checkEmail(email) && isSubmite) {
			return 'Write correct email.'
		}
		return ''
	}
	function handleSubmite(e: any) {
		e.preventDefault()
		setIsSubmite(true)
		if (password.length >= 6 && validateHelper.checkEmail(newEmail)) {
			changeEmail(password, newEmail)
			close()
		}
	}
	return (
		<form onSubmit={handleSubmite}>
			<InputWithError
				value={password}
				setValue={setpPassword}
				name={'Password'}
				errorFunc={checkIsPassword}
			/>
			<InputWithError
				value={newEmail}
				setValue={setNewEmail}
				name={'New email'}
				errorFunc={checkIsEmail}
			/>
			<div className={s.changePassFlex}>
				<Button type='submit' color='primary'>
					Change
				</Button>
				<Button type='button' onClick={close} color='red'>
					Cancel
				</Button>
			</div>
		</form>
	)
}

export default ChangeEmailModal
