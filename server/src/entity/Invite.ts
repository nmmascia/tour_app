import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  getRepository,
} from "typeorm";

import { User } from "./User";

export enum InviteStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
}

@Entity()
export class Invite {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  invitee: User;

  @OneToOne(() => User)
  @JoinColumn()
  inviter: User;

  @Column()
  targetType: string;

  @Column()
  targetId: number;

  @Column({ type: "timestamptz", nullable: false })
  invitedAt: Date;

  @Column({
    type: "enum",
    enum: InviteStatus,
    default: InviteStatus.PENDING,
  })
  status: InviteStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
