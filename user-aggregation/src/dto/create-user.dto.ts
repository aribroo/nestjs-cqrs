import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SocialMediaPlatform } from 'src/common/enums/platform.enum';
import { IUser } from 'src/common/interface/user.interface';

export class SocialMedia {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsEnum(SocialMediaPlatform, {
    message:
      'Invalid platform. Platform must be one of the following: YOUTUBE, TWITTER, INSTAGRAM',
  })
  @IsNotEmpty()
  readonly platform: string;
}

export class CreateUserDto implements IUser {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ type: [SocialMedia], required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialMedia)
  readonly socialMedia?: SocialMedia[];
}
