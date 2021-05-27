import { Field, ID, ObjectType } from "type-graphql";
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
  UpdateDateColumn,
} from "typeorm";
import { Message } from "./Message";
import { Team } from "./Team";
import { User } from "./User";

@Entity()
@ObjectType()
export class Channel extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Boolean)
  @Column()
  public: boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Team)
  @ManyToOne(() => Team)
  @JoinColumn()
  team: Team;

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.channel)
  messages: Message[] | null;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.channels, { onDelete: "CASCADE" })
  users: User[];
}
