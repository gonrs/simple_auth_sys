import { instance } from '@api/axios.api'
import { useToast } from '@components/toastMessage'
import { ServerURLS } from '@enums/URLS'
import { useAuth } from './useAuth'

export const useProfile = () => {
	const toast = useToast()
	const { logOut } = useAuth()
	//
	async function deletAccount() {
		try {
			await instance.get(ServerURLS.DELETE_ACCOUNT)
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
	return { deletAccount, sendConfirmMail }
}
