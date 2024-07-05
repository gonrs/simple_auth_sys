import { tokenHelper } from '@helper/tokenHelper'
import axios from 'axios'

export const instance = axios.create({
	baseURL: import.meta.env.VITE_URL,
	headers: {
		Authorization: `Bearer ${tokenHelper.getAccessTokenFromLocalStorage()}`,
	},
})
export function updateInstance() {
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
