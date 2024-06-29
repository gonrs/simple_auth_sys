import React, { FC, useState } from 'react'
import s from './style.module.css'
import { useAuth } from '@hooks/useAuth'
import { Button } from '@ui'
import { ROLE } from '@enums/ROLE'
import { useProfile } from '@hooks/useProfile'
import { ModalPage } from '@components/modal'
import ChangeNameModal from '@modules/profile/ChangeNameModal'

const Profile: FC = ({}) => {
	const [isNameModalOpen, setIsNameModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	//
	const [isSendEmailDisabled, setIsSendEmailDisabled] = useState(false)
	//
	const { user } = useAuth()
	const { deleteAccount, sendConfirmMail } = useProfile()
	return (
		<div>
			<ModalPage
				active={isNameModalOpen}
				setActive={setIsNameModalOpen}
				type='modal'
				title='Change name.'
				children={<ChangeNameModal close={() => setIsNameModalOpen(false)} />}
			/>
			<ModalPage
				active={isDeleteModalOpen}
				setActive={setIsDeleteModalOpen}
				type='confirm'
				title='Delete account.'
				text='Are you really want to delete account ?'
				okFunction={deleteAccount}
			/>
			<h2 className={s.profileTitle}>{user?.userName}`s Profile</h2>
			<div className={s.profileMain}>
				<div className={s.profileFlex}>
					<h2>
						Name: <span>{user?.userName}</span>
					</h2>
					<Button onClick={() => setIsNameModalOpen(true)} size='small'>
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
					<Button
						onClick={() => setIsDeleteModalOpen(true)}
						size='small'
						color='red'
					>
						Delete accaunt
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Profile
