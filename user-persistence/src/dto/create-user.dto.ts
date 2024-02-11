import { Prisma } from '@prisma/client';
import { SocialMediaPlatform } from 'src/common/enums/social-media-platform.enum';
import { ISocialMedia, IUser } from 'src/common/interface/user.interface';

export class CreateUserDto implements IUser {
  name: string;
  email: string;
  socialMedia?: Prisma.SocialMediaCreateManyInput;
}

export class SocialMediaDto {
  username: string;
  platform: SocialMediaPlatform;
}
