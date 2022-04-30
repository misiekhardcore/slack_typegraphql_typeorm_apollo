import { Field, InputType, Int } from 'type-graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreateMessageInput {
  @Field(() => Int)
  channelId: number;

  @Field(() => String, { nullable: true })
  text?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  file?: Promise<FileUpload>;
}

@InputType()
export class UpdateMessageInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;
}
