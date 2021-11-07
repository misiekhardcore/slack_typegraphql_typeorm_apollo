import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Channel } from './Channel';
import { User } from './User';

@Entity({ name: 'channel_member' })
export class ChannelMember extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  channelId: number;

  @Column({ default: false })
  admin: boolean;

  @ManyToOne(() => User, (user) => user.channelConnection, {
    primary: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Channel, (channel) => channel.userConnection, {
    primary: true,
  })
  @JoinColumn({ name: 'channel_id' })
  channel: Channel;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
