import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '@type/userTypes'

interface UserState {
	user: IUser | null
	isAuth: boolean
	update: number
}

const initialState: UserState = {
	user: null,
	isAuth: false,
	update: 0,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		authUser: (state, action: PayloadAction<IUser | null>) => {
			state.user = action.payload
			state.isAuth = true
		},
		logoutUser: state => {
			state.user = null
			state.isAuth = false
		},
		setUpdate: state => {
			state.update++
		},
	},
})

export const { authUser, logoutUser, setUpdate } = userSlice.actions

// export const selectCount = (state: RootState) => state.user

export default userSlice.reducer