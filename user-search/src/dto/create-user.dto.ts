import { SocialMediaPlatform } from 'src/common/enums/social-media-platform.enum';
import { ISocialMedia, IUser } from 'src/common/interface/user.interface';

export class CreateUserDto implements IUser {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  socialMedia?: ISocialMedia[];
}

export class SocialMedia {
  username: string;
  platform: SocialMediaPlatform;
}
