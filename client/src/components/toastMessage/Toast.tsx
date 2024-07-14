import React, { FC, useMemo, useState } from 'react'
import s from './style.module.css'
import { ToastContext } from './toastContext'
import { useTimeOut } from '@hooks/useTimeOut'
import { preferences } from '@enums/preferencesEnum'
import { IToastType } from '@type/toastType'

//
// Toast Item
interface IToastProps {
	message: string
	close: () => void
	type: 'error' | 'success' | 'message'
}

const Toast: FC<IToastProps> = ({ message, close, type }) => {
	useTimeOut(() => {
		close()
	}, preferences.toastLifeTime)
	if (typeof message !== 'string') {
		close()
	} else if (message.trim().length === 0) {
		close()
	}
	return (
		<div className={[s.toast, s[`toast-${type}`]].join(' ')}>
			{/* <img src={currentToastImage} alt='' className={s.toastImg} /> */}
			<p>{message}</p>
			<button onClick={close} className={s.toastCloseButton}>
				<div className={s.toastCloseBtnSpan1}></div>
				<div className={s.toastCloseBtnSpan2}></div>
			</button>
		</div>
	)
}
export default Toast

// Toast provider
interface IToastProviderProps {
	children: React.ReactElement
}
export function ToastProvider({ children }: IToastProviderProps) {
	const [toasts, setToasts] = useState<IToastType[]>([])
	function openToast(message: string, type: 'error' | 'success' | 'message') {
		const newToast = {
			id: Date.now(),
			message: message,
			type: type,
		}
		setToasts([...toasts, newToast])
	}

	function closeToast(id: number) {
		setToasts(prev => prev.filter(item => item.id !== id))
	}

	const contextValue = useMemo(
		() => ({
			open: {
				error: (message: string) => {
					openToast(message, 'error')
				},
				success: (message: string) => {
					openToast(message, 'success')
				},
				message: (message: string) => {
					openToast(message, 'message')
				},
			},
			close: closeToast,
		}),
		[]
	)

	return (
		<>
			<ToastContext.Provider value={contextValue}>
				{children}
				<div className={s.toasts}>
					{toasts &&
						toasts.map(toast => {
							return (
								<Toast
									message={toast.message}
									close={() => closeToast(toast.id)}
									type={toast.type}
									key={toast.id}
								/>
							)
						})}
				</div>
			</ToastContext.Provider>
		</>
	)
}
