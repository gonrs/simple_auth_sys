import { createContext, useContext } from 'react'

interface IToastContextValue {
	open: {
		error: (message: string) => void
		success: (message: string) => void
		message: (message: string) => void
	}
	close: (id: number) => void
}
export const ToastContext = createContext<IToastContextValue | null>(null)

//
export const useToast = () => useContext(ToastContext)
//
