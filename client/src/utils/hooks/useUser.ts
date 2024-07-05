import { instance } from '@api/axios.api'
import { ServerURLS } from '@enums/URLS'
import { ISubUser } from '@type/userTypes'
import { useError } from './useError'

export const useUser = () => {
	const { logError } = useError()
	async function findUserByEmail(email: string): Promise<ISubUser | null> {
		try {
			const { data } = await instance.post<ISubUser>(
				ServerURLS.GETUSERBYEMAIL,
				{ email }
			)
			return data
		} catch (err: any) {
			logError(err)
			return null
		}
	}
	async function findUserById(id: string): Promise<ISubUser | null> {
		try {
			const { data } = await instance.post<ISubUser>(ServerURLS.GETUSERBYID, {
				id: +id,
			})
			return data
		} catch (err: any) {
			logError(err)
			return null
		}
	}
	return { findUserByEmail, findUserById }
}
