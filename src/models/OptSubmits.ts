import {model, Schema} from 'mongoose'
import {OptSubmits} from '../types'
const OptSubmitsSchema = new Schema<OptSubmits>(
	{
		email: {
			type: String,
			trim: true,
		},
		fullname: {
			type: String,
			required: [true, 'fname is a require field'],
			trim: true,
		},
		phone: {
			type: String,
			required: [true, 'lname is a require field'],
			trim: true,
		},
		funnel: {
			type: Schema.Types.ObjectId,
			ref: 'Funnel',
		},
	},
	{
		timestamps: true,
	}
)

export default model<OptSubmits>('OptSubmit', OptSubmitsSchema)
