import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { File } from "./File";
import { Team } from "./Team";
import { User } from "./User";

@Entity({ name: "direct_messages" })
@ObjectType()
export class DirectMessage extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: "text" })
  text: string | null;

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

  @Column({ nullable: true })
  fileId: number | null;
  @Field(() => File, { nullable: true })
  @OneToOne(() => File, { nullable: true })
  @JoinColumn({ name: "file_id" })
  file: File | null;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
