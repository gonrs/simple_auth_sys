import { ROLE } from '@enums/ROLE'

export interface IUser {
	id: number
	userName: string
	email: string
	emailVerification: boolean
	openProfile: boolean
	role: ROLE
}
export interface ISubUser {
	id: number
	userName: string
	email: string
	role: ROLE
}
