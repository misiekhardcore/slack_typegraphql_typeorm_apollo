import { Field, InputType } from "type-graphql";

@InputType()
export class CreateMessageInput {
  @Field(() => Number)
  channelId: number;

  @Field(() => String)
  text: string;
}

@InputType()
export class UpdateMessageInput {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  text: string;
}
