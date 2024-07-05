import React, { FC, useState } from 'react'
import s from './style.module.css'
import { Button } from '@ui'

interface ISelectProps {
	// props
	options: ISelectOption[]
	currentSelectIndex: number
	setCurrentSelectIndex: (val: number) => void
}

export type ISelectOption = {
	value: string
	name: string
}

const Select: FC<ISelectProps> = ({
	options,
	currentSelectIndex,
	setCurrentSelectIndex,
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<div className={s.select}>
			<button
				className={s.selectButton}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			>
				{options[currentSelectIndex].name}
			</button>
			{isMenuOpen && (
				<div className={s.selectOptions}>
					{options.map((value, index) => {
						return (
							<button
								className={s.selectButton}
								key={index}
								onClick={() => {
									setCurrentSelectIndex(index)
									setIsMenuOpen(false)
								}}
							>
								{value.name}
							</button>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default Select
