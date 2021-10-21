import argon2 from "argon2";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import jwt from "jsonwebtoken";
import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  // OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Channel } from "./Channel";
import { ChannelMember } from "./ChannelMember";
import { Team } from "./Team";
import { TeamMember } from "./TeamMember";

export interface JWTTokenPayload {
  user: {
    id: number;
    username: string;
    isAdmin: boolean;
  };
}

export interface JWTRefreshTokenPayload {
  user: {
    id: number;
  };
}

export interface RefreshTokensResponse extends JWTTokenPayload {
  token: string;
  refreshToken: string;
}

@Entity({ name: "users" })
@ObjectType()
export class User extends BaseEntity {
  @Field(() => Int)
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

  @OneToMany(() => TeamMember, (member) => member.user, {
    cascade: true,
  })
  teamConnection: TeamMember[];

  @Field(() => [Team], { nullable: true })
  teams: Team[];

  @OneToMany(() => ChannelMember, (channel) => channel.user)
  @JoinTable({ name: "channel_member" })
  channelConnection: ChannelMember[];

  @Field(() => [Channel], { nullable: true })
  channels: Channel[];

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
    const jwtTokenPayload: JWTTokenPayload = {
      user: {
        id: this.id,
        isAdmin: this.isAdmin,
        username: this.username,
      },
    };

    const createToken = jwt.sign(jwtTokenPayload, secret1, {
      expiresIn: "20m",
    });

    const jwtRefreshTokenPayload: JWTRefreshTokenPayload = {
      user: { id: this.id },
    };

    const createRefreshToken = jwt.sign(
      jwtRefreshTokenPayload,
      secret2,
      { expiresIn: "7d" }
    );
    return [createToken, createRefreshToken];
  }
}
