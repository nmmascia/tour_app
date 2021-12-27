import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Tour } from "./Tour";
import { User } from "./User";

@Entity()
export class TourMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  admin: boolean;

  @ManyToOne(() => User, (user) => user.tourMembers, { lazy: true })
  @JoinColumn()
  user: Promise<User>;

  @OneToOne(() => Tour, (tour) => tour.tourMembers, { lazy: true })
  @JoinColumn()
  tour: Promise<Tour>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
