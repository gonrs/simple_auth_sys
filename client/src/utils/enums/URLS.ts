export enum URLS {
	home = '/',
	auth = '/auth',
	profile = '/profile',
	confirm = '/confirm/:token',
	admin = '/admin',
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
	UPDATE_profileOpen = '/user/updateIsProfileOpen',
	UPDATE_role = '/user/updateRole',
	//
	DELETE_ACCOUNT = '/user/delete',
	//
	GETUSERBYEMAIL = '/admin/user/findUserByEmail',
	GETUSERBYID = '/admin/user/findUserById',
}
