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

  @Column()
  userId: number;

  @OneToOne(() => Tour, (tour) => tour.tourMembers, {
    lazy: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  tour: Promise<Tour>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
