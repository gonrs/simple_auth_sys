import { instance, updateInstance, updateToken } from '@api/axios.api'
import { useToast } from '@components/toastMessage'
import { ServerURLS } from '@enums/URLS'
import { tokenHelper } from '@helper/tokenHelper'
import { useAppDispatch, useAppSelector } from '@store/storeHook'
import { authUser, setUpdate, logoutUser } from '@store/user/userSlice'
import { IGetUserType, ITokensType } from '@type/resTypes'

import { IUser } from '@type/userTypes'

export const useAuth = () => {
	const user = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()
	const toast = useToast()
	// Redux User
	async function authMyUser(user: IUser) {
		dispatch(authUser(user))
	}
	async function updateUser() {
		dispatch(setUpdate())
	}
	async function logOut() {
		tokenHelper.clearAccessTokenFromLocalStorage()
		tokenHelper.clearRefreshTokenFromLocalStorage()
		updateInstance()
		dispatch(logoutUser())
	}
	// Auth functions
	async function register(email: string, password: string, name: string) {
		try {
			const registeredUser = await instance.post<IGetUserType>(
				ServerURLS.REGISTER,
				{
					email: email,
					password: password,
					userName: name,
				}
			)
			if (registeredUser.status === 200) {
				authMyUser({
					id: registeredUser.data.user.id,
					userName: registeredUser.data.user.userName,
					email: registeredUser.data.user.email,
					emailVerification: registeredUser.data.user.emailVerification,
					role: registeredUser.data.user.role,
				})
				tokenHelper.setAccessTokenToLocalStorage(
					registeredUser.data.access_token
				)
				tokenHelper.setRefreshTokenToLocalStorage(
					registeredUser.data.refresh_token
				)
				toast?.open.success('Register Successfully')
				updateInstance()
			}
		} catch (err: any) {
			toast?.open.error(err.response.data.message)
			console.log(err.response.data.message)
		}
	}
	async function login(email: string, password: string) {
		try {
			const registeredUser = await instance.post<IGetUserType>(
				ServerURLS.LOGIN,
				{
					email: email,
					password: password,
				}
			)
			if (registeredUser.status === 200) {
				authMyUser({
					id: registeredUser.data.user.id,
					userName: registeredUser.data.user.userName,
					email: registeredUser.data.user.email,
					emailVerification: registeredUser.data.user.emailVerification,
					role: registeredUser.data.user.role,
				})
				tokenHelper.setAccessTokenToLocalStorage(
					registeredUser.data.access_token
				)
				tokenHelper.setRefreshTokenToLocalStorage(
					registeredUser.data.refresh_token
				)
				toast?.open.success('Login Successfully')
				updateInstance()
			}
		} catch (err: any) {
			toast?.open.error(err.response.data.message)
			console.log(err.response.data.message)
		}
	}
	async function googleAuth(credential: string | null) {
		try {
			if (credential === null) {
				console.log('error')
			} else {
				const registeredUser = await instance.post<IGetUserType>(
					ServerURLS.GOOGLEAUTH,
					{ googleCredToken: credential }
				)
				if (registeredUser.status === 200) {
					authMyUser({
						id: registeredUser.data.user.id,
						userName: registeredUser.data.user.userName,
						email: registeredUser.data.user.email,
						emailVerification: registeredUser.data.user.emailVerification,
						role: registeredUser.data.user.role,
					})
					tokenHelper.setAccessTokenToLocalStorage(
						registeredUser.data.access_token
					)
					tokenHelper.setRefreshTokenToLocalStorage(
						registeredUser.data.refresh_token
					)
					toast?.open.success('Google Auth Successfully')
					updateInstance()
				}
			}
		} catch (err: any) {
			toast?.open.error(err.response.data.message)
			console.log(err.response.data.message)
		}
	}
	async function getMe(): Promise<IUser | null> {
		try {
			const user = await instance.get(ServerURLS.GETME)
			return user.data
		} catch (err: any) {
			return null
		}
	}
	// async function refreshToken() {
	// 	try {
	// 		const { access_token, refresh_token } = (
	// 			await updateToken.post<ITokensType>(ServerURLS.UPDATETOKEN)
	// 		).data
	// 		tokenHelper.setAccessTokenToLocalStorage(access_token)
	// 		tokenHelper.setRefreshTokenToLocalStorage(refresh_token)
	// 	} catch (err: any) {
	// 		logOut()
	// 	}
	// }
	// Profile API
	return {
		user: user.user,
		isAuth: user.isAuth,
		authMyUser,
		updateUser,
		// Auth
		logOut,
		register,
		login,
		googleAuth,
		getMe,
		// refreshToken,
	}
}
