import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CreateDirectMessageInput {
  @Field(() => Int)
  teamId: number;

  @Field(() => Int)
  userToId: number;

  @Field(() => String, { nullable: true })
  text?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  file?: Promise<FileUpload>;
}

@InputType()
export class UpdateDirectMessageInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;
}
