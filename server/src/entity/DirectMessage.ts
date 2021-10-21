import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Team } from "./Team";
import { User } from "./User";

@Entity({ name: "direct_messages" })
@ObjectType()
export class DirectMessage extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  text: string;

  @Column({ nullable: false })
  teamId: number;
  @Field(() => Team)
  @ManyToOne(() => Team, (team) => team.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "team_id" })
  team: Team;

  @Column({ nullable: false })
  userFromId: number;
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_from_id" })
  userFrom: User;

  @Column({ nullable: false })
  userToId: number;
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_to_id" })
  userTo: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
