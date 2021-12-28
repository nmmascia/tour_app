import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Float } from "aws-sdk/clients/batch";
import { TourStop } from "./TourStop";
import { User } from "./User";

@Entity()
export class TourStopMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn()
  user: User;

  @OneToOne(() => TourStop, (tourStop) => tourStop.tourStopMembers, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  tourStop: TourStop;

  @Column({ type: "decimal", nullable: true })
  rating: Float;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
