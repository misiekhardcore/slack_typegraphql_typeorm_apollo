import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Channel } from './Channel';
import { User } from './User';

@Entity({ name: 'channel_user' })
export class ChannelMember extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  channelId: number;

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
