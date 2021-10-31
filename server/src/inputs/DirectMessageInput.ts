import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateDirectMessageInput {
  @Field(() => Number)
  teamId: number;

  @Field(() => Number)
  userToId: number;

  @Field(() => String, { nullable: true })
  text?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  file?: Promise<FileUpload>;
}

@InputType()
export class UpdateDirectMessageInput {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  text: string;
}
