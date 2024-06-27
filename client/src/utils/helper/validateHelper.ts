export const validateHelper = {
	checkEmail(email: string): boolean {
		const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
		return regex.test(email)
	},
	checkPassword(password: string): boolean {
		return password.length >= 6
	},
}
