import { instance } from '@api/axios.api'
import { useToast } from '@components/toastMessage'
import { ServerURLS } from '@enums/URLS'
import { useAuth } from './useAuth'

export const useProfile = () => {
	const toast = useToast()
	const { logOut, updateUser } = useAuth()
	//
	async function deleteAccount() {
		try {
			await instance.delete(ServerURLS.DELETE_ACCOUNT)
			logOut()
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
			updateUser()
		} catch (err: any) {
			toast?.open.error(err.response.data.message)
		}
	}
	return { deleteAccount, sendConfirmMail, changeName }
}
