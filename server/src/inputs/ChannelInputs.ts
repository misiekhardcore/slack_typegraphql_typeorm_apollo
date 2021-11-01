import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateChannelInput {
  @Field(() => String)
  name: string;

  @Field(() => Number)
  teamId: number;

  @Field(() => Boolean, { defaultValue: false })
  isPublic?: boolean;
}

@InputType()
export class UpdateChannelInput {
  @Field(() => Number)
  id: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Boolean, { defaultValue: false })
  isPublic?: boolean;
}
