import { ROLE } from '@enums/ROLE'

export interface IUser {
	id: number
	userName: string
	email: string
	emailVerification: boolean
	role: ROLE
}
