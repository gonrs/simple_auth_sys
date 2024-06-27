import React, { FC, useState } from 'react'
import s from './style.module.css'
import { useAuth } from '@hooks/useAuth'
import {
	GoogleOAuthProvider,
	GoogleLogin,
	CredentialResponse,
} from '@react-oauth/google'
import { Button } from '@ui'
import { validateHelper } from '@helper/validateHelper'
import InputWithError from '@components/inputWithError/inputWithError'

const Auth: FC = ({}) => {
	//
	const [userEmail, setUserEmail] = useState<string>('asd@qwe.qwe')
	const [userPassword, setUserPassword] = useState<string>('qweqwe')
	const [userName, setUserName] = useState<string>('')
	//
	const [isLogin, setIsLogin] = useState<boolean>(true)
	const [isSubmite, setIsSubmite] = useState<boolean>(false)
	const { register, login, googleAuth } = useAuth()
	//
	function chekIsName(name: string) {
		if (name.length < 3 && isSubmite) {
			return 'Name must be at least 3 characters'
		}
		return ''
	}
	function checkIsEmail(email: string) {
		if (!validateHelper.checkEmail(email) && isSubmite) {
			return 'Write correct email.'
		}
		return ''
	}
	function checkIsPassword(password: string) {
		if (!validateHelper.checkPassword(password) && isSubmite) {
			return 'Password must be at least 6 characters.'
		}
		return ''
	}
	//
	async function handlLogin(e: any) {
		e.preventDefault()
		setIsSubmite(true)
		if (
			validateHelper.checkEmail(userEmail) &&
			validateHelper.checkPassword(userPassword)
		) {
			login(userEmail, userPassword)
		}
	}
	async function handlRegister(e: any) {
		e.preventDefault()
		setIsSubmite(true)
		if (
			validateHelper.checkEmail(userEmail) &&
			validateHelper.checkPassword(userPassword) &&
			userName.length >= 3
		) {
			register(userEmail, userPassword, userName)
		}
	}
	return (
		<div className={s.authPage}>
			<div className={s.authForm}>
				{isLogin ? (
					<>
						<h2>Login</h2>
						<form onSubmit={handlLogin}>
							<InputWithError
								value={userEmail}
								setValue={setUserEmail}
								name={'email'}
								errorFunc={checkIsEmail}
								type='text'
							/>
							<InputWithError
								value={userPassword}
								setValue={setUserPassword}
								name={'password'}
								errorFunc={checkIsPassword}
								type='password'
							/>
							<Button type='submit'>Login</Button>
							<h4 className={s.authFormText}>
								Dont have an account?
								<button
									type='button'
									onClick={() => {
										setIsLogin(!isLogin)
										setIsSubmite(false)
									}}
								>
									Register
								</button>
							</h4>
						</form>
					</>
				) : (
					<>
						<h2>Register</h2>
						<form onSubmit={handlRegister}>
							<InputWithError
								value={userName}
								setValue={setUserName}
								name={'name'}
								errorFunc={chekIsName}
								type='text'
							/>
							<InputWithError
								value={userEmail}
								setValue={setUserEmail}
								name={'email'}
								errorFunc={checkIsEmail}
								type='text'
							/>
							<InputWithError
								value={userPassword}
								setValue={setUserPassword}
								name={'password'}
								errorFunc={checkIsPassword}
								type='password'
							/>
							<Button type='submit'>Register</Button>
							<h4 className={s.authFormText}>
								Already have an account ?
								<button
									type='button'
									onClick={() => {
										setIsLogin(!isLogin)
										setIsSubmite(false)
									}}
								>
									Login
								</button>
							</h4>
						</form>
					</>
				)}
				<p>or</p>
				<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
					<GoogleLogin
						// type='icon'
						text='continue_with'
						theme='filled_black'
						onSuccess={(credentialResponse: CredentialResponse) => {
							console.log(credentialResponse)
							googleAuth(
								credentialResponse.credential
									? credentialResponse.credential
									: null
							)
						}}
						onError={() => {
							console.log('Login Failed')
						}}
					/>
				</GoogleOAuthProvider>
			</div>
		</div>
	)
}

export default Auth
