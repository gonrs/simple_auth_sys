import { FC } from 'react'
import s from './style.module.css'

interface IInputWithErrorProps {
	className?: string
	value: string
	setValue: (value: string) => void
	name: string
	errorFunc: (value: string) => string
	type?: string
}

const InputWithError: FC<IInputWithErrorProps> = ({
	className,
	value,
	setValue,
	name,
	errorFunc,
	type,
}) => {
	return (
		<div className={[s.errorInputCon, className].join(' ')}>
			<input
				type={!type ? 'text' : type}
				className={[
					s.errorInput,
					errorFunc(value).length > 0 ? s.errorInputActive : '',
				].join(' ')}
				value={value}
				onChange={e => setValue(e.target.value)}
				placeholder={name}
			/>
			{errorFunc(value).length > 0 && (
				<h3 className={s.errorInputError}>{errorFunc(value)}</h3>
			)}
		</div>
	)
}
export default InputWithError
