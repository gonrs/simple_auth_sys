export const tokenHelper = {
	// Access token
	getAccessTokenFromLocalStorage(): string | null {
		return localStorage.getItem('accessToken')
	},
	setAccessTokenToLocalStorage(token: string): void {
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
