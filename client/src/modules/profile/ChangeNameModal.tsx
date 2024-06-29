import React, { FC, useState } from 'react'
import s from './style.module.css'
import InputWithError from '@components/inputWithError/inputWithError'
import { Button } from '@ui'
import { useProfile } from '@hooks/useProfile'

interface IChangeNameModal {
	close: () => void
}

const ChangeNameModal: FC<IChangeNameModal> = ({ close }) => {
	const [isSubmite, setIsSubmite] = useState(false)
	const [newName, setNewName] = useState<string>('')
	const { changeName } = useProfile()
	function handleSubmite(e: any) {
		e.preventDefault()
		setIsSubmite(true)
		if (newName.length >= 3) {
			changeName(newName)
			close()
		}
	}
	return (
		<form onSubmit={handleSubmite}>
			<InputWithError
				value={newName}
				setValue={setNewName}
				name={'new name'}
				errorFunc={(name: string) => {
					if (name.length < 3 && isSubmite && name.length !== 0) {
						return 'Name must be at least 3 characters'
					}
					return ''
				}}
			/>
			<div className={s.changeNameFlex}>
				<Button type='submit' color='primary'>
					Change
				</Button>
				<Button type='button' onClick={close} color='red'>
					Cancel
				</Button>
			</div>
		</form>
	)
}

export default ChangeNameModal
