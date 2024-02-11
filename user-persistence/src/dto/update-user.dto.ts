import { Prisma } from '@prisma/client';

export class UpdateUserDto implements Prisma.UserUpdateInput {
  name?: string | Prisma.StringFieldUpdateOperationsInput;
  email?: string | Prisma.StringFieldUpdateOperationsInput;
  socialMedia?: Prisma.SocialMediaUpdateManyWithoutUserNestedInput;
}
