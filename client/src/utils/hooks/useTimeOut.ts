import { useEffect, useRef } from 'react'

export function useTimeOut(callBackFunc: () => void, time: number) {
	const savedCallBack = useRef(callBackFunc)

	useEffect(() => {
		savedCallBack.current = callBackFunc
	}, [callBackFunc])

	useEffect(() => {
		const functionId = setTimeout(() => savedCallBack.current(), time)
		return () => clearTimeout(functionId)
	}, [])
}
