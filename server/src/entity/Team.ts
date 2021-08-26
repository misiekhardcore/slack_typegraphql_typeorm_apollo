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
import { Channel } from "./Channel";
import { User } from "./User";

@Entity({ name: "teams" })
@ObjectType()
export class Team extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [User])
  @ManyToMany<User>(() => User, (user) => user.teams, {
    nullable: false,
  })
  members: User[];

  @Column()
  ownerId: number;
  @Field(() => User)
  @ManyToOne<User>(() => User, { onDelete: "CASCADE", nullable: false })
  @JoinColumn({ name: "owner_id" })
  owner: User;

  @Field(() => [Channel])
  @OneToMany(() => Channel, (channel) => channel.team, {
    nullable: true,
  })
  channels: Channel[] | null;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
