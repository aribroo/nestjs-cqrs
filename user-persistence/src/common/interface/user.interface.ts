import { Prisma } from '@prisma/client';

export type UserId = number;

export interface IUser {
  name: string;
  email: string;
  socialMedia?: Prisma.SocialMediaCreateManyInput;
}

export interface ISocialMedia {
  username: string;
  platform: string;
}
