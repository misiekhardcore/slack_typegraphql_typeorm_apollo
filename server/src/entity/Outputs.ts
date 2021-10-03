import { Field, ObjectType } from "type-graphql";
import { Channel } from "./Channel";
import { Team } from "./Team";
import { User } from "./User";

@ObjectType()
export class ListError {
  @Field(() => String)
  path: string;

  @Field(() => String)
  msg: string;
}

@ObjectType()
export class CreateUserResponse {
  @Field()
  ok: boolean;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [ListError], { nullable: true })
  errors?: ListError[];
}

@ObjectType()
export class LoginResponse {
  @Field()
  ok: boolean;

  @Field(() => String, { nullable: true })
  token?: String;

  @Field(() => String, { nullable: true })
  refreshToken?: String;

  @Field(() => [ListError], { nullable: true })
  errors?: ListError[];
}

@ObjectType()
export class CreateTeamResponse {
  @Field()
  ok: boolean;

  @Field(() => Team, { nullable: true })
  team?: Team | null;

  @Field(() => [ListError], { nullable: true })
  errors?: ListError[];
}

@ObjectType()
export class CreateChannelResponse {
  @Field()
  ok: boolean;

  @Field(() => Channel, { nullable: true })
  channel?: Channel | null;

  @Field(() => [ListError], { nullable: true })
  errors?: ListError[];
}

@ObjectType()
export class AddMemberResponse {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => User, { nullable: true })
  member?: User;

  @Field(() => [ListError], { nullable: true })
  errors?: ListError[];
}

@ObjectType()
export class VoidResponse {
  @Field()
  ok: boolean;

  @Field(() => [ListError], { nullable: true })
  errors?: ListError[];
}
