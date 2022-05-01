import {IFunnel} from '.'
import {Document} from 'mongoose'

export interface OptSubmits extends Document {
	email: string
	fullname: string
	phone: string
	funnel: IFunnel
}
