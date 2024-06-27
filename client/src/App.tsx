import { instance, updateToken } from '@api/axios.api'
import { ServerURLS } from '@enums/URLS'
import { tokenHelper } from '@helper/tokenHelper'
import LoadingPage from '@pages/helpPages/LoadingPage'
import ServerNotWorking from '@pages/helpPages/ServerNotWorking'
import { MainRoute } from '@routes/MainRoute'
import { useAppDispatch, useAppSelector } from '@store/storeHook'
import { logoutUser, authUser } from '@store/user/userSlice'
import { ITokensType } from '@type/resTypes'
import { IUser } from '@type/userTypes'
import { useState, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

function App() {
	const [isAllGood, setIsAllGood] = useState(true)
	async function checkServerStatus() {
		try {
			await instance.get(ServerURLS.CHECKSERVERSTATUS)
		} catch (err) {
			setIsAllGood(false)
		}
	}
	useEffect(() => {
		checkServerStatus()
	}, [])
	//
	const dispatch = useAppDispatch()
	const { update } = useAppSelector(state => state.user)
	//
	const [isLoading, setIsLoading] = useState(true)
	async function getMeByToken() {
		try {
			if (tokenHelper.getAccessTokenFromLocalStorage() == null) {
				dispatch(logoutUser())
			} else {
				const data = await instance.get<IUser>(ServerURLS.GETME)
				if (data.status == 200) {
					dispatch(authUser(data.data))
				} else {
					try {
						const { access_token, refresh_token } = (
							await updateToken.post<ITokensType>(ServerURLS.UPDATETOKEN)
						).data
						tokenHelper.setAccessTokenToLocalStorage(access_token)
						tokenHelper.setRefreshTokenToLocalStorage(refresh_token)
					} catch (err: any) {
						dispatch(logoutUser())
					}
				}
			}
		} catch (err) {
			dispatch(logoutUser())
			console.log(err)
		}
		setIsLoading(false)
	}
	useEffect(() => {
		getMeByToken()
	}, [update])
	return (
		<>
			{isLoading ? (
				<LoadingPage />
			) : (
				<>
					{isAllGood ? (
						<RouterProvider router={MainRoute} />
					) : (
						<ServerNotWorking />
					)}
				</>
			)}
			{/* {isAllGood ? (
				<>
					{isLoading ? <LoadingPage /> : <RouterProvider router={MainRoute} />}
				</>
			) : (
				<ServerNotWorking />
			)} */}
		</>
	)
}

export default App
