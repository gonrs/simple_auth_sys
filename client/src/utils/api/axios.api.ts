import { tokenHelper } from '@helper/tokenHelper'
import axios from 'axios'

export const instance = axios.create({
	baseURL: import.meta.env.VITE_URL,
	headers: {
		Authorization: `Bearer ${tokenHelper.getAccessTokenFromLocalStorage()}`,
	},
})
export function updateInstance() {
	console.log(1111111)
	instance.defaults.headers.Authorization = `Bearer ${tokenHelper.getAccessTokenFromLocalStorage()}`
}
export const updateToken = axios.create({
	baseURL: import.meta.env.VITE_URL,
	headers: {
		Authorization: `Bearer ${
			tokenHelper.getRefreshTokenFromLocalStorage() || null
		}`,
	},
})
