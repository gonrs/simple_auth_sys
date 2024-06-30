import { instance, updateInstance } from '@api/axios.api'
import { useToast } from '@components/toastMessage'
import { ServerURLS } from '@enums/URLS'
import { useAuth } from './useAuth'
import { ITokensType } from '@type/resTypes'
import { tokenHelper } from '@helper/tokenHelper'

export const useProfile = () => {
	const toast = useToast()
	const { logOut, updateUser } = useAuth()
	//
	async function deleteAccount() {
		try {
			await instance.delete(ServerURLS.DELETE_ACCOUNT)
			logOut()
			toast?.open.success('Account deleted successfully')
		} catch (err: any) {
			toast?.open.error(err.response.data.message)
		}
	}
	async function sendConfirmMail() {
		try {
			await instance.get(ServerURLS.SENDEMAILCONFIRM)
		} catch (err: any) {
			toast?.open.error(err.response.data.message)
		}
	}
	async function changeName(newUserName: string) {
		try {
			await instance.get(ServerURLS.UPDATE_userName + '/' + newUserName)
			toast?.open.success('Name has been updated')
			updateUser()
		} catch (err: any) {
			toast?.open.error(err.response.data.message)
		}
	}
	async function changePassword(oldPassword: string, newPassword: string) {
		try {
			await instance.post(ServerURLS.UPDATE_password, {
				oldPassword,
				newPassword,
			})
			toast?.open.success('Password has been updated')
		} catch (err: any) {
			toast?.open.error(err.response.data.message)
		}
	}
	async function resetPassword() {
		try {
			await instance.get(ServerURLS.UPDATE_resetPassword)
			toast?.open.success('Your new password has been sent to your email')
		} catch (err: any) {
			toast?.open.error(err.response.data.message)
		}
	}

	async function changeEmail(password: string, email: string) {
		try {
			const { data } = await instance.post<ITokensType>(
				ServerURLS.UPDATE_email,
				{
					password: password,
					newEmail: email,
				}
			)
			tokenHelper.setAccessTokenToLocalStorage(data.access_token)
			tokenHelper.setRefreshTokenToLocalStorage(data.refresh_token)
			updateInstance()
			toast?.open.success('Email has been updated')
			updateUser()
		} catch (err: any) {
			toast?.open.error(err.response.data.message)
		}
	}
	return {
		deleteAccount,
		sendConfirmMail,
		changeName,
		changePassword,
		resetPassword,
		changeEmail,
	}
}
