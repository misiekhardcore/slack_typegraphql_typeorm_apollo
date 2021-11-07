import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Channel } from './Channel';
import { TeamMember } from './TeamMember';
import { User } from './User';

@Entity({ name: 'teams' })
@ObjectType()
export class Team extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Boolean)
  admin: boolean;

  @Field(() => User)
  owner: User;

  @OneToMany(() => TeamMember, (member) => member.team, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  userConnection: TeamMember[];

  @Field(() => [User])
  members: User[];

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
