import { Float } from "aws-sdk/clients/batch";
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { TourStop } from "./TourStop";
import { User } from "./User";

@Entity()
export class TourStopMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn()
  user: User;

  @OneToOne(() => TourStop, (tourStop) => tourStop.tourStopMembers)
  @JoinColumn()
  tourStop: TourStop;

  @Column({ type: "decimal", nullable: true })
  rating: Float;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
