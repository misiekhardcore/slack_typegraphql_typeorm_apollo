import { Field, InputType } from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";

@InputType()
export class CreateMessageInput {
  @Field(() => Number)
  channelId: number;

  @Field(() => String, { nullable: true })
  text?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  file?: Promise<FileUpload>;
}

@InputType()
export class UpdateMessageInput {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  text: string;
}
