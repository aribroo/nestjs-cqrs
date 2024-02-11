export type UserId = number;

export interface IUser {
  name: string;
  email: string;
  socialMedia?: ISocialMedia[];
}

export interface ISocialMedia {
  username: string;
  platform: string;
}
