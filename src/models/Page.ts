import { Schema, model } from "mongoose"
import { IPage } from "../types"
export const PageSchema = new Schema<IPage>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    data: {
      type: String,
      trim: true,
      required: true,
    },
    html: {
      type: String,
    },
    metaTags: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
)
PageSchema.index({
  title: "text",
})
export default model<IPage>("Page", PageSchema)
