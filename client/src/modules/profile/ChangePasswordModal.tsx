import React, { FC, useState } from 'react'
import s from './style.module.css'
import InputWithError from '@components/inputWithError/inputWithError'
import { useProfile } from '@hooks/useProfile'
import { Button } from '@ui'
import { validateHelper } from '@helper/validateHelper'

interface IChangePasswordModalProps {
	close: () => void
}

const ChangePasswordModal: FC<IChangePasswordModalProps> = ({ close }) => {
	const [isSubmite, setIsSubmite] = useState(false)
	const [oldPassword, setOldPassword] = useState<string>('')
	const [newPassword, setNewPassword] = useState<string>('')
	const [newPassword2, setNewPassword2] = useState<string>('')
	const { changePassword } = useProfile()
	function checkIsPassword(password: string) {
		if (!validateHelper.checkPassword(password) && isSubmite) {
			return 'Password must be at least 6 characters.'
		}
		return ''
	}
	function handleSubmite(e: any) {
		e.preventDefault()
		setIsSubmite(true)
		if (
			oldPassword.length >= 6 &&
			newPassword.length >= 6 &&
			newPassword === newPassword2 &&
			oldPassword !== newPassword
		) {
			changePassword(oldPassword, newPassword)
			close()
		}
	}
	return (
		<form onSubmit={handleSubmite}>
			<InputWithError
				value={oldPassword}
				setValue={setOldPassword}
				name={'Old password'}
				errorFunc={checkIsPassword}
			/>
			<InputWithError
				value={newPassword}
				setValue={setNewPassword}
				name={'New password'}
				errorFunc={(pass: string) => {
					if (pass.length < 6 && isSubmite && pass.length !== 0) {
						return 'Password must be at least 6 characters'
					}
					if (
						oldPassword === newPassword &&
						(!(
							newPassword.trim().length === 0 ||
							newPassword2.trim().length === 0
						) ||
							isSubmite)
					) {
						return 'The new password must not be equal to the current one'
					}
					if (
						newPassword !== newPassword2 &&
						!(
							newPassword.trim().length === 0 ||
							newPassword2.trim().length === 0
						)
					) {
						return 'Password mismatch'
					}
					return ''
				}}
			/>
			<InputWithError
				value={newPassword2}
				setValue={setNewPassword2}
				name={'New password'}
				errorFunc={(pass: string) => {
					if (pass.length < 6 && isSubmite && pass.length !== 0) {
						return 'Password must be at least 6 characters'
					}
					if (
						oldPassword === newPassword2 &&
						(!(
							newPassword.trim().length === 0 ||
							newPassword2.trim().length === 0
						) ||
							isSubmite)
					) {
						return 'The new password must not be equal to the current one'
					}
					if (
						newPassword !== newPassword2 &&
						(!(
							newPassword.trim().length === 0 ||
							newPassword2.trim().length === 0
						) ||
							isSubmite)
					) {
						return 'Password mismatch'
					}
					return ''
				}}
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

export default ChangePasswordModal
