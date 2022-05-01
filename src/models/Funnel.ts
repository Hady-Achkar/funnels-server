import { Schema, model } from "mongoose"
import { IFunnel } from "../types"
import * as dotenv from "dotenv"
import { IMenu, FunnelUser } from "../types"

dotenv.config()
const FunnelUsersSchema = new Schema(
  {
    role: {
      type: String,
      default: "SUPPORT",
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Invitation Pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    minimize: false,
  }
)
const MenuSchema = new Schema<IMenu>(
  {
    title: {
      type: String,
      required: [true, "Menu title is a required field"],
      trim: true,
    },
    links: [
      {
        title: {
          type: String,
          trim: true,
          lowercase: true,
          required: [true, "Link title is a required field"],
        },
        href: {
          type: String,
          trim: true,
          required: [true, "Link href is a required field"],
        },
      },
    ],
  },
  {
    timestamps: true,
    minimize: false,
    versionKey: false,
  }
)
const FunnelSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    metaTags: {
      type: String,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    baseDomain: {
      type: String,
      trim: true,
    },
    proDomain: {
      type: String,
      trim: true,
      default: "",
    },
    favIcon: {
      type: String,
      trim: true,
      default: process.env.FUNNELS_FAV_ICON || "",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    publish: {
      pages: [
        {
          type: Schema.Types.Mixed,
          ref: "Page",
        },
      ],
    },
    menus: [MenuSchema],
    pages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Page",
      },
    ],
    contactEmail: {
      type: String,
      required: true,
      trim: true,
    },
    allowedNotifications: {
      type: Boolean,
      default: true,
    },
    users: [FunnelUsersSchema],
  },
  {
    timestamps: true,
    versionKey: false,
    minimize: false,
  }
)
FunnelSchema.pre("save", async function (next) {
  this.baseDomain =
    `${this.title.toLowerCase()}.funnelshero-website.com`.replace(/\s/g, "-")
  next()
})
FunnelSchema.index({
  title: "text",
  proDomain: "text",
  baseDomain: "text",
})

export default model<IFunnel>("Funnel", FunnelSchema)
