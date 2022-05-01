import { Document } from 'mongoose';
import { IPage, IUser, ROLES } from '.';

export interface ILink {
  title: string;
  href: string;
}

export interface IMenu extends Document {
  title: string;
  links: ILink[];
}

export interface FunnelUser extends IUser, Document {
  role: ROLES;
}

export interface IFunnel extends Document {
  title: string;
  owner: string;
  metaTags: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  baseDomain: string;
  favIcon: string;
  proDomain: string;
  pages: IPage[];
  isActive: boolean;
  menus: IMenu[];
  publish: {
    pages: IPage[];
  };
  contactEmail: string;
  allowedNotifications: boolean;
  users: FunnelUser;
}
