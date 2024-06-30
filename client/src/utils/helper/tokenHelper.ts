export const tokenHelper = {
	// Access token
	getAccessTokenFromLocalStorage(): string | null {
		console.log('Get access token')
		return localStorage.getItem('accessToken')
	},
	setAccessTokenToLocalStorage(token: string): void {
		console.log('Set access token')
		localStorage.setItem('accessToken', token)
	},
	clearAccessTokenFromLocalStorage(): void {
		localStorage.removeItem('accessToken')
	},
	// Refresh token
	getRefreshTokenFromLocalStorage(): string | null {
		return localStorage.getItem('refreshToken')
	},
	setRefreshTokenToLocalStorage(token: string): void {
		localStorage.setItem('refreshToken', token)
	},
	clearRefreshTokenFromLocalStorage(): void {
		localStorage.removeItem('refreshToken')
	},
}
