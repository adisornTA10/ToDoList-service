import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequest {

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  active: number;
}
