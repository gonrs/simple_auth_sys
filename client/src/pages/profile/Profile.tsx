import React, { FC, useState } from 'react'
import s from './style.module.css'
import { useAuth } from '@hooks/useAuth'
import { Button } from '@ui'
import { ROLE } from '@enums/ROLE'
import { useProfile } from '@hooks/useProfile'
import { ModalPage } from '@components/modal'
import ChangeNameModal from '@modules/profile/ChangeNameModal'
import ChangePasswordModal from '@modules/profile/ChangePasswordModal'
import ChangeEmailModal from '@modules/profile/ChangeEmailModal'
import { instance } from '@api/axios.api'
import { ServerURLS } from '@enums/URLS'

const Profile: FC = ({}) => {
	const [isNameModalOpen, setIsNameModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [isChangePasswordModalPageOpen, setIsChangePasswordModalPageOpen] =
		useState(false)
	const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
		useState(false)
	const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false)
	//
	const [isSendEmailDisabled, setIsSendEmailDisabled] = useState(false)
	//
	const { user } = useAuth()
	const {
		deleteAccount,
		sendConfirmMail,
		resetPassword,
		updateRole,
		updateIsOpenProfile,
	} = useProfile()
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
				active={isChangePasswordModalPageOpen}
				setActive={setIsChangePasswordModalPageOpen}
				type='modal'
				title='Change password.'
				children={
					<ChangePasswordModal
						close={() => setIsChangePasswordModalPageOpen(false)}
					/>
				}
			/>
			<ModalPage
				active={isChangeEmailModalOpen}
				setActive={setIsChangeEmailModalOpen}
				type='modal'
				title='Change email.'
				children={
					<ChangeEmailModal close={() => setIsChangeEmailModalOpen(false)} />
				}
			/>
			<ModalPage
				active={isDeleteModalOpen}
				setActive={setIsDeleteModalOpen}
				type='confirm'
				title='Delete account.'
				text='Are you really want to delete account ?'
				okFunction={deleteAccount}
			/>
			<ModalPage
				active={isResetPasswordModalOpen}
				setActive={setIsResetPasswordModalOpen}
				type='confirm'
				title='Reset password.'
				text='Your new password will be sent to your email, you really want to do this ?'
				okFunction={resetPassword}
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
					<Button onClick={() => setIsChangeEmailModalOpen(true)} size='small'>
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
						Profile open: <span>{user?.openProfile ? 'Yes' : 'No'}</span>
					</h2>
					<Button onClick={updateIsOpenProfile} size='small'>
						Set profile {user?.openProfile ? 'Private' : 'Public'}
					</Button>
				</div>
				<div className={s.profileFlex}>
					<h2>
						Role: <span>{user?.role}</span>
					</h2>
					<Button onClick={updateRole} size='small'>
						Set to {user?.role === ROLE.USER ? ROLE.ADMIN : ROLE.USER}
					</Button>
				</div>

				<div className={s.profileFlex}>
					<Button
						onClick={() => setIsResetPasswordModalOpen(true)}
						size='small'
						color='primary'
					>
						Reset password
					</Button>
					<Button
						onClick={() => setIsChangePasswordModalPageOpen(true)}
						size='small'
						color='primary'
					>
						Change password
					</Button>
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
