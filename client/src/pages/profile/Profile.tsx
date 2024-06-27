import React, { FC, useState } from 'react'
import s from './style.module.css'
import { useAuth } from '@hooks/useAuth'
import { Button } from '@ui'
import { ROLE } from '@enums/ROLE'
import { useProfile } from '@hooks/useProfile'

const Profile: FC = ({}) => {
	const [isSendEmailDisabled, setIsSendEmailDisabled] = useState(false)
	//
	const { user } = useAuth()
	const { deletAccount, sendConfirmMail } = useProfile()
	return (
		<div>
			<h2 className={s.profileTitle}>{user?.userName}`s Profile</h2>
			<div className={s.profileMain}>
				<div className={s.profileFlex}>
					<h2>
						Name: <span>{user?.userName}</span>
					</h2>
					<Button onClick={() => console.log('Change name')} size='small'>
						Change
					</Button>
				</div>
				<div className={s.profileFlex}>
					<h2>
						Email: <span>{user?.email}</span>
					</h2>
					<Button onClick={() => console.log('Change email')} size='small'>
						Change
					</Button>
				</div>
				<div className={s.profileFlex}>
					<h2>
						Email confirm: <span>{user?.emailVerification ? 'Yes' : 'No'}</span>
					</h2>
					{!user?.emailVerification && (
						<Button
							disabled={isSendEmailDisabled}
							onClick={() => {
								sendConfirmMail()
								setIsSendEmailDisabled(true)
							}}
							size='small'
						>
							Send confirmation email
						</Button>
					)}
				</div>
				<div className={s.profileFlex}>
					<h2>
						Role: <span>{user?.role}</span>
					</h2>
					<Button onClick={() => console.log('Change role')} size='small'>
						Set to {user?.role === ROLE.USER ? ROLE.ADMIN : ROLE.USER}
					</Button>
				</div>

				<div className={s.profileFlex}>
					<Button onClick={deletAccount} size='small' color='red'>
						Delete accaunt
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Profile
