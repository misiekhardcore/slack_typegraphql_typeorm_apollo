import { Field, InputType } from "type-graphql";

@InputType()
export class CreateTeamInput {
  @Field(() => String)
  name: string;
}

@InputType()
export class UpdateTeamInput {
  @Field(() => Number)
  id: number;

  @Field(() => String, { nullable: true })
  name?: string;
}
