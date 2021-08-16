import { MinLength, MaxLength, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @MinLength(6, { message: "Username should have at least 6 letters" })
  @MaxLength(30, {
    message: "Username should have maximum of 30 letters",
  })
  username: string;

  @Field(() => String)
  @IsEmail({}, { message: "Email not valid" })
  email: string;

  @Field(() => String)
  @MinLength(6, { message: "Password should have at least 6 letters" })
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => Number)
  id: number;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;
}
