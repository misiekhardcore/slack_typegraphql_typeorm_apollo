import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
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
import argon2 from "argon2";
import jwt from "jsonwebtoken";

@Entity({ name: "users" })
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  @MinLength(6, { message: "Username should have at least 6 letters" })
  @MaxLength(30, {
    message: "Username should have maximum of 30 letters",
  })
  username: string;

  @Field(() => String)
  @Column({ unique: true })
  @IsEmail({}, { message: "Email not valid" })
  email: string;

  @Column()
  @MinLength(6, { message: "Password should have at least 6 letters" })
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

  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false })
  isAdmin: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  async validatePassword(password: string): Promise<boolean> {
    try {
      return await argon2.verify(this.password, password);
    } catch (error) {
      return false;
    }
  }

  createTokens(
    secret1: string,
    secret2: string
  ): [createToken: string, createRefreshToken: string] {
    const createToken = jwt.sign(
      {
        user: {
          id: this.id,
          isAdmin: this.isAdmin,
        },
      },
      secret1,
      { expiresIn: "20m" }
    );

    const createRefreshToken = jwt.sign(
      {
        user: {
          id: this.id,
        },
      },
      secret2,
      { expiresIn: "7d" }
    );
    return [createToken, createRefreshToken];
  }
}
