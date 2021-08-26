import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Channel } from "./Channel";
import { User } from "./User";

@Entity({ name: "messages" })
@ObjectType()
export class Message extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  text: string;

  @Column()
  channelId: number;
  @Field(() => Channel)
  @ManyToOne(() => Channel, (chanel) => chanel.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "channel_id" })
  channel: Channel;

  @Column()
  userId: number;
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
