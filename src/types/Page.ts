import { Document, Schema } from "mongoose"
export interface IPage extends Document {
  title: string
  data: string
  html?: string
  _id: Schema.Types.ObjectId
  link: string
  metaTags?: string
  createdAt: Date
  updatedAt: Date
  isPublished: boolean
  publishedAt: Date
}
