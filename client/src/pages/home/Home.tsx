import React, { FC, useState } from 'react'
import s from './style.module.css'
import Select, { ISelectOption } from '@components/select/Select'
import { ISubUser, IUser } from '@type/userTypes'
import { Input, Button } from '@ui'
import { useUser } from '@hooks/useUser'

const Home: FC = ({}) => {
	const [options, setOptions] = useState<ISelectOption[]>([
		{ value: 'email', name: 'Email' },
		{ value: 'id', name: 'Id' },
	])
	const [optionsIndex, setOptionsIndex] = useState(0)
	//
	const { findUserByEmail, findUserById } = useUser()
	//
	const [userInfo, setUserInfo] = useState('')
	const [findedUser, setFindedUser] = useState<ISubUser | null>(null)
	async function findUser(e: any) {
		e.preventDefault()
		switch (options[optionsIndex].value) {
			case 'email':
				const userByEmail = await findUserByEmail(userInfo)
				setFindedUser(userByEmail)
				break
			case 'id':
				const userById = await findUserById(userInfo)
				setFindedUser(userById)
				break
		}
	}
	return (
		<div className={s.homePage}>
			<h1 className={s.homeTitle}>Home page</h1>
			<div className={s.homeFlex}>
				<h4>Find user by </h4>
				<Select
					options={options}
					currentSelectIndex={optionsIndex}
					setCurrentSelectIndex={setOptionsIndex}
				/>
				<form onSubmit={findUser} className={s.homeContent}>
					<Input
						width='large'
						value={userInfo}
						onChange={e => setUserInfo(e.target.value)}
						type='text'
						placeholder={'User ' + options[optionsIndex].name}
						color='active'
					/>
					<Button
						color='main'
						disabled={userInfo.trim().length === 0}
						type='submit'
					>
						Find
					</Button>
				</form>
			</div>
			<div className={s.homeUserCon}>
				{findedUser !== null && (
					<div className={s.homeUser}>
						<h2>
							Id: <span>{findedUser?.id}</span>
						</h2>
						<h2>
							Name: <span>{findedUser?.userName}</span>
						</h2>
						<h2>
							Email: <span>{findedUser?.email}</span>
						</h2>
						<h2>
							Role: <span>{findedUser?.role}</span>
						</h2>
					</div>
				)}
			</div>
		</div>
	)
}

export default Home
