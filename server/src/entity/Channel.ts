import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Message } from "./Message";
import { Team } from "./Team";
import { User } from "./User";

@Entity({ name: "channels" })
@ObjectType()
export class Channel extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: false })
  @Column()
  name: string;

  @Field(() => Boolean)
  @Column()
  isPublic: boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  teamId: number;
  @Field(() => Team)
  @ManyToOne(() => Team, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "team_id" })
  team: Team;

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.channel)
  messages: Message[] | null;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.channels, {
    onDelete: "CASCADE",
  })
  users: User[];
}
