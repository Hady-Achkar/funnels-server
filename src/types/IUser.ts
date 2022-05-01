import {Document} from 'mongoose'

export enum UserType {
	GOOGLE = 'GOOGLE',
	FACEBOOK = 'FACEBOOK',
	STANDARD = 'STANDARD',
}

export enum ROLES {
	SUPER_ADMIN = 'SUPER_ADMIN',
	SUPPORT = 'SUPPORT'
}

export interface IUser extends Document {
	fullName?: string;
	fname: string;
	lname: string;
	password: string;
	email: string;
	type: UserType;
}
