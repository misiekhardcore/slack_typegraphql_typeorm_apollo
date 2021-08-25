import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateTeamInput {
  @Field(() => String)
  @Length(3, 30, {
    message: "Team name has to be between 3 and 30 characters",
  })
  name: string;
}

@InputType()
export class UpdateTeamInput {
  @Field(() => Number)
  id: number;

  @Field(() => String, { nullable: true })
  name?: string;
}
