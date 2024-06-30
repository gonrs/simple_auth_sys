export enum URLS {
	home = '/',
	auth = '/auth',
	profile = '/profile',
	confirm = '/confirm/:token',
}
export enum ServerURLS {
	REGISTER = '/auth/register',
	LOGIN = '/auth/login',
	GETME = '/auth/getMe',
	GOOGLEAUTH = '/auth/googleAuth',
	UPDATETOKEN = '/auth/refreshToken',
	//
	SENDEMAILCONFIRM = '/user/sendConfirmMail',
	GETMAILCONFIRM = '/user/confirmMail',
	//
	CHECKSERVERSTATUS = '/user/checkServer',
	//
	UPDATE_userName = '/user/updateName',
	UPDATE_password = '/user/updatePassword',
	UPDATE_resetPassword = '/user/resetPassword',
	UPDATE_email = '/user/updateEmail',
	//
	DELETE_ACCOUNT = '/user/delete',
}
