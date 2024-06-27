import { IUser } from './userTypes'

export interface IGetUserType {
	user: IUser
	access_token: string
	refresh_token: string
}
export interface ITokensType {
	refresh_token: string
	access_token: string
}
