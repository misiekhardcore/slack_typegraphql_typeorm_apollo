import { Ctx, Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Context } from "../index";
import { Channel } from "./Channel";
import { TeamMember } from "./TeamMember";
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

  @OneToMany(() => TeamMember, (member) => member.team, {
    nullable: false,
  })
  userConnection: TeamMember[];

  @Field(() => [User])
  async members(
    @Ctx() { teamMembersLoader }: Context
  ): Promise<User[]> {
    return (await teamMembersLoader.load(this.id)) || [];
  }

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
