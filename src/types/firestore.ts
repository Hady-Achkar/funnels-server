import {IAddFunnelStorePayload} from '.'

export declare namespace Store {
	export type FunnelCollections = 'funnels' | 'real-time'

	/**
 * Returns a promise with setting new document into firestore.
 *
 * @remarks
 * This method is part of the {@link Store | Store namespace}.
 * This method adds real-time document to into firestore
* @example const data = {
  title:string,
  subDomain: string
	category: string
}
*
 * @param data - Object with type IAddFunnelStorePayload
 * @returns `Promise<void>`
 *
 */
	function AddNewFunnelStore(payload: IAddFunnelStorePayload): Promise<void>
	export interface IPage {
		data: string
		title: string
	}
	export interface Funnel {
		pages: IPage[]
		maintenance: boolean
		title: string
		baseDomain: string
		proDomain: string
		domain: string
		category: string
		id?: string
	}
}
