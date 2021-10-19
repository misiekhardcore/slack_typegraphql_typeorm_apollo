import { Field, InputType } from "type-graphql";

@InputType()
export class CreateDirectMessageInput {
  @Field(() => Number)
  userToId: number;

  @Field(() => String)
  text: string;
}

@InputType()
export class UpdateDirectMessageInput {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  text: string;
}
