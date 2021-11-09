import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CreateChannelInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  teamId: number;

  @Field(() => Boolean, { defaultValue: false })
  isPublic?: boolean;

  @Field(() => Boolean, { defaultValue: false })
  isDm?: boolean;

  @Field(() => [Int], { nullable: true })
  membersIds?: number[];
}

@InputType()
export class UpdateChannelInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Boolean, { defaultValue: false })
  isPublic?: boolean;
}
