export * from './firestore'
export * from './IUser'
export {IFunnel, FunnelUser, IMenu, ILink} from './Funnel'
export {IPage} from './Page'
export {IUser} from './User'
export {AddFunnel} from './AddFunnel'
import {Request} from 'express'

export {AddPage} from './AddPage'
export {GetPage} from './GetPage'
export {OptSubmits} from './OptSubmits'
export {AddOptSubmits} from './AddOptForm'
export {IAddFunnelStorePayload} from './AddFunnel.Store'
export {IAddRealTimeFunnelStore} from './AddRealTimeFunnel.Store'

export interface IAuthUser {
	readonly email: string
	readonly fullName: string
	readonly _id: string
}

export interface AuthedUser extends Request {
	readonly user: IAuthUser
}

export interface AuthUserBody<T> extends AuthedUser, Request {
	body: T
}

export interface CustomRequest<T> extends Request {
	body: T
}
