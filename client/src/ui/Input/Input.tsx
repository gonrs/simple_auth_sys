import { FC, InputHTMLAttributes } from 'react'
import s from './style.module.css'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	// props
	color?: 'main' | 'primary' | 'active' | 'red'
	width?: 'small' | 'main' | 'large'
}

const Input: FC<IInputProps> = ({
	color = 'main',
	width = 'main',
	...props
}) => {
	return (
		<input className={[s.input, s[color], s[width]].join(' ')} {...props} />
	)
}

export default Input
