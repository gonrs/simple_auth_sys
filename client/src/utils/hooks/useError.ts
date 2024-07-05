import { useToast } from '@components/toastMessage'

export const useError = () => {
	const toast = useToast()
	function logError(err: any) {
		if (err.response.data.errorType === 'ValidationError') {
			toast?.open.error(err.response.data?.errorCodes[0].message)
		} else {
			toast?.open.error(err.response.data?.message)
		}
	}
	return {logError}
}
