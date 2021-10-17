import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Team } from "./Team";
import { User } from "./User";

@Entity({ name: "team_member" })
export class TeamMember extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  teamId: number;

  @ManyToOne(() => User, (user) => user.teamConnection, {
    primary: true,
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Team, (team) => team.userConnection, {
    primary: true,
  })
  @JoinColumn({ name: "team_id" })
  team: Team;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
