export type UserId = number;

export interface IUser {
  id: UserId;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  socialMedia?: ISocialMedia[];
}

export interface ISocialMedia {
  username: string;
  platform: string;
  createdAt: Date;
  updatedAt: Date;
}
