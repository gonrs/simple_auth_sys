import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import s from './style.module.css'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	// props
	size?: 'large' | 'small' | 'medium'
	color?: 'main' | 'primary' | 'active' | 'red'
	children: ReactNode
}

const Button: FC<IButtonProps> = ({
	size = 'medium',
	color = 'main',
	children,
	...props
}) => {
	return (
		<button className={[s.btn, s[color], s[size]].join(' ')} {...props}>
			{children}
		</button>
	)
}

export default Button
