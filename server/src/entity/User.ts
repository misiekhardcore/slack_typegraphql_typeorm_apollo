import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  // OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Channel } from "./Channel";
import { Team } from "./Team";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ unique: true })
  username: string;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [Team], { nullable: true })
  @ManyToMany<Team>(() => Team, (team) => team.members)
  @JoinTable({ name: "team_member" })
  teams: Team[] | null;

  // @OneToMany(() => Team, (team) => team.owner)
  // ownedTeams: Team[] | null;

  @Field(() => [Channel], { nullable: true })
  @ManyToMany(() => Channel, (channel) => channel.users)
  @JoinTable({ name: "channel_member" })
  channels: Channel[] | null;
}
